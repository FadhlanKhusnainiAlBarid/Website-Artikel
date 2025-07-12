"use client";
import Image_Background from "../../../../public/images/image-background.jpg";
import FormCategory from "@/components/custom/form-articles";

export default function HeroSection() {
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
        <FormCategory />
      </div>
    </section>
  );
}
