/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Search, Icon, Label } from 'semantic-ui-react';
import { sendPokemonSearchList } from '../../store/actions/pokemonFilterListActions/pokemonFilterListActions';

class SearchBox extends PureComponent {
  state = {
    value: ''
  };

  componentDidUpdate(prevProps) {
    const { sendPokemonSearchList } = this.props;

    if (prevProps.searchVal !== null) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ value: '' });
      sendPokemonSearchList([]);
    }
  }

  filterResult = query => {
    const {
      pokemonFilterList: { isLoadFilterData },
      sendPokemonSearchList,
      filterPaginateData,
      handleSidebarHide,
      pokemonList
    } = this.props;

    const correctList = isLoadFilterData ? filterPaginateData : pokemonList;
    const list =
      Object.keys(correctList).length && correctList.results.length ? correctList.results : [];

    const re = new RegExp(_.escapeRegExp(query), 'i');
    const isMatch = result => re.test(result.name);

    const searchResult = _.filter(list, isMatch);

    sendPokemonSearchList(searchResult);
    handleSidebarHide();
  };

  searchChangeHandler = (event, { value }) => {
    const { value: query } = this.state;

    const {
      pokemonFilterList: { isLoadFilterData },
      filterPaginateData,
      pokemonList
    } = this.props;

    const correctList = isLoadFilterData ? filterPaginateData : pokemonList;
    const list =
      Object.keys(correctList).length && correctList.results.length ? correctList.results : [];
    // eslint-disable-next-line no-return-assign
    // eslint-disable-next-line no-param-reassign
    list.length && list.map(pokemon => (pokemon.title = pokemon.name));

    this.setState({
      isLoading: true,
      value
    });

    setTimeout(() => {
      const re = new RegExp(_.escapeRegExp(query), 'i');
      const isMatch = result => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(list, isMatch)
      });
    }, 300);
  };

  searchHandler = () => {
    const { handleSidebarHide, sendPokemonSearchList } = this.props;
    const { value } = this.state;

    handleSidebarHide();
    value.length ? this.filterResult(value) : sendPokemonSearchList([]);
  };

  onSelectionChange = ({ which, keyCode }) => {
    const { value } = this.state;

    (which === 13 || keyCode === 13) && value.length && this.filterResult(value);
  };

  handleResultSelect = (e, { result: { title: value } }) => {
    this.setState({ value });
    this.filterResult(value);
  };

  resultRenderer = ({ title }) => <Label content={title} />;

  render() {
    const { value, results } = this.state;
    const { disabled, isLoading } = this.props;

    return (
      <Search
        placeholder="Search..."
        value={value}
        results={results}
        disabled={disabled}
        loading={isLoading}
        icon={<Icon name="search" onClick={this.searchHandler} link />}
        resultRenderer={this.resultRenderer}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.searchChangeHandler}
        onKeyPress={this.onSelectionChange}
      />
    );
  }
}

SearchBox.propTypes = {
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  sendPokemonSearchList: PropTypes.func,
  handleSidebarHide: PropTypes.func,
  pokemonFilterList: PropTypes.object,
  filterPaginateData: PropTypes.object,
  pokemonList: PropTypes.object,
  searchVal: PropTypes.string
};

const mapStateToProps = ({ pokemonFilterListReducer: pokemonFilterList }) => {
  return {
    pokemonFilterList
  };
};

export default connect(
  mapStateToProps,
  { sendPokemonSearchList }
)(SearchBox);
