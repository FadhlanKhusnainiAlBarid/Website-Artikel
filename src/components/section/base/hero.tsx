"use client";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image_Background from "../../../../public/images/image-background.jpg";
import { useArticlesStore } from "@/state/state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "@/lib/axios";

const formSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
});

interface cetegories {
  id: string;
  userId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export default function HeroSection() {
  const { setArticles, pagination, setPagination } = useArticlesStore();
  const [cetegories, setCetegories] = useState<cetegories[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      search: "",
    },
  });

  useEffect(() => {
    const DebounceFilter = setTimeout(() => {
      async function onSubmit(value: z.infer<typeof formSchema>) {
        try {
          const response = await axiosInstance.get("/articles", {
            params: {
              category: value.category,
              title: value.search,
              page: pagination.page,
              limit: 9,
            },
          });
          setArticles(response.data.data);
          setPagination({
            total: response.data.total,
            page: response.data.page,
            limit: response.data.limit,
          });
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      }
      onSubmit(form.getValues());
    }, 500);

    return () => clearTimeout(DebounceFilter);
  }, [form.watch("category"), form.watch("search"), pagination.page]);

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
    <section
      style={{
        backgroundImage: `url(${Image_Background.src})`,
      }}
      className="relative bg-cover bg-center w-full h-[624px] md:h-[500px] flex justify-center items-center px-[15px]"
    >
      <div className="absolute inset-0 bg-[#2563EB] opacity-[86%]"></div>
      <div className="max-w-[730px] flex flex-col items-center gap-10 z-10">
        <div className="text-center text-white font-archivo space-y-3">
          <p className="font-bold text-sm md:text-base">Blog genzet</p>
          <h1 className="text-4xl md:text-5xl font-medium text-center">
            The Journal : Design Resources, Interviews, and Industry News
          </h1>
          <p className="text-xl md:text-2xl">
            Your daily dose of design insights!
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-fit flex flex-col md:flex-row items-center gap-2 p-2.5 bg-[rgb(59,130,246)] rounded-xl"
          >
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="cursor-pointer w-full md:w-[180px] min-h-10 bg-white font-archivo">
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
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem className="min-w-full md:min-w-[400px] relative flex items-center">
                  <Search className="absolute left-2 size-4 text-gray-500" />
                  <FormControl>
                    <Input
                      className="bg-white h-10 font-archivo pl-7"
                      placeholder="Search articles"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </section>
  );
}
