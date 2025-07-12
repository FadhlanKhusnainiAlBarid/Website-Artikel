import React, { useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstance } from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { usePathname } from "next/navigation";
import { formSchemaCreateArticle } from "@/app/(dashboard)/dashboard/articles/create/page";
import { cetegories } from "./form-select-articles";
import { Label } from "../ui/label";

export default function FormSelectCreateArticles({
  form,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof formSchemaCreateArticle>>>;
}) {
  const [cetegories, setCetegories] = useState<cetegories[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axiosInstance.get("/categories", {
          params: {
            limit: 1000,
          },
        });
        const validCategories = (response.data.data as cetegories[])
          .filter((cat) => cat.id && cat.id.trim() !== "")
          .filter(
            (cat, idx, arr) => arr.findIndex((c) => c.name === cat.name) === idx
          )
          .sort((a, b) => a.name.localeCompare(b.name));
        setCetegories(validCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    getCategories();
  }, []);

  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className="w-full">
          <Label
            htmlFor="categoryId"
            className="text-sm font-medium font-archivo text-gray-900"
          >
            Category
          </Label>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger
                className={`*:data-[slot=select-value]:text-black cursor-pointer ${
                  pathname.startsWith("/dashboard")
                    ? "w-full"
                    : "w-full md:w-[180px]"
                } min-h-10 bg-white font-archivo`}
              >
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="*:cursor-pointer">
                  {cetegories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
          <p className="text-sm font-normal font-archivo text-slate-500">
            The existing category list can be seen in the{" "}
            <Link
              href="/dashboard/categories"
              className="text-blue-500 hover:underline"
            >
              category
            </Link>{" "}
            menu
          </p>
        </FormItem>
      )}
    />
  );
}
