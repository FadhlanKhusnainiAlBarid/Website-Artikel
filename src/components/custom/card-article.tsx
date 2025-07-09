import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function CardArticle() {
  return (
    <div className="w-fit space-y-4">
      <Image
        width={400}
        height={240}
        className="h-[200px] md:h-[240px] rounded-xl object-cover"
        src="https://s3.sellerpintar.com/articles/articles/1751825258989-Screenshot%202025-06-25%20at%2008.35.13.png"
        alt="ddddd"
      />
      <div className="space-y-2 font-archivo">
        <p className="text-xs md:text-sm">April 13, 2025</p>
        <h1 className="text-base md:text-lg font-semibold">
          Cybersecurity Essentials Every Developer Should Know
        </h1>
        <p className="text-sm md:text-base">
          Protect your apps and users with these fundamental cybersecurity
          practices for developers.
        </p>
        <div className="flex items-center gap-2">
          <Badge className="rounded-full px-3 py-1 bg-blue-200 text-xs md:text-sm text-blue-900 font-archivo">
            Tech
          </Badge>
        </div>
      </div>
    </div>
  );
}
