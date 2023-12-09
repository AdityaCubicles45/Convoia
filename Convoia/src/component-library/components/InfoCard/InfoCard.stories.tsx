import type React from "react";

interface ImageProps {
    
  src: string;

  header?: string;

  subtext?: string;

  eyebrowText?: string;

  cta?: React.ReactNode;

  alt?: string;
}

export const Image = ({
  src,
  header,
  subtext,
  eyebrowText,
  cta,
  alt,
}: ImageProps) => (
  <div className="relative w-fit text-white">
    <img src={src} alt={alt} className="rounded-lg" />
    <div className="absolute top-0 left-0 p-8 w-6/12">
      <p className="text-xs font-bold">{eyebrowText?.toUpperCase()}</p>
      <h3 className="text-3xl font-bold">{header}</h3>
      <p className="text-s mb-2">{subtext}</p>
      <span>{cta}</span>
    </div>
  </div>
);