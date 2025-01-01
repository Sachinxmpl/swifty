import { useRecoilValue } from "recoil";
import { balance } from "../atom/balance";

export const useBalance = () => {
  return useRecoilValue(balance);
};
