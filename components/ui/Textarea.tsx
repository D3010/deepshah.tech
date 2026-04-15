"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, rows = 5, ...props }, ref) => {
    const fieldId = id ?? props.name;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={fieldId}
            className="mb-2 block text-sm font-medium text-fg/90"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={error ? `${fieldId}-error` : undefined}
          className={cn(
            "w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition-all duration-200 outline-none",
            "hover:border-white/20 focus:border-primary/60 focus:bg-white/[0.05] focus:shadow-glow",
            error && "border-red-500/50 focus:border-red-500/60 focus:shadow-none",
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${fieldId}-error`} className="mt-1.5 text-xs text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
