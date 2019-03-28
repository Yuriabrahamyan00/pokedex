/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import PokemonCardList from './PokemonCardList';

test('should success get pokemon list', () => {
  const component = renderer.create(<PokemonCardList />);
});
