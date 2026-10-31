import React from "react";

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  transparent?: boolean;
  priority?: boolean;
  className?: string;
}

export const Img: React.FC<ImgProps> = ({
  src,
  alt,
  transparent,
  priority = false,
  className = "",
  loading,
  ...rest
}) => {
  // If the src is the standalone fssai logo without webp
  if (src.includes("fssai-logo")) {
    return (
      <img
        src="/images/brand/fssai-logo.png"
        alt={alt}
        loading={priority ? "eager" : loading || "lazy"}
        className={className}
        {...rest}
      />
    );
  }

  // Strip extension if provided
  const basePath = src.replace(/\.(webp|png|jpg|jpeg)$/i, "");

  // Determine fallback extension
  let fallbackExt = ".jpg";
  if (
    transparent ||
    basePath.includes("-bowl") ||
    basePath.includes("/decor/") ||
    basePath.includes("/brand/")
  ) {
    fallbackExt = ".png";
  }

  const webpSrc = `${basePath}.webp`;
  const fallbackSrc = `${basePath}${fallbackExt}`;

  return (
    <picture className="inline-block">
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={fallbackSrc}
        alt={alt}
        loading={priority ? "eager" : loading || "lazy"}
        decoding="async"
        className={className}
        {...rest}
      />
    </picture>
  );
};

export default Img;

