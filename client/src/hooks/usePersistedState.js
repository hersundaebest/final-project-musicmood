// custom hook steps: 1) import all regular react hooks we will make use of
import { useState, useEffect } from "react";

// create our state component

const usePersistedState = (defaultValue, name) => {
  const [state, setState] = useState(() => {
    const storedValue = window.localStorage.getItem(name);

    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    // you need to stringify the value using JSON.stringify before putting it into local storage
    window.localStorage.setItem(name, JSON.stringify(state));
  }, [state]);

  return [state, setState];
};
export default usePersistedState;
