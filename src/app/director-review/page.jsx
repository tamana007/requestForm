"use client";

import React from "react";
import DirectorReview from "../director-review";
import Logo from "@/components/Logo";
import { Suspense } from "react";

function page() {
  return (
    <>
      <Suspense>
        <Logo />
        <DirectorReview />
      </Suspense>
    </>
  );
}

export default page;
