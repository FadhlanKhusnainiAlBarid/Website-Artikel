"use server";
import HeroSection from "@/components/section/base/hero";
import ContentSeaction from "@/components/section/base/content";

async function ListArticles() {
  return (
    <>
      <HeroSection />
      <ContentSeaction />
    </>
  );
}

export default ListArticles;
