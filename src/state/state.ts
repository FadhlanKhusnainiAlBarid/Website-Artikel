import { create } from "zustand";
import { ArticleData, PaginationData } from "@/components/section/base/content";

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

type openDropdownType = {
  openDropdown: boolean;
  setOpenDropdown: (open: boolean) => void;
};

export const useOpenDropdownStore = create<openDropdownType>((set) => ({
  openDropdown: false,
  setOpenDropdown: (open: boolean) => set({ openDropdown: open }),
}));
