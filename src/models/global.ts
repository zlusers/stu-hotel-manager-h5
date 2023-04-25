
import React from 'react';


export interface GlobalState {
  isAppLoaded: boolean;
  AllPayWay:{id: Number,payWay: string}[]|null
}
export interface Action {
  type: string;
  payload?: any;
}
export const defaultState: GlobalState = {
  isAppLoaded: false,
  AllPayWay:null
};
export const reducer: React.Reducer<GlobalState, Action> = (state, action) => {
  switch (action.type) {
    case 'APP_LOADED': {
      return {
        ...state,
        isAppLoaded: true,
      };
    }
    case 'ALL_PAY_WARY': {
      return {
        ...state,
        AllPayWay: action.payload,
      };
    }
    default:
      return state;
  }
};

export const Context = React.createContext<{
  state: GlobalState;
  dispatch: React.Dispatch<Action>;
}>({ state: defaultState, dispatch: () => {} });

export function useContextValueGlobalState() {
  const [globalState, dispatch] = React.useReducer(reducer, defaultState);
  const contextValue = React.useMemo(
    () => ({ state: globalState, dispatch }),
    [globalState]
  );
  return contextValue;
}

export function useGlobalState(): [GlobalState, React.Dispatch<Action>] {
  const { state, dispatch } = React.useContext(Context);
  return [state, dispatch];
}
