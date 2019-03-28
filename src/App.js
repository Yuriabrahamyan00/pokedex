/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { paths } from './constants/paths/paths';

import NotFound from './components/NotFound/NotFound';
import Navigation from './containers/Navigation/Navigation';
import SinglePokemon from './containers/SinglePokemon/SinglePokemon';
import PokemonCardList from './containers/PokemonCardList/PokemonCardList';

const app = () => (
  <>
    <Navigation />
    <Switch>
      <Route exact path={paths.home} component={PokemonCardList} />
      <Route exact path={paths.pokemon} component={SinglePokemon} />
      <Route component={NotFound} />
    </Switch>
  </>
);

export default app;
