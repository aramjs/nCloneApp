import { memo, useMemo } from "react";
import { InfiniteScroll } from "./InfiniteScroll";
import { LinkCard } from "./LinkCard";
import { Button } from "@/components/ui/button";
import { useLinks } from "@/hooks";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/types/enums";

function LinkListInner() {
  const navigate = useNavigate();

  const { data, isFetching, isRefetching, hasNextPage, fetchNextPage } =
    useLinks();

  const links = useMemo(
    () => data?.pages.flatMap((page) => page.data) || [],
    [data?.pages]
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-2xl font-bold mb-4 flex justify-between">
        Reddit-style Posts
        <Button onClick={() => navigate({ to: ROUTES.ADD_LINK })}>
          Add Link
        </Button>
      </div>

      <InfiniteScroll
        isLoading={isFetching && !isRefetching}
        hasMore={hasNextPage}
        onLoadMore={fetchNextPage}
      >
        <div className="space-y-4">
          {links.map((link) => (
            <LinkCard key={link.id} link={link} />
          ))}
        </div>
      </InfiniteScroll>
      {!hasNextPage && (
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            You've reached the end of the posts!
          </p>
          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </Button>
        </div>
      )}
    </div>
  );
}

export const LinkList = memo(LinkListInner);
