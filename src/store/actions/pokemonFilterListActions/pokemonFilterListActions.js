import API from '../../../api/api';
import {
  GET_POKEMON_FILTER_LIST,
  GET_POKEMON_SEARCH_RESULT,
  LOAD_FILTER_DATA,
  SET_OFFSET_LIMIT
} from '../actionTypes/actionTypes';

/**
 * SEND POKEMON FILTER LIST TO STORE
 * @param {Array} pokemonFilterList
 */
export const sendPokemonFilterList = pokemonFilterList => {
  return {
    type: GET_POKEMON_FILTER_LIST,
    pokemonFilterList
  };
};

/**
 * SEND POKEMON SEARCH RESULT TO STORE
 * @param {Array} pokemonSearchResult
 */
export const sendPokemonSearchList = pokemonSearchResult => {
  return {
    type: GET_POKEMON_SEARCH_RESULT,
    pokemonSearchResult
  };
};

/**
 * SEND FILTER DATA LOAD STATUS
 * @param {Boolean} isLoadFilterData
 */
export const sendFilterDataLoadStatus = isLoadFilterData => {
  return {
    type: LOAD_FILTER_DATA,
    isLoadFilterData
  };
};

/**
 * SET OFFSET, LIMIT, PER PAGE
 * @param {Number} offset
 * @param {Number} limit
 * @param {Number} perPage
 */
export const setOffsetLimit = (offset, limit, perPage) => {
  return {
    type: SET_OFFSET_LIMIT,
    offset,
    limit,
    perPage
  };
};

/**
 * ASYNC ACTION THAT GET POKEMON BY TYPE
 * @param {String} name
 */
export const getPokemonByType = name => {
  return async dispatch => {
    try {
      dispatch(sendFilterDataLoadStatus(false));
      const {
        data: { pokemon }
      } = await API.get(`type/${name}/`);
      dispatch(sendPokemonFilterList(pokemon));
      dispatch(sendFilterDataLoadStatus(true));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
};
