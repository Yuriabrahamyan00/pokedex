/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import {
  clearSelectedPokemon,
  getPokemonDetails
} from '../../store/actions/pokemonDetailsActions/pokemonDetailsActions';

import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';

class SinglePokemon extends PureComponent {
  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      getPokemonDetails
    } = this.props;
    getPokemonDetails(id);
  }

  componentWillUnmount() {
    const { clearSelectedPokemon } = this.props;
    clearSelectedPokemon();
  }

  renderSpinner = () => <Loader active inline="centered" />;

  renderDetails = pokemonDetails => <PokemonDetails pokemonDetails={pokemonDetails} />;

  render() {
    const { pokemonDetails } = this.props;

    return Object.keys(pokemonDetails).length
      ? this.renderDetails(pokemonDetails)
      : this.renderSpinner();
  }
}

SinglePokemon.propTypes = {
  getPokemonDetails: PropTypes.func,
  clearSelectedPokemon: PropTypes.func,
  match: PropTypes.object,
  pokemonDetails: PropTypes.object
};

const mapStateToProps = ({ pokemonDetailsReducer: pokemonDetails }) => {
  return {
    pokemonDetails
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getPokemonDetails,
      clearSelectedPokemon
    }
  )(SinglePokemon)
);
