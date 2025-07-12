import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./form-category";
import { usePathname } from "next/navigation";

interface cetegories {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function SelectCategory({
  form,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
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
      name="category"
      render={({ field }) => (
        <FormItem className="w-full">
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
        </FormItem>
      )}
    />
  );
}
