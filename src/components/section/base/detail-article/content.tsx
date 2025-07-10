"use client";
import CardArticle from "@/components/custom/card-article";
import React from "react";
import { ArticleData } from "../content";

export default function ContentSection({
  articles,
}: {
  articles: ArticleData[];
}) {
  return (
    <section className="mx-auto container max-w-[1440px] pt-10 pb-[60px] px-5 lg:px-[180px]">
      <div className="max-w-[1080px]">
        <h3 className="text-lg md:text-xl font-bold text-slate-900">
          Other articles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {articles?.map((article) => (
            <CardArticle key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
