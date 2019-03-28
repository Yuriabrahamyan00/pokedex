/* eslint-disable import/prefer-default-export */
import { GET_POKEMON_TYPES } from '../../actions/actionTypes/actionTypes';

const initialState = {
  pokemonTypes: []
};

export const pokemonTypesReducer = (state = initialState, { type, pokemonTypes }) => {
  switch (type) {
    case GET_POKEMON_TYPES:
      return {
        ...state,
        pokemonTypes
      };
    default:
      return state;
  }
};
