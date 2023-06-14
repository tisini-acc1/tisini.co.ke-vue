import { AxiosError } from "axios";
import { privTisiniApi, pubTisiniApi } from "../api";
import { RequestInterface } from "@/types";

const tisiniRequestHandler = async function <T, E>(
  request: RequestInterface<T, E>,
  meta: { type: "protected" | "public" } 
) {
  const api = meta.type === "protected" ? privTisiniApi : pubTisiniApi;

  const requestMap: Record<string, Function> = {
    GET: api.get,
    POST: api.post,
    PUT: api.put,
    DELETE: api.delete,
    PATCH: api.patch,
    OPTIONS: api.options,
    HEAD: api.head,
  };

  if (request.callback!) {
    return new Promise((resolve, reject) => {
      const method = request.method.toUpperCase();
      if (requestMap[method]) {
        requestMap[method](
          request.url,
          method === "GET" || method === "HEAD" ? request.config : request.data,
          request.config as any
        )
          .then((res: any) => {
            request.callback!(res.data, null as any);
            resolve(res.data);
          })
          .catch((err: any) => {
            request.callback!(null as any, err);
            reject(err);
          });
      }
    });
  } else {
    try {
      const method = request.method.toUpperCase();
      if (requestMap[method]) {
        const { data } = await requestMap[method](
          request.url,
          method === "GET" || method === "HEAD" ? request.config : request.data,
          request.config as any
        );
        return data as T;
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        return err as E;
      }
      return err as E;
    }
  }
};

export default tisiniRequestHandler;
