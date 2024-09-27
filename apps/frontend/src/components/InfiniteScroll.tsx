import React, { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

interface InfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  variant?: "auto" | "click";
}

export function InfiniteScroll({
  variant = "auto",
  isLoading,
  hasMore,
  onLoadMore,
  children,
}: InfiniteScrollProps) {
  const [error, setError] = useState<string | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  const canClick = variant === "click" && !isLoading;

  useEffect(() => {
    if (variant === "click") return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setError(null);
          try {
            onLoadMore();
          } catch {
            setError(
              "An error occurred while loading more items. Please try again."
            );
          }
        }
      },
      { threshold: 1.0 }
    );

    const el = observerTarget.current;

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [hasMore, isLoading, onLoadMore, variant]);

  return (
    <div className="space-y-4">
      {children}
      {(hasMore || isLoading) && (
        <div
          ref={observerTarget}
          className="flex justify-center items-center h-20"
        >
          {isLoading ? (
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          ) : (
            <Button
              variant="link"
              className={cn(
                "text-sm font-bold text-muted-foreground",
                canClick && "cursor-pointer"
              )}
              onClick={canClick ? onLoadMore : undefined}
            >
              Load More
            </Button>
          )}
        </div>
      )}
      {error && (
        <div className="text-center text-sm text-red-500 p-4">{error}</div>
      )}
    </div>
  );
}
