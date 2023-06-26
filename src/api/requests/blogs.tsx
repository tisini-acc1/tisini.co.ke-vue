import { ArticleAuthorInterface, ArticleInterface } from "@/types";
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

  export const getSingleArticle = async function (
    slug: string,
    cb?: (data: any, err: any) => void
  ) {
    return await tisiniRequestHandler<ArticleAuthorInterface, any>(
      {
        method: "GET",
        url: `/blogs/articles/${slug}`,
        callback: cb,
      },
      {
        type: "public",
      }
    );
  }
