/// <reference types="vite/client" />

type CIDRCalcResults = {
  cidrRange: string | null;
  netmask: string | null;
  wildcardBits: string | null;
  network: string | null;
  broadcast: string | null;
  usableStart: string | null;
  usableEnd: string | null;
  usableStartDecimal: number | null;
  usableEndDecimal: number | null;
  firstIPDecimal: number | null;
  lastIPDecimal: number | null;
  totalHosts: number | null;
};
