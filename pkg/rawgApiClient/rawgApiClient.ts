import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { z } from 'zod';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

type SendParams = {
  path: string;
  method: HttpMethod;
  payload: unknown;
};

const rawgApiErrorSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
  })
});

export class RawgApiClient {
  private axios: AxiosInstance;
  private baseUrl: string;

  constructor (client: {
    baseUrl: string
  }) {
    this.baseUrl = client.baseUrl;
    this.axios = axios.create();
  }

  async send (params: SendParams): Promise<unknown> {
    const { path, method, payload } = params;
    const fullUrl = `${this.baseUrl}${path}`;

    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      switch (method) {
        case 'get': {
          const res = await this.axios.get(fullUrl, requestConfig);
          return res.data;
        }
        case 'post': {
          const res = await this.axios.post(fullUrl, payload, requestConfig);
          return res.data;
        }
        case 'put': {
          const res = await this.axios.put(fullUrl, payload, requestConfig);
          return res.data;
        }
        case 'delete': {
          const res = await this.axios.delete(fullUrl, requestConfig);
          return res.data;
        }
        default: {
          throw Error(`Not implemented`);
        }
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.status === 401) {
          throw new Error (`rawg api unauthorized the request`);
        }
        const data = e.response?.data;
        if (data !== undefined) {
          try {
            const apiError = rawgApiErrorSchema.parse(data);
            throw new Error(
              `rawg api error: ${apiError.error.code} - ${apiError.error.message}`
            );
          } catch {
            throw new Error(`rawg api error: ${data}`);
          }
        }
      }
      throw e;
    }
  }
}
