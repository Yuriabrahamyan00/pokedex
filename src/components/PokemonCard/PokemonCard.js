/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Image, Divider } from 'semantic-ui-react';

import noGifSrc from '../../assets/images/noSprite.gif';
import classes from './PokemonCard.module.scss';

const pokemonCard = ({ name, id }) => (
  <Link to={`pokemon/${id}`} className={classes.single_pokemon_link}>
    <Card>
      <Divider as="div" hidden fitted className={classes.pokemon_sprite_container}>
        <Image
          src={`http://pokestadium.com/img/sprites/main-series/xy/${name}.gif`}
          onError={({ target }) => {
            // eslint-disable-next-line no-param-reassign
            target.src = noGifSrc;
            target.classList.add(classes.noSpriteGif);
          }}
        />
      </Divider>
      <Card.Content>
        <Card.Header>{name}</Card.Header>
      </Card.Content>
      <Card.Content extra>#{id}</Card.Content>
    </Card>
  </Link>
);

pokemonCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default pokemonCard;
