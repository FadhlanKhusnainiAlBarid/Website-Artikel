"use client";
import CardArticle from "@/components/custom/card-article";
import { formSchema } from "@/components/custom/form-category";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { axiosInstance } from "@/lib/axios";
import { useArticlesStore } from "@/state/state";
import debounce from "lodash.debounce";
import { use, useCallback, useEffect } from "react";
import z from "zod";

export interface ArticleData {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  content: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    userId: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  user: {
    id: string;
    username: string;
  };
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
}

export interface DataSection extends PaginationData {
  data: ArticleData[];
}

export default function ContentSection({
  articlesData,
}: {
  articlesData: DataSection;
}) {
  const { articles, setArticles, pagination, setPagination } =
    useArticlesStore();
  
  useEffect(() => {
    setArticles(articlesData.data);
    setPagination({
      total: articlesData.total,
      page: articlesData.page,
      limit: articlesData.limit,
    });
  }, []);

  return (
    <section className="mx-auto container max-w-[1440px] space-y-6 pt-10 pb-[60px] md:pb-[100px] px-5 md:px-[100px]">
      <h6 className="font-archivo text-base hidden md:block">
        Showing : {articles.length} of {pagination.total} articles
      </h6>
      <div className="w-fit grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[40px] md:gap-y-[60px]">
        {articles.map((article) => (
          <CardArticle key={article.id} article={article} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem
            className="cursor-pointer"
            onClick={() =>
              setPagination({
                ...pagination,
                page: pagination.page == 1 ? 1 : pagination.page - 1,
              })
            }
          >
            <PaginationPrevious />
          </PaginationItem>
          {pagination.page >= 3 && (
            <PaginationItem className="cursor-pointer">
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {Array(Math.ceil(pagination.total / 9))
            .keys()
            .map((_, index) => (
              <PaginationItem
                className={`cursor-pointer ${
                  Math.abs(pagination.page - (index + 1)) <= 1
                    ? "block"
                    : "hidden"
                } `}
                key={index}
                onClick={() =>
                  setPagination({ ...pagination, page: index + 1 })
                }
              >
                <PaginationLink isActive={pagination.page === index + 1}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          {pagination.page + 1 < Math.ceil(pagination.total / 9) && (
            <PaginationItem className="cursor-pointer">
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem
            className="cursor-pointer"
            onClick={() =>
              setPagination({
                ...pagination,
                page:
                  pagination.page === Math.ceil(pagination.total / 9)
                    ? Math.ceil(pagination.total / 9)
                    : pagination.page + 1,
              })
            }
          >
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
