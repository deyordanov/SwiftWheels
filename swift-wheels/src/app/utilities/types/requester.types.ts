export type HeadersInit = [string, string][] | Record<string, string> | Headers;

export type RequestOptions = {
  method: string;
  headers: HeadersInit;
  body?: any;
  url?: string;
};
