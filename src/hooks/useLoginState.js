import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useLoginState = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [prevLoggedIn, setPrevLoggedIn] = useState(isLoggedIn);

  useEffect(() => {
    if (isLoggedIn !== prevLoggedIn) {
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
      setPrevLoggedIn(isLoggedIn);
    }
  }, [isLoggedIn, prevLoggedIn]);

  return isLoggedIn;
};

export default useLoginState;