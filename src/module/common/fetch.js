import axios from 'axios';

export const fetch = (url, options) => {
  const {
    method = 'GET',
    body,
    query
  } = options;
  return axios({
    method,
    data: {}
  });
};