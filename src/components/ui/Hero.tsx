"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/utils/cn";
import { Spotlight } from "@/components/ui/Spotlight";
import { Button } from "@/components/ui/button";

export default function Hero({url}:{url:string}) {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          Chat <br />
          With PDF.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          Unleash the potential of digital learning with our Chat with PDF app,
          turning static text into engaging conversations!"
        </p>

        <div className="flex justify-center my-8">
         
          <Button type="button" onClick={() => router.push(`/${url}`)}>
            Getting Started
          </Button>
        </div>
      </div>
    </div>
  );
}
