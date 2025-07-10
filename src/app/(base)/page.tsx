"use server";
import { axiosInstance } from "@/lib/axios";
import HeroSection from "@/components/section/base/hero";
import ContentSeaction from "@/components/section/base/content";

async function ListArticles() {
  async function fetchArticles() {
    try {
      const response = await axiosInstance.get("/articles");
      return response.data;
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  }

  const articles = await fetchArticles();
  return (
    <>
      <HeroSection />
      <ContentSeaction data={articles} />
    </>
  );
}

export default ListArticles;
