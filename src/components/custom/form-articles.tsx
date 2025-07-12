"use client";
import { useCallback, useEffect, useRef } from "react";
import { Form } from "@/components/ui/form";
import { useArticlesStore } from "@/state/state";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "@/lib/axios";
import SelectCategory from "@/components/custom/form-select-articles";
import InputCategory from "@/components/custom/form-input-articles";
import debounce from "lodash.debounce";
import { usePathname } from "next/navigation";

export const formSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
});

export default function FormArticles() {
  const { setArticles, pagination, setPagination } = useArticlesStore();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      search: "",
    },
  });
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  const debouncedSearch = useCallback(
    debounce(() => {
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
          localStorage.setItem("articles", JSON.stringify(value));
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
    }, 500),
    [pagination.page]
  );

  useEffect(() => {
    console.log(pagination.page);
    if (isFirstRender.current) {
      isFirstRender.current = false; // set ke false setelah first render
      return;
    }

    debouncedSearch(); // hanya jalan saat page berubah, bukan saat first render

    return () => {
      debouncedSearch.cancel(); // bersihkan debounce kalau dibutuhkan
    };
  }, [pagination.page]);

  return (
    <Form {...form}>
      <form
        onChange={(e) => {
          e.preventDefault();
          debouncedSearch();
        }}
        className={` ${
          pathname.startsWith("/dashboard")
            ? "ml-6"
            : "w-full p-2.5 bg-[rgb(59,130,246)] rounded-xl"
        } md:w-fit flex flex-col md:flex-row items-center gap-2`}
      >
        <SelectCategory form={form} />
        <InputCategory form={form} />
      </form>
    </Form>
  );
}
