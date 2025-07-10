import { create } from "zustand";
import { ArticleData, PaginationData } from "@/components/section/base/content";

type ArticlesStore = {
  articles: ArticleData[];
  setArticles: (articles: ArticleData[]) => void;
  pagination: PaginationData;
  setPagination: (pagination: PaginationData) => void;
  articleDetail: ArticleData | null;
  setArticleDetail: (articleDetail: ArticleData | null) => void;
};

export const useArticlesStore = create<ArticlesStore>((set) => ({
  articles: [],
  setArticles: (articles: ArticleData[]) => set({ articles }),
  pagination: {
    total: 0,
    page: 1,
    limit: 20,
  },
  setPagination: (pagination: PaginationData) => set({ pagination }),
  articleDetail: null,
  setArticleDetail: (articleDetail: ArticleData | null) =>
    set({ articleDetail }),
}));
