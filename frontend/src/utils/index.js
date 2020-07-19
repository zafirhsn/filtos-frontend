import queryString from "query-string";

export function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function extractOffset(url) {
  let params = url.substring(url.indexOf("?"));
  let query = queryString.parse(params);
  let offset = Number(query.offset);
  return offset;
}