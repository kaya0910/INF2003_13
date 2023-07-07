import { BASE_URL } from "../constants";

export const getData = async () => {
  const res = await fetch(BASE_URL + "/survey");
  return await res.json();
};

export const getByRegion = async () => {
  const res = await fetch(BASE_URL + "/byRegion");
  return await res.json();
};

export const getByGDP = async () => {
  const res = await fetch(BASE_URL + "/byGDP");
  return await res.json();
};

export const getByData = async () => {
  const res = await fetch(BASE_URL + "/byData");
  return await res.json();
};
