import React, { createContext, useReducer } from 'react';

const initialState = {
  motherGroupList: [],
  groupList: [],
  groupColors: [],
  isDeleteIconOn: false,
};

export const Context = createContext(initialState);

export const StateProvider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'TOGGLE_GROUPMEMBERS':
        return {
          ...state,
          groupList: state.groupList.map((group, index) => {
            return index === action.index ? { ...group, isGroupOpen: !group.isGroupOpen } : group;
          }),
        };
      case 'SET_MOTHERGROUPS':
        return {
          ...state,
          motherGroupList: action.value,
        };
      case 'SET_GROUPLIST':
        return {
          ...state,
          groupList: action.value,
        };
      case 'TOGGLE_DELETEBTN':
        return {
          ...state,
          isDeleteIconOn: action.value ? action.value : !state.isDeleteIconOn,
          location: action.location,
        };
      case 'SET_GROUP_COLORS':
        return {
          ...state,
          groupColors: action.value,
        };
      default:
        throw new Error();
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};
