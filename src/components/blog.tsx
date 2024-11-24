"use client";

import { SelectTranscript } from "@/lib/schemas";
import { Intel } from "@/types/intel";
import { MarkdownRenderer } from "./markdown-renderer";
import { CopyIcon } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function Blog({ intel }: { intel: Intel | SelectTranscript }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border  w-full">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            navigator.clipboard.writeText(intel.blogPost || "");
            toast.success("Copied to clipboard");
          }}
        >
          <span className="mr-2">Copy</span>
          <CopyIcon className="h-4 w-4" />
        </Button>
      </div>
      <MarkdownRenderer content={intel.blogPost || ""} />
    </div>
  );
}
