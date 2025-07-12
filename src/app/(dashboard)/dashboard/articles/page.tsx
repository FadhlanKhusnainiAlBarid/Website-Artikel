"use server";
import FormCategory from "@/components/custom/form-category";
import React from "react";

function Articles() {
  return (
    <div className="flex flex-col">
      <header className="flex flex-col gap-6">
        <h1 className="text-base font-medium text-slate-800">
          Total Articles : 25
        </h1>
        <div className="-mx-6 py-6 border-y border-slate-200">
          <FormCategory />
        </div>
      </header>
    </div>
  );
}

export default Articles;
