"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { DataSection } from "../section/base/content";
import { useArticlesStore } from "@/state/state";

export default function TableArticles({
  articlesData,
}: {
  articlesData: DataSection;
}) {
  const { articles, setArticles, setPagination } = useArticlesStore();

  useEffect(() => {
    setArticles(articlesData.data);
    setPagination({
      total: articlesData.total,
      page: articlesData.page,
      limit: articlesData.limit,
    });
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow className=" *:bg-slate-200 *:font-archivo *:text-center *:text-head *:text-sm *:font-medium *:text-slate-900 *:py-1">
          <TableHead>Thumbnails</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {articles.map((article) => {
          const formattedDate = format(
            new Date(article.createdAt),
            "MMMM dd, yyyy HH:mm:ss"
          );
          return (
            <TableRow
              key={article.id}
              className="*:font-archivo *:text-head *:text-sm *:font-normal *:text-slate-600 *:py-3 *:px-4"
            >
              <TableCell className="w-1/5 text-center">
                <div className="flex justify-center">
                  <Image
                    loader={({ src }) => src}
                    src={article.imageUrl}
                    alt={article.title}
                    width={60}
                    height={60}
                    className="size-[60px] object-cover rounded-md"
                    unoptimized
                  />
                </div>
              </TableCell>
              <TableCell className="w-1/5 whitespace-pre-line">
                {article.title}
              </TableCell>
              <TableCell className="w-1/5 text-center">
                {article.category.name}
              </TableCell>
              <TableCell className="w-1/5 text-center">
                {formattedDate}
              </TableCell>
              <TableCell className="w-1/5">
                <div className="flex justify-center items-center gap-3 *:underline *:underline-offset-2">
                  <Link href={`/${article.id}`} className="text-blue-500">
                    Preview
                  </Link>
                  <Link href={`/${article.id}`} className="text-blue-500">
                    Edit
                  </Link>
                  <Link href={`/${article.id}`} className="text-red-500">
                    Delete
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
