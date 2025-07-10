import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { ArticleData } from "../section/base/content";
import { format } from "date-fns";

export default function CardArticle({ article }: { article: ArticleData }) {
  const formattedDate = format(new Date(article.createdAt), "MMMM dd, yyyy");
  return (
    <div className="space-y-4">
      <Image
        loader={({ src }) => src}
        width={400}
        height={240}
        className="h-[200px] md:h-[240px] rounded-xl object-cover"
        src={article.imageUrl}
        alt={article.title}
        unoptimized
      />
      <div className="space-y-2 font-archivo">
        <p className="text-xs md:text-sm text-slate-600">{formattedDate}</p>
        <h1 className="text-base md:text-lg font-semibold">{article.title}</h1>
        <p
          className="w-fit **:text-sm **:md:text-base **:text-slate-600 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        <Badge className="rounded-full px-3 py-1 bg-blue-200 text-xs md:text-sm text-blue-900 font-archivo">
          {article.category.name}
        </Badge>
      </div>
    </div>
  );
}
