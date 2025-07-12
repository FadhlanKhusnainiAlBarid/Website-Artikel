import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./form-articles";
import z from "zod";
import { usePathname } from "next/navigation";

export default function InputArticles({
  form,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
}) {
  const pathname = usePathname();
  return (
    <FormField
      control={form.control}
      name="search"
      render={({ field }) => (
        <FormItem
          className={` ${
            pathname.startsWith("/dashboard")
              ? "min-w-fit lg:min-w-[240px] md:min-w-fit"
              : "min-w-full md:min-w-[400px]"
          } relative flex items-center`}
        >
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
  );
}
