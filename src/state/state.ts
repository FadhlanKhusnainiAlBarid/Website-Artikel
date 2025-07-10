import { create } from "zustand";
import {
  ArticleData,
  PaginationData,
} from "@/components/section/base/detail/content";

type ArticlesStore = {
  articles: ArticleData[];
  setArticles: (articles: ArticleData[]) => void;
  pagination: PaginationData;
  setPagination: (pagination: PaginationData) => void;
};

export const useArticlesStore = create<ArticlesStore>((set) => ({
  articles: [],
  setArticles: (articles: ArticleData[]) => set({ articles }),
  pagination: {
    total: 0,
    page: 0,
    limit: 0,
  },
  setPagination: (pagination: PaginationData) => set({ pagination }),
}));
