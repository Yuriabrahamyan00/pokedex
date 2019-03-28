import API from '../../../api/api';
import { GET_POKEMON_TYPES } from '../actionTypes/actionTypes';

/**
 * SEND POKEMON TYPES TO STORE
 * @param {Array} pokemonTypes
 */
export const sendPokemonTypes = pokemonTypes => {
  return {
    type: GET_POKEMON_TYPES,
    pokemonTypes
  };
};

/** **********ASYNC ACTION THAT GET POKEMON TYPES*********** */
export const getPokemonTypes = () => {
  return async dispatch => {
    try {
      const {
        data: { results }
      } = await API.get('type/');
      dispatch(sendPokemonTypes(results));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };
};
