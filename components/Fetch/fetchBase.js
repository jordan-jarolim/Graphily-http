import isomorphicFetch from 'isomorphic-unfetch';
import isFunction from 'lodash/isFunction';

const fetchBase = async ({ url, options, setData, setLoading, setError, callback }) => {
  setLoading(true);
  try {
    console.log(`fetching ${url}`);
    const res = await isomorphicFetch(url, options);
    const json = await res.json();
    setData(json);
    setLoading(false);
    if (isFunction(callback)) {
      callback();
    }
  } catch (error) {
    setError(error.toString());
    setLoading(false);
  }
};

export default fetchBase;
