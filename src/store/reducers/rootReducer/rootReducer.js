import { combineReducers } from 'redux';
import { pokemonListReducer } from '../pokemonListReducer/pokemonListReducer';
import { pokemonTypesReducer } from '../pokemonTypesReducer/pokemonTypesReducer';
import { pokemonDetailsReducer } from '../pokemonDetailsReducer/pokemonDetailsReducer';
import { pokemonFilterListReducer } from '../pokemonFilterListReducer/pokemonFilterListReducer';

export default combineReducers({
  pokemonListReducer,
  pokemonTypesReducer,
  pokemonDetailsReducer,
  pokemonFilterListReducer
});
