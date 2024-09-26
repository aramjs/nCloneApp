import { useLinks } from "@/hooks";

export function LinkList() {
  const { isLoading, data } = useLinks();

  console.log({ isLoading, data });

  return <div>LinkList ha</div>;
}
