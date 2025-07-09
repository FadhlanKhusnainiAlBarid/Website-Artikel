import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image_Background from "../../../public/images/image-background.jpg";

export default function ListArticles() {
  return (
    <>
      <header className="w-full h-[624px] md:h-[500px] flex justify-center items-center bg-[#2563EB]/[86%] px-[15px]">
        <div className="max-w-[730px] flex flex-col items-center gap-10">
          <div className="text-center text-white font-archivo space-y-3">
            <p className="font-bold text-sm md:text-base">Blog genzet</p>
            <h1 className="text-4xl md:text-5xl font-medium text-center">
              The Journal : Design Resources, Interviews, and Industry News
            </h1>
            <p className="text-xl md:text-2xl">
              Your daily dose of design insights!
            </p>
          </div>
          <div className="w-full md:w-fit flex flex-col md:flex-row items-center gap-2 p-2.5 bg-[rgb(59,130,246)] rounded-xl">
            <Select>
              <SelectTrigger className="w-full md:w-[180px] min-h-10 bg-white font-archivo">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="min-w-full md:min-w-[400px] relative flex items-center">
              <Search className="absolute left-2 size-4 text-gray-500" />
              <Input
                className="bg-white h-10 font-archivo pl-7"
                placeholder="Search articles"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
