"use server";
import React from "react";
import Image from "next/image";
import { axiosInstance } from "@/lib/axios";
import { consecutiveUniqueRandom } from "unique-random";
import CardArticle from "@/components/custom/card-article";
import ContentSection from "@/components/section/base/detail-article/content";
import { ArticleData } from "@/components/section/base/content";
import ArticleSection from "@/components/section/base/detail-article/article";

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

  async function fetchArticles(
    categoryId: string,
    id: string
  ): Promise<ArticleData[]> {
    try {
      const response = await axiosInstance.get("/articles", {
        params: {
          category: categoryId,
          limit: 1000,
        },
      });
      const random = consecutiveUniqueRandom(1, response.data.data.length - 1);
      const uniqueArticles = new Set<ArticleData>();
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
  const articles = await fetchArticles(detailArticles.categoryId, id);
  return (
    <>
      <ArticleSection article={detailArticles} />
      <ContentSection articles={articles} />
    </>
  );
}
export default DetailArticle;
