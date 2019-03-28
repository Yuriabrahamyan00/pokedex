import API from '../../../api/api';
import { CLEAR_POKEMON_DETAILS, GET_POKEMON_DETAILS } from '../actionTypes/actionTypes';

/**
 * SEND SELECTED POKEMON TO STORE
 * @param {Object} pokemon
 * @param {Object} species
 */
export const sendSelectedPokemonDetails = ({ pokemon, species }) => {
  return {
    type: GET_POKEMON_DETAILS,
    pokemon,
    species
  };
};

/** **********CLEAR SELECTED POKEMON FROM STORE********** */
export const clearSelectedPokemon = () => {
  return {
    type: CLEAR_POKEMON_DETAILS
  };
};

/**
 * ASYNC ACTION THAT GET CURRENT POKEMON BY ID PARAM
 * @param {String} id
 */
export const getPokemonDetails = id => {
  return async dispatch => {
    try {
      const { data: pokemon } = await API.get(`pokemon/${id}`);
      dispatch(sendSelectedPokemonDetails({ pokemon }));

      const { data: species } = await API.get(`pokemon-species/${id}`);
      dispatch(sendSelectedPokemonDetails({ species }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
};
