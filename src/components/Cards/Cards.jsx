"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import useCards from "@/app/hooks/useCards";
import Card from "../Card/Card";
import _ from "lodash";

const Cards = () => {
  const [pageNum, setPageNum] = useState(1);
  const { isLoading, isError, error, results, hasNextPage } = useCards(pageNum);

  const intObserver = useRef();
  const lastCardRef = useCallback(
    (card) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((cards) => {
        if (cards[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (card) intObserver.current.observe(card);
    },
    [isLoading, hasNextPage]
  );

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");

    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem("scrollPosition", window.pageYOffset.toString());
    };

    const throttleHandleSCroll = _.throttle(handleScroll, 200);

    window.addEventListener("scroll", throttleHandleSCroll);

    return () => window.removeEventListener("scroll", throttleHandleSCroll);
  }, []);

  if (isError) return <p>Error: {error.message}</p>;

  const content = results.map((card, i) => {
    if (results.length === i + 1) {
      return <Card ref={lastCardRef} key={card.id} card={card} />;
    }
    return <Card key={card.id} card={card} />;
  });

  return (
    <>
      {content}
      {isLoading && <p>Loading More Cards ...</p>}
    </>
  );
};

export default Cards;
