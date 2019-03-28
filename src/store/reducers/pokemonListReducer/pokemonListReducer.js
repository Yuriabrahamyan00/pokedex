/* eslint-disable import/prefer-default-export */
import { GET_POKEMON_LIST } from '../../actions/actionTypes/actionTypes';

const initialState = {
  pokemonList: {}
};

export const pokemonListReducer = (state = initialState, { type, pokemonList }) => {
  switch (type) {
    case GET_POKEMON_LIST:
      return {
        ...state,
        pokemonList
      };
    default:
      return state;
  }
};
