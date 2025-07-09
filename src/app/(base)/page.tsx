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
import CardArticle from "@/components/custom/card-article";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function ListArticles() {
  return (
    <>
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
      </section>
      <section className="mx-auto container max-w-[1440px] space-y-6 pt-10 pb-[60px] md:pb-[100px] px-5 md:px-[100px]">
        <h6 className="font-archivo text-base hidden md:block">
          Showing : 20 of 240 articles
        </h6>
        <div className="w-fit grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-[40px] md:gap-y-[60px]">
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
          <CardArticle />
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </section>
    </>
  );
}
