import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        "bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-blue-200 transition",
        className
      )}
    >
      <div className="text-blue-600 mb-4">
        {React.cloneElement(icon as React.ReactElement, { size: 24 })}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  );
}
