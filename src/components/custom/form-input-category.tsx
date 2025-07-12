import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./form-category";
import z from "zod";
import { usePathname } from "next/navigation";

function InputCategory({
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
              ? "min-w-full md:min-w-[240px]"
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

export default InputCategory;
