import React from "react";
import cl from "./Pagination.module.scss";
import { ReactComponent as ArrML } from "../../assets/mobil/arrML.svg";
import { ReactComponent as ArrL } from "../../assets/mobil/arrL.svg";
import { ReactComponent as ArrMR } from "../../assets/mobil/arrMR.svg";
import { ReactComponent as ArrR } from "../../assets/mobil/arrR.svg";

type Props = {
  nums: number[];
  page: number;
  setPage: (page: number) => void;
};

const Pagination: React.FC<Props> = ({ nums, page, setPage }) => {
  const addPage = (pag: number) => {
    setPage(pag);
  };
  const henArrML = () => {
    setPage(1);
  };
  const henArrL = () => {
    if (page > 1) setPage(page - 1);
  };
  const henArrMR = () => {
    setPage(nums.length);
  };
  const henArrR = () => {
    if (page < nums.length) setPage(page + 1);
  };

  return (
    <div className={cl.pagination}>
      <div className={cl.inner}>
        <button
          className={page === 1 ? cl.arrPas : cl.button}
          onClick={henArrML}
        >
          <ArrML className={cl.arr} />
        </button>
        <button
          className={page === 1 ? cl.arrPas : cl.button}
          onClick={henArrL}
        >
          <ArrL className={cl.arr} />
        </button>
        {nums.map((num) => (
          <button
            key={num}
            className={num === page ? cl.buttonActive : cl.button}
            onClick={() => addPage(num)}
          >
            {num}
          </button>
        ))}
        <button
          className={page === nums.length ? cl.arrPas : cl.button}
          onClick={henArrR}
        >
          <ArrR className={cl.arr} />
        </button>
        <button
          className={page === nums.length ? cl.arrPas : cl.button}
          onClick={henArrMR}
        >
          <ArrMR className={cl.arr} />
        </button>
      </div>
    </div>
  );
};

export const MemoPagination = React.memo(Pagination);
