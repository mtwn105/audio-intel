"use client";

import React, { useState, useRef, DragEvent } from "react";
import { Music, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Component({
  onFileChange,
}: {
  onFileChange: (file: File | null) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);

    const droppedFiles = Array.from(e.dataTransfer.files);

    if (droppedFiles.length > 1) {
      setError("Only one file is allowed");
      return;
    }

    const droppedFile = droppedFiles[0];
    if (!droppedFile.type.startsWith("audio/")) {
      setError("Only audio files are allowed");
      return;
    }

    setFile(droppedFile);
    onFileChange(droppedFile);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = e.target.files?.[0];
    if (selectedFile && !selectedFile.type.startsWith("audio/")) {
      setError("Only audio files are allowed");
      return;
    }
    setFile(selectedFile || null);
    onFileChange(selectedFile || null);
  };

  const handleRemoveFile = () => {
    setFile(null);
    onFileChange(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full mx-auto mt-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? "border-primary bg-primary/10"
            : "border-gray-300 hover:border-primary hover:bg-primary/5"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleContainerClick}
      >
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Music className="w-6 h-6 mr-2 text-primary" />
              <span className="text-sm font-medium">{file.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFile();
              }}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 mx-auto text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop your audio file here, or click to select
            </p>
          </>
        )}
        <input
          type="file"
          accept="audio/*"
          onChange={handleFileInputChange}
          className="hidden"
          ref={fileInputRef}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
