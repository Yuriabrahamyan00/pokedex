/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import {
  getPokemonByType,
  sendPokemonSearchList
} from '../../store/actions/pokemonFilterListActions/pokemonFilterListActions';
import { getPokemonList } from '../../store/actions/pokemonListActions/pokemonListActions';
import { capitalizeHandler } from '../../utils/capitalizeHandler';

class FilterBox extends PureComponent {
  state = {
    typeValue: 'all'
  };

  componentDidUpdate(prevProps) {
    if (prevProps.type !== null) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ typeValue: 'all' });
    }
  }

  selectTypeHandler = (event, { value }) => {
    const {
      getPokemonList,
      getPokemonByType,
      sendPokemonSearchList,
      pokemonFilterList: { limit, perPage },
      handleSidebarHide
    } = this.props;

    sendPokemonSearchList([]);
    handleSidebarHide();
    this.setState({ typeValue: value });
    value !== 'all' ? getPokemonByType(value) : getPokemonList(0, limit, perPage);
  };

  generateOptionsHandler = pokemonTypes =>
    pokemonTypes.map(({ name }) => {
      return {
        key: name,
        value: name,
        text: capitalizeHandler(name)
      };
    });

  render() {
    const { disabled, pokemonTypes } = this.props;
    const { typeValue } = this.state;
    let options = [];

    if (pokemonTypes.length) {
      options = this.generateOptionsHandler(pokemonTypes);
      options.unshift({
        key: 'all',
        value: 'all',
        text: 'All Types'
      });
    }

    return (
      <Dropdown
        placeholder="Select type"
        search
        selection
        options={options}
        value={typeValue}
        disabled={disabled}
        onChange={this.selectTypeHandler}
      />
    );
  }
}

FilterBox.propTypes = {
  pokemonTypes: PropTypes.array,
  disabled: PropTypes.bool,
  getPokemonList: PropTypes.func,
  getPokemonByType: PropTypes.func,
  sendPokemonSearchList: PropTypes.func,
  handleSidebarHide: PropTypes.func,
  pokemonFilterList: PropTypes.object,
  pokemonList: PropTypes.object,
  type: PropTypes.string
};

const mapStateToProps = ({
  pokemonTypesReducer: { pokemonTypes },
  pokemonFilterListReducer: pokemonFilterList
}) => {
  return {
    pokemonTypes,
    pokemonFilterList
  };
};

export default connect(
  mapStateToProps,
  {
    getPokemonByType,
    getPokemonList,
    sendPokemonSearchList
  }
)(FilterBox);
