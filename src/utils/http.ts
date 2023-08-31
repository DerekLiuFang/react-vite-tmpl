import { isPlainObject } from "./index";

interface ReqInit extends Omit<RequestInit, "body"> {
  baseURL?: string;
  headers?: Record<string, string>;
  /**查询参数： eg. ?a=1 */
  params?: Record<string, any>;
  /** 路由参数： eg. /:id/.. */
  router?: Record<string, any>;
  /** 超时时间，默认3000 */
  timeout?: number;
  body?: Record<keyof any, any> | RequestInit["body"];
}
const defaultInit = {
  method: "GET",
  headers: {
    Accept: "*/*",
  },
  mode: "cors",
  timeout: 3000,
  // credentials: 'include' // send cookies
} as ReqInit;

async function http<T = any>(url: string, init: ReqInit = {}): Promise<T> {
  const mergeInit = {
    ...defaultInit,
    ...init,
    headers: { ...defaultInit.headers, ...init.headers },
  };
  const { baseURL, params, router, timeout, headers, ...restOptions } =
    mergeInit;

  url = baseURL ? `${baseURL}${url}` : url;
  let _body: any = mergeInit.body;
  const _method = mergeInit.method?.toLowerCase();
  const hasType =
    Reflect.has(headers, "Content-Type") ||
    Reflect.has(headers, "content-type");

  // 路由参数替换
  if (router) {
    url = url.replace(
      /:([a-zA-Z]+)/g,
      (match: string, p1: string) => router[p1]
    );
  }

  // 查询参数拼接到url
  if (params) {
    let prev = "?";
    for (const key of Object.keys(params)) {
      const val = params[key];
      prev += `${key}=${val}&`;
    }
    prev = prev.slice(0, -1);
    url += prev;
  }
  // body
  if (!hasType && _method !== "get") {
    if (isPlainObject(_body)) {
      _body = JSON.stringify(_body);
    }
    Reflect.set(headers, "Content-Type", "application/json");
  }

  try {
    const response: Response = await Promise.race([
      fetch(url, { ...restOptions, body: _body, headers }),
      new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          reject({ status: 408, statusText: "TIME_OUT_ERROR", url });
        }, timeout);
      }),
    ]);
    if (response.ok) {
      return await response.json();
    }
    throw response;
  } catch (error) {
    throw error;
  }
}

export default http;
