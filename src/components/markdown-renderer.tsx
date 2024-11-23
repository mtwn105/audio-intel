import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ ...props }) => (
          <h1 className="text-4xl font-bold mb-4 text-gray-900" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2
            className="text-3xl font-semibold mb-3 text-gray-800"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3
            className="text-2xl font-semibold mb-2 text-gray-700"
            {...props}
          />
        ),
        p: ({ ...props }) => <p className="mb-4 text-gray-600" {...props} />,
        ul: ({ ...props }) => (
          <ul className="list-disc pl-5 mb-4 text-gray-600" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="list-decimal pl-5 mb-4 text-gray-600" {...props} />
        ),
        li: ({ ...props }) => <li className="mb-1" {...props} />,
        a: ({ ...props }) => (
          <a className="text-blue-600 hover:underline" {...props} />
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            className="border-l-4 border-gray-300 pl-4 italic my-4 text-gray-600"
            {...props}
          />
        ),

        pre: ({ ...props }) => <pre className="mb-4" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
