/* eslint-disable import/prefer-default-export */
import {
  GET_POKEMON_FILTER_LIST,
  GET_POKEMON_SEARCH_RESULT,
  LOAD_FILTER_DATA,
  SET_OFFSET_LIMIT
} from '../../actions/actionTypes/actionTypes';

const initialState = {
  offset: 0,
  limit: 10,
  perPage: 10,
  pokemonFilterList: [],
  pokemonSearchResult: [],
  isLoadFilterData: false
};

export const pokemonFilterListReducer = (
  state = initialState,
  { type, limit, offset, perPage, isLoadFilterData, pokemonFilterList, pokemonSearchResult }
) => {
  switch (type) {
    case GET_POKEMON_FILTER_LIST:
      return {
        ...state,
        pokemonFilterList
      };
    case GET_POKEMON_SEARCH_RESULT:
      return {
        ...state,
        pokemonSearchResult
      };
    case LOAD_FILTER_DATA:
      return {
        ...state,
        isLoadFilterData
      };
    case SET_OFFSET_LIMIT:
      return {
        ...state,
        offset,
        limit,
        perPage
      };
    default:
      return state;
  }
};
