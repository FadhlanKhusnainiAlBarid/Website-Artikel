"use server";
import React from "react";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios";
import { consecutiveUniqueRandom } from "unique-random";
import CardArticle from "@/components/custom/card-article";
import ContentSection from "@/components/section/base/detail-article/content";
import { ArticleData } from "@/components/section/base/content";

async function DetailArticle({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  async function fetchArticle(id: string) {
    try {
      const response = await axiosInstance.get(`/articles/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching article:", error);
      return null;
    }
  }

  async function fetchArticles(id: string) {
    try {
      const response = await axiosInstance.get("/articles");
      const random = consecutiveUniqueRandom(1, response.data.data.length - 1);
      const uniqueArticles = new Set();
      if (response.data.data) {
        for (let i = 0; i < 9; i++) {
          const randomIndex = random();
          if (uniqueArticles.size >= 3) break;
          if (response.data.data[randomIndex].id !== id) {
            uniqueArticles.add(response.data.data[randomIndex]);
          }
        }
      }
      return Array.from(uniqueArticles) as ArticleData[];
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  }

  const detailArticles = await fetchArticle(id);
  const articles = await fetchArticles(id);
  console.log(articles);
  return (
    <>
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
            src={detailArticles?.imageUrl}
            alt={detailArticles?.title}
            width={800}
            height={400}
            className="w-full h-[240px] md:h-[480px] rounded-xl object-cover"
          />
          <div
            className="space-y-4 md:text-base text-sm"
            dangerouslySetInnerHTML={{ __html: detailArticles?.content }}
          />
        </div>
      </section>
      <ContentSection articles={articles} />
    </>
  );
}
export default DetailArticle;
