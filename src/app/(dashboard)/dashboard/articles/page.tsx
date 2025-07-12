"use server";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import FormCategory from "@/components/custom/form-articles";
import { axiosInstance } from "@/lib/axios";
import { DataSection } from "@/components/section/base/content";
import PaginationArticles from "@/components/custom/pagination-articles";
import TableArticles from "@/components/custom/table-articles";
import { Plus } from "lucide-react";

async function Articles() {
  async function fetchArticles(): Promise<DataSection> {
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

  const response = await fetchArticles();
  return (
    <div className="flex flex-col">
      <header className="flex flex-col gap-6">
        <h1 className="text-base font-medium text-slate-800">
          Total Articles : {response.data.length}
        </h1>
        <div className="flex justify-between items-center -mx-6 py-6 border-y border-slate-200">
          <FormCategory />
          <Button
            className="cursor-pointer mr-6 font-archivo text-sm font-medium bg-blue-600 hover:bg-blue-700"
            asChild
          >
            <Link
              href="/dashboard/articles/create"
              className="flex items-center gap-2 text-white"
            >
              <Plus className="size-5" />
              Add Article
            </Link>
          </Button>
        </div>
      </header>
      <div className="-mx-6 border-b border-slate-200">
        <TableArticles articlesData={response} />
      </div>
      <header className="flex justify-center py-6">
        <PaginationArticles />
      </header>
    </div>
  );
}

export default Articles;
