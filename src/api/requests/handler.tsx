import { AxiosError } from "axios";
import { privTisiniApi, pubTisiniApi } from "../api";
import { RequestInterface } from "@/types";

const tisiniRequestHandler = async function <T, E>(
  request: RequestInterface<T, E>,
  protectedRequest: boolean = false
) {
  if (request.callback!) {
    return new Promise((resolve, reject) => {
      if (protectedRequest) {
        // Replicate for protected requests
        if (request.method === "GET") {
          privTisiniApi
            .get(request.url, request.config as any)
            .then((res) => {
              request.callback!(res.data, null as any);
              resolve(res.data);
            })
            .catch((err) => {
              request.callback!(null as any, err);
              reject(err);
            });
        }
        if (request.method === "POST") {
          privTisiniApi
            .post(request.url, request.data, request.config as any)
            .then((res) => {
              request.callback!(res.data, null as any);
              resolve(res.data);
            })
            .catch((err) => {
              request.callback!(null as any, err);
              reject(err);
            });
        }
        if (request.method === "PUT") {
          privTisiniApi
            .put(request.url, request.data, request.config as any)
            .then((res) => {
              request.callback!(res.data, null as any);
              resolve(res.data);
            })
            .catch((err) => {
              request.callback!(null as any, err);
              reject(err);
            });
        }
        if (request.method === "DELETE") {
          privTisiniApi
            .delete(request.url, request.config as any)
            .then((res) => {
              request.callback!(res.data, null as any);
              resolve(res.data);
            })
            .catch((err) => {
              request.callback!(null as any, err);
              reject(err);
            });
        }
        if (request.method === "PATCH") {
          privTisiniApi
            .patch(request.url, request.data, request.config as any)
            .then((res) => {
              request.callback!(res.data, null as any);
              resolve(res.data);
            })
            .catch((err) => {
              request.callback!(null as any, err);
              reject(err);
            });
        }
        if (request.method === "OPTIONS") {
          privTisiniApi
            .options(request.url, request.config as any)
            .then((res) => {
              request.callback!(res.data, null as any);
              resolve(res.data);
            })
            .catch((err) => {
              request.callback!(null as any, err);
              reject(err);
            });
        }
        if (request.method === "HEAD") {
          privTisiniApi
            .head(request.url)
            .then((res) => {
              request.callback!(res.data, null as any);
              resolve(res.data);
            })
            .catch((err) => {
              request.callback!(null as any, err);
              reject(err);
            });
        }
      }
      if (request.method === "GET") {
        pubTisiniApi
          .get(request.url, request.config as any)
          .then((res) => {
            request.callback!(res.data, null as any);
            resolve(res.data);
          })
          .catch((err) => {
            request.callback!(null as any, err);
            reject(err);
          });
      }
      if (request.method === "POST") {
        pubTisiniApi
          .post(request.url, request.data, request.config as any)
          .then((res) => {
            request.callback!(res.data, null as any);
            resolve(res.data);
          })
          .catch((err) => {
            request.callback!(null as any, err);
            reject(err);
          });
      }
      if (request.method === "PUT") {
        pubTisiniApi
          .put(request.url, request.data, request.config as any)
          .then((res) => {
            request.callback!(res.data, null as any);
            resolve(res.data);
          })
          .catch((err) => {
            request.callback!(null as any, err);
            reject(err);
          });
      }
      if (request.method === "DELETE") {
        pubTisiniApi
          .delete(request.url, request.config as any)
          .then((res) => {
            request.callback!(res.data, null as any);
            resolve(res.data);
          })
          .catch((err) => {
            request.callback!(null as any, err);
            reject(err);
          });
      }
      if (request.method === "PATCH") {
        pubTisiniApi
          .patch(request.url, request.data, request.config as any)
          .then((res) => {
            request.callback!(res.data, null as any);
            resolve(res.data);
          })
          .catch((err) => {
            request.callback!(null as any, err);
            reject(err);
          });
      }
      if (request.method === "OPTIONS") {
        pubTisiniApi
          .options(request.url, request.config as any)
          .then((res) => {
            request.callback!(res.data, null as any);
            resolve(res.data);
          })
          .catch((err) => {
            request.callback!(null as any, err);
            reject(err);
          });
      }
      if (request.method === "HEAD") {
        pubTisiniApi
          .head(request.url)
          .then((res) => {
            request.callback!(res.data, null as any);
            resolve(res.data);
          })
          .catch((err) => {
            request.callback!(null as any, err);
            reject(err);
          });
      }
    });
  } else {
    try {
      if (protectedRequest) {
        // Non modifier methods
        if (request.method === "GET") {
          const { data } = await privTisiniApi.get(
            request.url,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "POST") {
          const { data } = await privTisiniApi.post(
            request.url,
            request.data,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "PUT") {
          const { data } = await privTisiniApi.put(
            request.url,
            request.data,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "DELETE") {
          const { data } = await privTisiniApi.delete(
            request.url,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "PATCH") {
          const { data } = await privTisiniApi.patch(
            request.url,
            request.data,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "OPTIONS") {
          const { data } = await privTisiniApi.options(
            request.url,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "HEAD") {
          const { data } = await privTisiniApi.head(
            request.url,
            request.config as any
          );
          return data as T;
        }
      } else {
        // Non modifier methods
        if (request.method === "GET") {
          const { data } = await pubTisiniApi.get(
            request.url,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "POST") {
          const { data } = await pubTisiniApi.post(
            request.url,
            request.data,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "PUT") {
          const { data } = await pubTisiniApi.put(
            request.url,
            request.data,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "DELETE") {
          const { data } = await pubTisiniApi.delete(
            request.url,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "PATCH") {
          const { data } = await pubTisiniApi.patch(
            request.url,
            request.data,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "OPTIONS") {
          const { data } = await pubTisiniApi.options(
            request.url,
            request.config as any
          );
          return data as T;
        }
        if (request.method === "HEAD") {
          const { data } = await pubTisiniApi.head(
            request.url,
            request.config as any
          );
          return data as T;
        }
      }
    } catch (err: any) {
      if (err instanceof AxiosError) {
        return err as E;
      }
      return err as E;
    }
  }
};
