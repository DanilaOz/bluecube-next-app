"use client";

import axios from "axios";
import { BASE_URL } from "@/utils/constants";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import PaginationProducts from "../PaginationProducts/PaginationProducts";
import Loader from "../Loader/Loader";
import '../../app/globals.css'

const ThePagination = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("page");
  const pathname = usePathname();
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(search ? parseInt(search) : 1);
  const [pageQty, setPageQty] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mass, setMass] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${BASE_URL}${pathname}?page=${page}&limit=15`).then(({data}) => {  
        setPageQty(Math.ceil(data.meta.total / 15))
        setPage(search ? parseInt(search) : 1)
        setResults(data.data)
        setMass(data.data.map(item => item.id)) // Redux mass
        setIsLoading(false);
    })
  }, [page, search, pathname]);

  if (mass) { // Redux
    console.log(mass);
  }

  return (
    <>
      {!isLoading ? <PaginationProducts results={results} /> : <Loader />}
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
              slots={{ previous: ArrowBackRoundedIcon, next: ArrowForwardRoundedIcon }}
              {...item}
            />
          )}
        />
      )}
    </>
  );
};

export default ThePagination;
