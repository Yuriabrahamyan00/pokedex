import API from '../../../api/api';
import { GET_POKEMON_LIST } from '../actionTypes/actionTypes';
import {
  sendFilterDataLoadStatus,
  sendPokemonFilterList
} from '../pokemonFilterListActions/pokemonFilterListActions';

/**
 * SEND POKEMON LIST TO STORE
 * @param {Object} pokemonList
 */
export const sendPokemonList = pokemonList => {
  return {
    type: GET_POKEMON_LIST,
    pokemonList
  };
};

/**
 * ASYNC ACTION THAT GET CURRENT POKEMON BY ID PARAM
 * @param {Number} offset
 * @param {Number} limit
 */
export const getPokemonList = (offset, limit) => {
  return async dispatch => {
    try {
      const { data: results } = await API.get(`pokemon/?offset=${offset}&limit=${limit}`);
      dispatch(sendPokemonList(results));
      dispatch(sendFilterDataLoadStatus(false));
      dispatch(sendPokemonFilterList({}));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
};
