// import { useMemo } from "react";
import {
  ServerResponse,
  ServerResponseLoc,
  ServerResponseMin,
} from "../models/models";

export function updateData(
  dat: ServerResponse[],
  dat2: ServerResponseMin[],
  dat3: ServerResponseLoc[]
): ServerResponse[] {
  //   const result = useMemo(() => {
  return dat.map((d) => {
    const match = dat2.find((d2) => d.authorId === d2.id);
    const match2 = dat3.find((d3) => d.locationId === d3.id);
    if (match2 && match) {
      return { ...d, location: match2.location, author: match.name };
    }
    return d;
  });
  //   }, [dat, dat2, dat3]);
  //   return result;
}
