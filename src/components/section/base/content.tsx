"use client";
import React, { useEffect } from "react";
import CardArticle from "@/components/custom/card-article";
import { useArticlesStore } from "@/state/state";
import PaginationArticles from "@/components/custom/pagination-articles";

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
  data: ArticleData[] | [];
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
  }, [
    articlesData.data,
    articlesData.total,
    articlesData.page,
    articlesData.limit,
    setArticles,
    setPagination
  ]);

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
      <PaginationArticles />
    </section>
  );
}
