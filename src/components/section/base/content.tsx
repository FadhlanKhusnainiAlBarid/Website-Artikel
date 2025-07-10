"use client";
import CardArticle from "@/components/custom/card-article";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useArticlesStore } from "@/state/state";
import { useEffect } from "react";

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

export default function ContentSection({ data }: { data: DataSection }) {
  const { articles, setArticles, pagination, setPagination } =
    useArticlesStore();

  useEffect(() => {
    setArticles(data.data);
    setPagination({
      total: data.total,
      page: data.page,
      limit: data.limit,
    });
  }, []);
  return (
    <section className="mx-auto container max-w-[1440px] space-y-6 pt-10 pb-[60px] md:pb-[100px] px-5 md:px-[100px]">
      <h6 className="font-archivo text-base hidden md:block">
        Showing : 20 of 240 articles
      </h6>
      <div className="w-fit grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[40px] md:gap-y-[60px]">
        {articles.map((article) => (
          <CardArticle key={article.id} article={article} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
