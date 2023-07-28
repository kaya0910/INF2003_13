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

export const getByHappiness = async () => {
  const res = await fetch(BASE_URL + "/byHappiness");
  return await res.json();
};

export const getByData = async () => {
  const res = await fetch(BASE_URL + "/byData");
  return await res.json();
};

export const getTopEconomies= async () => {
  const res = await fetch(BASE_URL + "/aggregate/top_economies");
  return await res.json();
};

export const getByAverageHappiness = async () => {
  const res = await fetch(BASE_URL + "/aggregate/average_happiness_by_region");
  return await res.json();
};

export const getByHighestLowestRegion = async () => {
  const res = await fetch(BASE_URL + "/aggregate/highest_lowest_region");
  return await res.json();
};

export const getByAggregateHealthScoreRegion = async () => {
  const res = await fetch(BASE_URL + "/aggregate/health_score_region");
  return await res.json();
};
