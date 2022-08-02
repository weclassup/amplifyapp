import { useCallback, useEffect, useRef, useState } from "react";
import { useMountedState } from "react-use";

import { AxiosResponse } from "axios";

import { PagingRequest } from "@api/teacher.api";

const useInfiniteScrollPagination = <
  Params extends { paging: PagingRequest },
  Response extends PageDto<any>
>({
  api,
  parameters,
  pageSize = 10,
}: {
  api: (params: Params) => Promise<AxiosResponse<Response>>;
  parameters: Omit<Params, "paging">;
  pageSize?: number;
}): {
  items: Response["items"];
  pagination: {
    atPage: number;
    totalCount: number;
    totalPages: number;
  };
  isLastPage: boolean;
  turnPage: () => void;
} => {
  const [items, setItems] = useState<Response["items"]>([]);
  const [pagination, setPagination] = useState<{
    atPage: number;
    totalCount: number;
    totalPages: number;
  }>({
    atPage: 0,
    totalCount: 0,
    totalPages: 0,
  });

  const paginationCache = useRef<{
    atPage: number;
    totalCount: number;
    totalPages: number;
  }>(pagination);

  const itemCount = useRef<number>(0);

  const isMounted = useMountedState();

  const callback = useCallback(
    async (page: number) => {
      const params = Object.assign(
        {},
        { ...parameters },
        {
          paging: { page, pageSize },
        }
      ) as any;
      const { data } = await api(params);
      const { atPage, totalPages, totalCount, items } = data;
      if (isMounted()) {
        if (paginationCache.current.atPage === atPage) return;
        setItems((prev) => {
          const newItems = [...prev, ...items];
          itemCount.current = newItems.length;
          return newItems;
        });
        setPagination(() => {
          const newPagination = { atPage, totalPages, totalCount };
          paginationCache.current = newPagination;
          return newPagination;
        });
      }
    },
    [pageSize]
  );

  const turnPage = useCallback(async () => {
    const { atPage, totalPages, totalCount } = paginationCache.current;
    if (atPage >= totalPages) return;
    if (itemCount.current >= totalCount) return;
    const nextPage = atPage + 1;
    await callback(nextPage);
  }, []);

  useEffect(() => {
    callback(1);
  }, []);

  return {
    items,
    pagination,
    isLastPage: pagination.atPage >= pagination.totalPages,
    turnPage,
  };
};

export default useInfiniteScrollPagination;
