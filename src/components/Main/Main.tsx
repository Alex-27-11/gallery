import React, { useEffect, useState } from "react";
import { getPagesArray } from "../../utils/pages";
import cl from "./Main.module.scss";
import { MemoPagination } from "../Pagination/Pagination";
import { MemoNavigation } from "../Navigation/Navigation";
import { ServerResponse } from "../../models/models";

const Main: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pagesArr, setPagesArr] = useState<number[]>([]);
  const [dataMain, setDataMain] = useState<ServerResponse[]>([]);

  useEffect(() => {
    if (totalCount === 0) {
      return;
    }
    setTotalPages(Math.ceil(totalCount / 12));
    setPagesArr(getPagesArray(totalPages));
  }, [totalCount, totalPages]);

  return (
    <div className={cl.main}>
      <div className="container">
        <div className={cl.container}>
          <div className={cl.navigation}>
            <MemoNavigation
              page={page}
              onChange={setDataMain}
              changeTotalCount={setTotalCount}
            />
          </div>
          <div className={cl.inner}>
            {dataMain?.map((card) => (
              <div key={card.id} className={cl.card}>
                <img
                  src={`https://test-front.framework.team/${card.imageUrl}`}
                  alt={"cardimg"}
                  className={cl.cardImg}
                />
                <div className={cl.cardBoard}>
                  <div className={cl.cardDis}>
                    <p className={cl.cardTitle}>{card.name}</p>
                    <p>
                      <span className={cl.cardBold}>Author:</span>
                      <span className={cl.cardLight}>{card.author}</span>
                    </p>
                    <p>
                      <span className={cl.cardBold}>Created:</span>
                      <span className={cl.cardLight}>{card.created}</span>
                    </p>
                    <p>
                      <span className={cl.cardBold}>Location:</span>
                      <span className={cl.cardLight}>{card.location}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <MemoPagination nums={pagesArr} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
};

export default Main;
