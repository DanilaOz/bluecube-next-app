"use client";

import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Pagination, PaginationItem } from "@mui/material";
import { useDispatch } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import PaginationProducts from "../PaginationProducts/PaginationProducts";
import { updatePaginationPageNumber } from "@/store/features/paginationPageNumber";
import Orders from "../Orders/Orders";
import Loader from "../Loader/Loader";
import "../../app/globals.css";

const ThePagination = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  const source = searchParams.get("source");
  const pathname = usePathname();
  const [requestData, setRequestData] = useState([]);
  const [page, setPage] = useState(search && !source ? parseInt(search) : 1);
  const [pageQty, setPageQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const limit = pathname === "/products" ? 15 : 8;
    axios
      .get(`${BASE_URL}${pathname}?page=${page}&limit=${limit}`, { withCredentials: true })
      .then(({ data }) => {
        console.log(data);
        setPageQty(Math.ceil(data.meta.total / limit));
        setPage(search ? parseInt(search) : 1);
        setRequestData(data.data);
        dispatch(updatePaginationPageNumber(search ? parseInt(search) : 1));
        setIsLoading(false);
      });
  }, [page, search, pathname]);

  return (
    <>
      {!isLoading ? (
        pathname === "/products" ? (
          <PaginationProducts requestData={requestData} />
        ) : (
          <Orders requestData={requestData} />
        )
      ) : (
        <Loader />
      )}
      {!!pageQty && !isLoading && (
        <Pagination
          count={pageQty}
          page={page}
          shape="rounded"
          className="paginationStyles"
          siblingCount={0}
          boundaryCount={2}
          onChange={(_, num) => {
            if (num === 1) {
              router.push(`${pathname}`);
            } else router.push(`${pathname}?page=${num}`);
          }}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: ArrowBackRoundedIcon,
                next: ArrowForwardRoundedIcon,
              }}
              {...item}
            />
          )}
        />
      )}
    </>
  );
};

export default ThePagination;
