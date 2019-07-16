import { useState, useEffect } from 'react';
import fetchBase from './fetchBase';

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    fetchBase({ url, options, setData, setLoading, setError });
  }, []);
  return { data, error, loading };
};

export default useFetch;
