"use client";
import React from "react";
import Image from "next/image";
import { ArticleData } from "@/components/section/base/content";

export default function ArticleSection({ article }: { article: ArticleData }) {
  return (
    <section className="mx-auto flex flex-col items-center pt-[103.972px] pb-10 px-5 lg:px-40">
      <div className="max-w-[1120px] space-y-10">
        <div className="space-y-4 text-center">
          <span className="flex items-center justify-center text-sm font-medium text-slate-600">
            <p> February 4, 2025 </p>
            <ul className="list-disc list-outside ml-7">
              <li>Created by Admin</li>
            </ul>
          </span>
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-900">
            Figma's New Dev Mode: A Game-Changer for Designers & Developers
          </h1>
        </div>
        <Image
          loader={({ src }) => src}
          src={article?.imageUrl}
          alt={article?.title}
          width={800}
          height={400}
          className="w-full h-[240px] md:h-[480px] rounded-xl object-cover"
          unoptimized
        />
        <div
          className="space-y-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{ __html: article?.content }}
        />
      </div>
    </section>
  );
}
