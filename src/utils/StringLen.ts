export const stringLen = (len: number, value?: string) => {
  if (!value) return;
  return value.length >= len ? value.slice(0, len) + "..." : value;
};
