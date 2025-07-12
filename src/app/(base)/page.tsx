"use server";
import HeroSection from "@/components/section/base/hero";
import ContentSection from "@/components/section/base/content";
import { axiosInstance } from "@/lib/axios";

async function ListArticles() {
  async function fetchArticles() {
    try {
      const response = await axiosInstance.get("/articles", {
        params: {
          page: 1,
          limit: 9,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return { data: [], total: 0, page: 1, limit: 10 };
    }
  }

  const articlesData = await fetchArticles();
  return (
    <>
      <HeroSection />
      <ContentSection articlesData={articlesData} />
    </>
  );
}

export default ListArticles;
