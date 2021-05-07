export const Types = {
  FETCH_GET_ALL_TABLE_LIST: "FETCH_GET_ALL_TABLE_LIST",
};

export const getAllTableList = (params: any, callback: () => void) => ({
  type: Types.FETCH_GET_ALL_TABLE_LIST,
  params,
  callback,
});
