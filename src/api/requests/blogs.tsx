import tisiniRequestHandler from "./handler";

export const getArticles = async function (
    cb?: (data: any, err: any) => void
  ) {
    return await tisiniRequestHandler<any, any>(
      {
        method: "GET",
        url: `/blogs/articles/`,
        callback: cb,
      },
      {
        type: "public",
      }
    );
  };