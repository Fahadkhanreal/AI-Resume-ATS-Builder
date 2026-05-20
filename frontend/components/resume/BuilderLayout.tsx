"use client";

import { ReactNode } from "react";

interface BuilderLayoutProps {
  children: ReactNode;
  preview: ReactNode;
}

export default function BuilderLayout({ children, preview }: BuilderLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="border-b border-slate-700 bg-slate-800/50 px-3 py-3 sm:px-6 sm:py-4">
        <h1 className="text-base font-semibold text-white sm:text-2xl sm:font-bold">
          Resume Builder
        </h1>
      </div>

      <div className="flex flex-col xl:h-[calc(100vh-57px)] xl:flex-row xl:overflow-hidden">
        <div className="w-full border-b border-slate-700 bg-slate-900 xl:w-[45%] xl:border-b-0 xl:border-r xl:overflow-y-auto">
          <div className="p-3 sm:p-4 lg:p-6">{children}</div>
        </div>

        <div className="w-full bg-slate-800/30 p-3 sm:p-4 lg:p-6 xl:w-[55%] xl:overflow-y-auto">
          <div className="mb-3 flex items-center justify-between xl:hidden">
            <h2 className="text-sm font-semibold text-slate-300">Live Preview</h2>
          </div>
          <div className="mx-auto w-full max-w-full overflow-x-auto rounded-lg bg-white p-2 shadow-lg sm:p-5 lg:p-8 xl:min-h-full">
            <div className="mx-auto min-w-[300px] max-w-[820px] origin-top sm:min-w-[560px] xl:min-w-0">
              {preview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
