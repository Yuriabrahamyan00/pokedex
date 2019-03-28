/* eslint-disable import/prefer-default-export */
import { CLEAR_POKEMON_DETAILS, GET_POKEMON_DETAILS } from '../../actions/actionTypes/actionTypes';

export const pokemonDetailsReducer = (state = {}, { pokemon, species, type }) => {
  switch (type) {
    case GET_POKEMON_DETAILS:
      return {
        ...state,
        pokemon: pokemon || state.pokemon,
        species: species || state.species
      };

    case CLEAR_POKEMON_DETAILS:
      return {};

    default:
      return state;
  }
};
