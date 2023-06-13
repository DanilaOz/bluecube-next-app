"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getPageData } from "../apis/pageData";

const useCards = (pageNum = 1) => {
  let pathname = usePathname();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  if (pathname === "/") {
    pathname = "products";
  }

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;

    getPageData(pageNum, pathname, { signal })
      .then((data) => {
        setResults((prev) => [...prev, ...data]);
        setHasNextPage(data.length);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNum, pathname]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useCards;
