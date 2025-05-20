"use client";
import React, { useRef, useState } from "react";

export type ImageUploaderProps = {
  label?: string;
  onImageUpload: (file: File) => void;
  initialImage?: string; // URL if editing an existing image
};

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  initialImage,
  label,
}) => {
  const [preview, setPreview] = useState<string | null>(initialImage || null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <div
        className="preview-container"
        onClick={handleClick}
        style={{
          width: "150px",
          height: "150px",
          border: "2px dashed #ccc",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          overflow: "hidden",
          backgroundColor: "#f9f9f9",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#999", textAlign: "center" }}>{label}</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default ImageUploader;
