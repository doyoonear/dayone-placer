import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  isGroupOpen: false,
  groupList: [],
};

export const store = createContext(initialState);

export const useStore = () => useContext(store);

export const StateProvider = ({ children }) => {
  const { Provider } = store;
  const reducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_GROUPMEMBERS':
        return { ...state, isGroupOpen: !state.isGroupOpen };
      case 'SET_GROUPLIST':
        return { ...state, groupList: action.value };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};
