"use server";
import React from "react";
import Image from "next/image";
import FormCategory from "@/components/custom/form-articles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { DataSection } from "@/components/section/base/content";
import { format } from "date-fns";
import PaginationArticles from "@/components/custom/pagination-articles";
import TableArticles from "@/components/custom/table-articles";

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
        <div className="-mx-6 py-6 border-y border-slate-200">
          <FormCategory />
        </div>
      </header>
      <TableArticles articlesData={response} />
      <header className="flex justify-center py-6">
        <PaginationArticles />
      </header>
    </div>
  );
}

export default Articles;
