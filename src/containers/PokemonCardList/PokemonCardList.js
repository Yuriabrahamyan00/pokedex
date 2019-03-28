/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Dropdown, Icon, Loader, Pagination, Message, Divider } from 'semantic-ui-react';
import { paginatorHandler } from '../../utils/paginatorHandler';
import { getPokemonList } from '../../store/actions/pokemonListActions/pokemonListActions';
import { setOffsetLimit } from '../../store/actions/pokemonFilterListActions/pokemonFilterListActions';

import PokemonCard from '../../components/PokemonCard/PokemonCard';

import classes from './PokemonCardList.module.scss';

class PokemonCardList extends PureComponent {
  state = {
    activePage: 1,
    filterList: [],
    pokemonSearchResult: {},
    filterPaginateData: {}
  };

  static getDerivedStateFromProps(nextProps, state) {
    const {
      pokemonFilterList: { pokemonFilterList, perPage, isLoadFilterData, pokemonSearchResult }
    } = nextProps;

    if (
      pokemonFilterList !== state.filterList &&
      Array.isArray(pokemonFilterList) &&
      isLoadFilterData !== true
    ) {
      const filterList = pokemonFilterList.map(({ pokemon: { name, url } }) => ({ name, url }));
      const filterPaginateData = paginatorHandler(filterList, 1, perPage);

      return {
        filterPaginateData,
        filterList,
        activePage: 1
      };
    }
    if (pokemonSearchResult !== state.pokemonSearchResult) {
      return {
        pokemonSearchResult: {
          count: pokemonSearchResult.length,
          results: pokemonSearchResult
        }
      };
    }
    return {};
  }

  componentDidMount() {
    const {
      getPokemonList,
      pokemonFilterList: { offset, limit, perPage }
    } = this.props;
    getPokemonList(offset, limit, perPage);
  }

  getPokemonId = url => url.substring(34).replace(/\//g, '');

  renderSpinner = () => <Loader active inline="centered" />;

  generatePerOptions = () => [
    { key: 1, text: 'Per 10', value: 10 },
    { key: 2, text: 'Per 20', value: 20 },
    { key: 3, text: 'Per 50', value: 50 }
  ];

  renderPokemonCards = pokemonList =>
    pokemonList.map(({ name, url }) => {
      const id = this.getPokemonId(url);
      return <PokemonCard key={id} name={name} id={id} />;
    });

  renderWarningMessage = () => (
    <Message warning>
      <Message.Header>There are not such pokemons in this type!</Message.Header>
      <p>Please select other type.</p>
    </Message>
  );

  generateRendList = () => {
    const { filterPaginateData, pokemonSearchResult } = this.state;
    const {
      pokemonFilterList: { isLoadFilterData },
      pokemonList
    } = this.props;
    const pokeFilterList = isLoadFilterData ? filterPaginateData : pokemonList;

    return Object.keys(pokemonSearchResult).length
      ? !pokemonSearchResult.results.length
        ? pokeFilterList
        : pokemonSearchResult
      : pokeFilterList;
  };

  perPageHandler = (event, { value: limit }, pokemonList) => {
    const {
      getPokemonList,
      setOffsetLimit,
      pokemonFilterList: { isLoadFilterData, pokemonFilterList }
    } = this.props;
    const { activePage } = this.state;
    // eslint-disable-next-line no-unused-vars
    const [{ url }] = pokemonList.filter(({ url }, index) => index === 0);
    const firstPokemonID = this.getPokemonId(url);
    const offset = firstPokemonID - 1;
    const filterList =
      Array.isArray(pokemonFilterList) &&
      pokemonFilterList.map(({ pokemon: { name, url } }) => ({ name, url }));
    const filterPaginateData =
      Array.isArray(pokemonFilterList) && paginatorHandler(filterList, activePage, limit);

    setOffsetLimit(offset, limit, limit);
    !isLoadFilterData && getPokemonList(offset, limit);
    isLoadFilterData && this.setState({ filterPaginateData });
  };

  changePageHandler = (event, { activePage }) => {
    const {
      getPokemonList,
      pokemonFilterList: { isLoadFilterData, perPage, limit }
    } = this.props;
    const { filterList } = this.state;
    const offset = (activePage - 1) * limit;
    const filterPaginateData = paginatorHandler(filterList, activePage, perPage);

    this.setState({ activePage });
    isLoadFilterData
      ? this.setState({ filterPaginateData })
      : getPokemonList(offset, limit, perPage);
    event.persist();
  };

  render() {
    const {
      pokemonFilterList: { limit, perPage, isLoadFilterData, pokemonFilterList }
    } = this.props;
    const { activePage } = this.state;
    const list = this.generateRendList();
    const perPageOptions = this.generatePerOptions();
    const warningMessage = this.renderWarningMessage();

    return (
      <Divider as="div" hidden className={classes.pokemon_card_list_container}>
        <Divider as="div" hidden className={classes.pokemon_card_list_wrapper}>
          {Object.keys(list).length && list.results.length ? (
            <>
              <Dropdown
                defaultValue={perPage}
                options={perPageOptions}
                onChange={(event, data) => this.perPageHandler(event, data, list.results)}
                className={classes.per_page_dropdown}
                simple
                item
              />
              <Card.Group itemsPerRow={4} centered className={classes.cardContainer}>
                {this.renderPokemonCards(list.results)}
              </Card.Group>
              <Pagination
                boundaryRange={0}
                activePage={activePage}
                onPageChange={this.changePageHandler}
                className={classes.paginationContainer}
                totalPages={Math.ceil(list.count / limit)}
                prevItem={{
                  content: <Icon name="angle left" className={classes.prevItem} />,
                  icon: true
                }}
                nextItem={{
                  content: <Icon name="angle right" className={classes.nextItem} />,
                  icon: true
                }}
                firstItem={{
                  content: <Icon name="angle double left" />,
                  icon: true
                }}
                lastItem={{
                  content: <Icon name="angle double right" />,
                  icon: true
                }}
                ellipsisItem={{
                  content: <Icon name="ellipsis horizontal" />,
                  icon: true
                }}
              />
            </>
          ) : isLoadFilterData && !pokemonFilterList.length ? (
            warningMessage
          ) : (
            this.renderSpinner()
          )}
        </Divider>
      </Divider>
    );
  }
}

PokemonCardList.propTypes = {
  getPokemonList: PropTypes.func,
  setOffsetLimit: PropTypes.func,
  pokemonFilterList: PropTypes.object,
  filterPaginateData: PropTypes.object,
  pokemonList: PropTypes.object
};

const mapStateToProps = ({
  pokemonListReducer: { pokemonList },
  pokemonFilterListReducer: pokemonFilterList
}) => {
  return {
    pokemonList,
    pokemonFilterList
  };
};

export default connect(
  mapStateToProps,
  {
    getPokemonList,
    setOffsetLimit
  }
)(PokemonCardList);
