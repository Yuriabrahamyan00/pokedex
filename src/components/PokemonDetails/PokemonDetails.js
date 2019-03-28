/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Image, Segment, Grid, Item, Card, Label, Statistic, Responsive } from 'semantic-ui-react';

import defaultSprite from '../../assets/images/defaultSprite.png';
import classes from './PokemonDetails.module.scss';

const pokemonDetails = ({
  pokemonDetails: {
    pokemon: { sprites, name, id, height, weight, abilities, types, stats },
    species
  }
}) => {
  const { back_default, back_shiny, front_default, front_shiny } = sprites;
  const descList = species
    ? species.flavor_text_entries.filter(({ language: { name } }) => name === 'en')
    : [];
  const h = parseFloat(height / 10);
  const w = parseFloat((weight / 10) * 2.205).toFixed(1);

  return (
    <Segment>
      <Grid relaxed columns={4} className={classes.relaxCols}>
        <Grid.Column>
          <Image src={back_default || defaultSprite} />
        </Grid.Column>

        <Grid.Column>
          <Image src={back_shiny || defaultSprite} />
        </Grid.Column>

        <Grid.Column>
          <Image src={front_default || defaultSprite} />
        </Grid.Column>

        <Grid.Column>
          <Image src={front_shiny || defaultSprite} />
        </Grid.Column>
      </Grid>
      <Item>
        <Grid className={classes.detailContainer}>
          <Responsive maxWidth={576} as={Fragment}>
            <Grid.Column width={6}>
              <Card className={classes.left_card}>
                <Item.Image
                  src={`http://pokestadium.com/img/sprites/main-series/xy/${name}.gif`}
                  className={classes.pokemon_sprite}
                />
              </Card>
            </Grid.Column>
          </Responsive>

          <Responsive minWidth={577} as={Fragment}>
            <Grid.Column width={3}>
              <Card className={classes.left_card}>
                <Item.Image
                  src={`http://pokestadium.com/img/sprites/main-series/xy/${name}.gif`}
                  className={classes.pokemon_sprite}
                />
              </Card>
            </Grid.Column>
          </Responsive>

          <Grid.Column width={13}>
            <Item.Content>
              <Item.Header as="h2" className={classes.pokemon_name}>
                {' '}
                #{id} {name}
              </Item.Header>
              <Item.Meta as="b">{species ? 'Description' : ''}</Item.Meta>

              <Item.Description>
                {descList.map(({ flavor_text }, i) => i < 1 && flavor_text)}
              </Item.Description>

              <Item.Extra as="h4" className={classes.extra_detail}>
                <Label as="a" ribbon>
                  Height
                </Label>
                <Label>{h} m</Label>
              </Item.Extra>

              <Item.Extra as="h4" className={classes.extra_detail}>
                <Label as="a" ribbon>
                  Weight
                </Label>
                <Label>{w} lbs</Label>
              </Item.Extra>

              <Item.Extra as="h4" className={classes.extra_detail}>
                <Label as="a" color="blue" ribbon>
                  Abilities
                </Label>
                {abilities.map(({ ability: { name } }) => (
                  <Label key={name} color="blue">
                    {name}
                  </Label>
                ))}
              </Item.Extra>

              <Item.Extra as="h4" className={classes.extra_detail}>
                <Label as="a" color="green" ribbon>
                  Types
                </Label>
                {types.map(({ type: { name } }) => (
                  <Label key={name} color="green">
                    {name}
                  </Label>
                ))}
              </Item.Extra>

              <Grid className={classes.stat_grid}>
                {stats.map(({ base_stat, stat: { name } }) => (
                  <Fragment key={name}>
                    <Responsive maxWidth={944}>
                      <Statistic color="violet" size="tiny">
                        <Statistic.Value>{base_stat}</Statistic.Value>
                        <Statistic.Label>{name}</Statistic.Label>
                      </Statistic>
                    </Responsive>
                    <Responsive minWidth={943}>
                      <Statistic color="violet">
                        <Statistic.Value>{base_stat}</Statistic.Value>
                        <Statistic.Label>{name}</Statistic.Label>
                      </Statistic>
                    </Responsive>
                  </Fragment>
                ))}
              </Grid>
            </Item.Content>
          </Grid.Column>
        </Grid>
      </Item>
    </Segment>
  );
};

pokemonDetails.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  pokemonDetails: PropTypes.object.isRequired
};

export default pokemonDetails;
