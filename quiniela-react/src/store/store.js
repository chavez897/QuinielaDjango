import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/userReducer";
import { tokensReducer } from "../reducers/tokensReducer";
import { myLeagueReducer } from "../reducers/myLeaguesReducer";
import { leaguesReducer } from "../reducers/leaguesReducer";
import { selectedLeagueReducer } from "../reducers/selectedLeagueReducer";
import { predictionsReducer } from "../reducers/predictionsReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  user: userReducer,
  tokens: tokensReducer,
  myLeagues: myLeagueReducer,
  leagues: leaguesReducer,
  selectedLeague: selectedLeagueReducer,
  predictions: predictionsReducer,
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
