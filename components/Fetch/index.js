import { useState } from 'react';
import fetchBase from './fetchBase';

const Fetch = ({ children, url, options, callback }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const fetch = async (inlineUrl, inlineOptions, inlineCallback) => {
    await fetchBase({
      url: url || inlineUrl,
      options: options || inlineOptions,
      setData,
      setLoading,
      setError,
      callback: callback || inlineCallback,
    });
  };
  return children({
    fetch,
    data,
    error,
    loading,
  });
};

export default Fetch;
