
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  aspectRatio?: "1/1" | "4/3" | "16/9" | "3/2" | "3/4";
  isBase64?: boolean;
}

const LazyImage = ({
  src,
  alt,
  className,
  width,
  height,
  objectFit = "cover",
  aspectRatio = "16/9",
  isBase64 = false,
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);

  // Generate a safe ID from the src or use a fallback if src is undefined
  // For base64 images, use a random ID to avoid very long IDs
  const safeId = isBase64 
    ? `image-${Math.random().toString(36).substring(2, 15)}`
    : src ? `image-${src.replace(/[^\w]/g, "")}` : "image-placeholder";

  useEffect(() => {
    // Skip intersection observer for base64 images (they're already loaded)
    if (isBase64) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px",
      }
    );

    const currentRef = document.getElementById(safeId);
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [safeId, isBase64]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const aspectRatioClass = {
    "1/1": "aspect-square",
    "4/3": "aspect-[4/3]",
    "16/9": "aspect-[16/9]",
    "3/2": "aspect-[3/2]",
    "3/4": "aspect-[3/4]",
  }[aspectRatio];

  const objectFitClass = {
    cover: "object-cover",
    contain: "object-contain",
    fill: "object-fill",
    none: "object-none",
    "scale-down": "object-scale-down",
  }[objectFit];

  return (
    <div
      id={safeId}
      className={cn(
        "overflow-hidden relative",
        aspectRatioClass,
        className
      )}
      style={{ width, height }}
    >
      {(isInView || isBase64) && src && (
        <>
          <div
            className={cn(
              "absolute inset-0 lazy-image",
              isLoaded ? "opacity-0" : "opacity-100"
            )}
            style={{
              transition: "opacity 0.3s ease",
            }}
          />
          <img
            src={src}
            alt={alt}
            onLoad={handleImageLoad}
            className={cn(
              "w-full h-full transition-opacity duration-500",
              objectFitClass,
              isLoaded || isBase64 ? "opacity-100" : "opacity-0"
            )}
          />
        </>
      )}
    </div>
  );
};

export default LazyImage;