import React, { useEffect, useState } from "react";
import {
  useAllAuthorsQuery,
  useAllLocationsQuery,
  useAllPaintingsQuery,
  useLazySearchNamesQuery,
  useLazySortAuthorsQuery,
  useLazySortLokationsQuery,
  useLazySortYearsQuery,
} from "../../store/paintings/paintings.api";
import { updateData } from "../../utils/updateData";
import cl from "./Navigation.module.scss";
import {
  ServerResponse,
  ServerResponseLoc,
  ServerResponseMin,
} from "../../models/models";
import NavRange from "../NavRange/NavRange";
import NavName from "../NavName/NavName";
import { useDebounce } from "../../hooks/debounce";
import NavAuthor from "../NavAuthor/NavAuthor";
import NavLocation from "../NavLocation/NavLocation";

type NavProps = {
  page: number;
  onChange: (value: ServerResponse[]) => void;
  changeTotalCount: (value: number) => void;
};

const Navigation: React.FC<NavProps> = ({
  page,
  onChange,
  changeTotalCount,
}) => {
  const [name, setName] = useState<string>("");
  const [author, setAuthor] = useState<ServerResponseMin | null>(null);
  const [location, setLocation] = useState<ServerResponseLoc | null>(null);
  const [years, setYears] = useState<{ from: string; before: string }>({
    from: "",
    before: "",
  });
  const { data, isLoading, isError } = useAllPaintingsQuery(page);
  const {
    data: dataAutors,
    isError: isErrorAut,
    isLoading: isLoadingAut,
  } = useAllAuthorsQuery("");
  const {
    data: dataLocations,
    isError: isErrorLoc,
    isLoading: isLoadingLoc,
  } = useAllLocationsQuery("");
  const [fetchAuthors, { data: dataAutSort }] = useLazySortAuthorsQuery();
  const [fetchLocations, { data: dataLocSort }] = useLazySortLokationsQuery();
  const [fetchYears, { data: dataYearsSort }] = useLazySortYearsQuery();
  const [fetchNames, { data: dataNames }] = useLazySearchNamesQuery();

  const debYearsFrom = useDebounce(years.from);
  const debYearsBefore = useDebounce(years.before);
  const debName = useDebounce(name);

  useEffect(() => {
    if (data?.totalCount) changeTotalCount(data.totalCount);
  }, [data]);

  useEffect(() => {
    if (author) {
      fetchAuthors({ page: page, id: author.id });
      setLocation(null);
      setYears({
        from: "",
        before: "",
      });
      setName("");
    }
  }, [author]);

  useEffect(() => {
    if (location) {
      fetchLocations({ page: page, id: location.id });
      setAuthor(null);
      setYears({
        from: "",
        before: "",
      });
      setName("");
    }
  }, [location]);

  useEffect(() => {
    if (years.from !== "" && years.before !== "") {
      fetchYears({ page: page, from: debYearsFrom, before: debYearsBefore });
      setName("");
      setAuthor(null);
      setLocation(null);
    }
  }, [debYearsFrom, debYearsBefore]);
  useEffect(() => {
    if (name !== "") {
      fetchNames({ page: page, name: debName });
      setYears({
        from: "",
        before: "",
      });
      setAuthor(null);
      setLocation(null);
    }
  }, [debName]);

  useEffect(() => {
    if (dataAutors && dataLocations) {
      if (author && dataAutSort)
        onChange(updateData(dataAutSort, dataAutors, dataLocations));
      if (location && dataLocSort)
        onChange(updateData(dataLocSort, dataAutors, dataLocations));
      if (years.from !== "" && years.before !== "" && dataYearsSort)
        onChange(updateData(dataYearsSort, dataAutors, dataLocations));
      if (name && dataNames)
        onChange(updateData(dataNames, dataAutors, dataLocations));
    }
  }, [
    dataAutors,
    dataLocations,
    dataAutSort,
    dataLocSort,
    dataYearsSort,
    dataNames,
  ]);

  useEffect(() => {
    if (
      !author &&
      !location &&
      years.from === "" &&
      years.before === "" &&
      name === ""
    ) {
      if (data && dataAutors && dataLocations)
        onChange(updateData(data.apiResponse, dataAutors, dataLocations));
    }
  }, [author, location, years, name, page, data, dataAutors, dataLocations]);

  return (
    <>
      <div className={cl.navigation}>
        <NavName selected={name} onChange={setName} />
        {dataAutors && (
          <NavAuthor
            options={dataAutors}
            selected={author}
            onChange={setAuthor}
            placeholder="Author"
          />
        )}
        {dataLocations && (
          <NavLocation
            options={dataLocations}
            selected={location}
            onChange={setLocation}
            placeholder="Location"
          />
        )}
        <NavRange selected={years} onChange={setYears} placeholder="Created" />
      </div>
      {isError && <p className={cl.err}>Something went wrong...</p>}
      {isLoading && <p className={cl.load}>Loading...</p>}
      {isErrorAut && <p className={cl.err}>Something went wrong...</p>}
      {isErrorLoc && <p className={cl.err}>Something went wrong...</p>}
      {isLoadingAut && <p className={cl.load}>Loading...</p>}
      {isLoadingLoc && <p className={cl.load}>Loading...</p>}
    </>
  );
};

export const MemoNavigation = React.memo(Navigation);
