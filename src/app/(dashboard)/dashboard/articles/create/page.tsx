"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "@/lib/axios";
import FormSelectCreateArticles from "@/components/custom/form-select-create-articles";

export const formSchemaCreateArticle = z.object({
  image: z.string().min(1, "Image is required"),
  title: z.string().min(1).max(100),
  // content: z.string().min(1),
  categoryId: z.string().min(1, "Category is required"),
});

export default function CreateArticle() {
  const form = useForm<z.infer<typeof formSchemaCreateArticle>>({
    resolver: zodResolver(formSchemaCreateArticle),
    defaultValues: {
      image: "",
      title: "",
      categoryId: "",
    },
  });
  const inputImageRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputImageRef.current?.click();
  };
  return (
    <div className="flex flex-col">
      <header className="py-5">
        <Link
          href="/dashboard/articles"
          className="flex items-center gap-2 text-base font-medium text-slate-900"
        >
          <ArrowLeft /> Create Article
        </Link>
      </header>
      <section className="py-6 space-y-6">
        <Form {...form}>
          <form className="space-y-4 *:space-y-1">
            <FormField
              control={form.control}
              name="image"
              render={() => (
                <FormItem>
                  <Label className="text-sm font-medium font-archivo text-gray-900">
                    Thumbnails
                  </Label>
                  <div
                    onClick={handleClick}
                    className="cursor-pointer w-fit h-[163px] flex flex-col justify-center items-center gap-3 bg-white border border-dashed border-gray-300 rounded-xl px-9"
                  >
                    <ImagePlus className="size-5 text-slate-500" />
                    <div className="font-archivo font-normal text-xs text-slate-500 text-center">
                      <p className="underline underline-offset-2">
                        Click to select files
                      </p>
                      <p>Support File Type : jpg or png</p>
                    </div>
                  </div>
                  <FormMessage />
                  <FormControl>
                    <input
                      ref={inputImageRef}
                      type="file"
                      accept="image/jpeg, image/png"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          form.setValue("image", file.name);
                        }
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <Label
                    htmlFor="title"
                    className="text-sm font-medium font-archivo text-gray-900"
                  >
                    Title
                  </Label>
                  <FormControl>
                    <Input
                      id="title"
                      type="text"
                      placeholder="Input title"
                      className="h-10 font-archivo bg-white border border-slate-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSelectCreateArticles form={form} />
          </form>
        </Form>
      </section>
    </div>
  );
}
