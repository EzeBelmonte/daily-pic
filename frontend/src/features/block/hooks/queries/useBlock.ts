import { useQuery } from "@tanstack/react-query";

import * as blocksApi from "@/api/blocks.api";

import type { Block } from "@daily-pic/shared/types";

export function useBlock(username: string) {
  return useQuery<Block | null>({
    queryKey: ["blocks", username],
    queryFn: () => blocksApi.getBlock(username),
    enabled: !!username,
  });
}