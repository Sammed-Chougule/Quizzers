"use client";
import { useState, useEffect } from "react";
import { SparklesPreview } from '@/components/ui/sparklesPreview';
import { LoaderOne } from "@/components/ui/loader";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { SparklesPreview2 } from "@/components/ui/sparklesPreview2";
import { TracingBeamDemo } from "@/components/tracingBeamDemo";
import { HeroSectionOne } from "@/components/heroSectionOne";

export default function Page() {
  return (
    <div>
      <HeroSectionOne />
      welcome to quizzers
    </div>
  );
}