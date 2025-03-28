"use client"

import { cn } from "@/lib/utils"
import React from "react"

export interface BentoGridProps {
  className?: string
  children?: React.ReactNode
}

export interface BentoGridItemProps {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
  children?: React.ReactNode
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  )
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  children,
}: BentoGridItemProps) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon && <div className="mb-2">{icon}</div>}
        <div className="font-semibold text-neutral-600 dark:text-neutral-200 mb-2">
          {title}
        </div>
        <div className="font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
        {children}
      </div>
    </div>
  )
} 