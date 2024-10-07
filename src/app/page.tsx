"use client";

import Home from "@/app/Home";
import React, { Suspense } from "react";

export default function Root() {
    return (
        <Suspense fallback={"Loading..."}>
            <Home />
        </Suspense>
    );
}
