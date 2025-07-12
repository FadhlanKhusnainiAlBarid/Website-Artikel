"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useArticlesStore } from "@/state/state";

export default function PaginationArticles() {
  const { pagination, setPagination } = useArticlesStore();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem
          className="cursor-pointer"
          onClick={() =>
            setPagination({
              ...pagination,
              page: pagination.page == 1 ? 1 : pagination.page - 1,
            })
          }
        >
          <PaginationPrevious />
        </PaginationItem>
        {pagination.page >= 3 && (
          <PaginationItem className="cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {Array(Math.ceil(pagination.total / 9))
          .keys()
          .map((_, index) => (
            <PaginationItem
              className={`cursor-pointer ${
                Math.abs(pagination.page - (index + 1)) <= 1
                  ? "block"
                  : "hidden"
              } `}
              key={index}
              onClick={() => setPagination({ ...pagination, page: index + 1 })}
            >
              <PaginationLink isActive={pagination.page === index + 1}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        {pagination.page + 1 < Math.ceil(pagination.total / 9) && (
          <PaginationItem className="cursor-pointer">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem
          className="cursor-pointer"
          onClick={() =>
            setPagination({
              ...pagination,
              page:
                pagination.page === Math.ceil(pagination.total / 9)
                  ? Math.ceil(pagination.total / 9)
                  : pagination.page + 1,
            })
          }
        >
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
