import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  isGroupOpen: false,
  groupList: [],
};

export const Context = createContext(initialState);

export const StateProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_GROUPMEMBERS':
        return { ...state, isGroupOpen: !state.isGroupOpen };
      case 'SET_GROUPLIST':
        return {
          ...state,
          groupList: action.value,
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};