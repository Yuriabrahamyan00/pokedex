/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-shadow */
import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Menu, Header, Image, Responsive, Icon, Sidebar } from 'semantic-ui-react';
import { paths } from '../../constants/paths/paths';
import { paginatorHandler } from '../../utils/paginatorHandler';
import { getPokemonTypes } from '../../store/actions/pokemonTypesActions/pokemonTypesActions';
import { setOffsetLimit } from '../../store/actions/pokemonFilterListActions/pokemonFilterListActions';

import SearchBox from '../SearchBox/SearchBox';
import FilterBox from '../FilterBox/FilterBox';

import logo from '../../assets/images/logo.png';

class Navigation extends PureComponent {
  state = {
    isLoading: false,
    isSideDrawer: false,
    filterPaginateData: {},
    type: null,
    searchVal: null
  };

  static getDerivedStateFromProps(nextProps, state) {
    const {
      pokemonFilterList: { pokemonFilterList, perPage, isLoadFilterData }
    } = nextProps;

    if (
      pokemonFilterList !== state.filterList &&
      Array.isArray(pokemonFilterList) &&
      isLoadFilterData !== true
    ) {
      const filterList = pokemonFilterList.map(({ pokemon: { name, url } }) => ({ name, url }));
      const filterPaginateData = paginatorHandler(filterList, 1, perPage);

      return {
        filterPaginateData
      };
    }
    return {};
  }

  componentDidMount() {
    const {
      getPokemonTypes,
      history: { location }
    } = this.props;

    getPokemonTypes();
    location.pathname !== paths.home && this.setState({ disabled: true });
  }

  componentDidUpdate(prevProps) {
    const {
      match,
      history: { location },
      setOffsetLimit
    } = this.props;

    const isHomePath = location.pathname !== paths.home;
    const isMatchUpdate = prevProps.match !== match;

    if (isMatchUpdate && isHomePath) {
      this.setState({ disabled: true, type: 'all', searchVal: '' });
      setOffsetLimit(0, 10, 10);
    } else if (isMatchUpdate && !isHomePath) {
      this.setState({ disabled: false, type: null, searchVal: null });
    }
  }

  handleSidebarOpen = () => this.setState({ isSideDrawer: true });

  handleSidebarHide = () => this.setState({ isSideDrawer: false });

  render() {
    const { history, pokemonList } = this.props;
    const { disabled, isLoading, filterPaginateData, isSideDrawer, type, searchVal } = this.state;

    const searchFilterBoxes = (
      <>
        <Menu.Item>
          <SearchBox
            searchVal={searchVal}
            disabled={disabled}
            isLoading={isLoading}
            pokemonList={pokemonList}
            filterPaginateData={filterPaginateData}
            handleSidebarHide={this.handleSidebarHide}
          />
        </Menu.Item>

        <Menu.Item>
          <FilterBox type={type} disabled={disabled} handleSidebarHide={this.handleSidebarHide} />
        </Menu.Item>
      </>
    );

    return (
      <Header as="header">
        <Menu>
          <Menu.Item link onClick={() => history.push(paths.home)}>
            <Image src={logo} size="mini" alt="logo" />
          </Menu.Item>

          <Responsive as={Fragment} minWidth={667}>
            <Menu.Item
              name="home"
              active={history.location.pathname === paths.home}
              onClick={() => history.push(paths.home)}
            />

            <Menu.Menu position="right">{searchFilterBoxes}</Menu.Menu>
          </Responsive>

          <Responsive as={Fragment} maxWidth={668}>
            <Menu.Menu position="right">
              <Menu.Item onClick={this.handleSidebarOpen}>
                <Icon name="sidebar" />
              </Menu.Item>
            </Menu.Menu>
          </Responsive>

          <Sidebar
            vertical
            as={Menu}
            icon="labeled"
            animation="overlay"
            visible={isSideDrawer}
            onHide={this.handleSidebarHide}
          >
            {searchFilterBoxes}
          </Sidebar>
        </Menu>
      </Header>
    );
  }
}

Navigation.propTypes = {
  getPokemonTypes: PropTypes.func,
  setOffsetLimit: PropTypes.func,
  pokemonFilterList: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
  pokemonList: PropTypes.object
};

const mapStateToProps = ({
  pokemonFilterListReducer: pokemonFilterList,
  pokemonListReducer: { pokemonList }
}) => {
  return {
    pokemonList,
    pokemonFilterList
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    {
      getPokemonTypes,
      setOffsetLimit
    }
  )(Navigation)
);
