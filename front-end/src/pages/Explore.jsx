import React from "react";
import { connect } from 'react-redux'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FilterListIcon from '@mui/icons-material/FilterList';
import Select from '@mui/material/Select';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";

import { loadGigs, setSort, onSetFilterBy, clearFilters } from '../store/gig.action'
import { setHome, setExplore, setDetails, setBecomeSeller, setProfile } from '../store/scss.action.js';
import { GigList } from "../cmp/GigList";
import { Loader } from '../cmp/utils/Loader';
import img from '../assets/img/couldnt-found.jpg'


const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                select: {
                    padding: ('8px 15px'),
                    borderRadius: '0px',
                },
            },
        },
    },
});


class _Explore extends React.Component {

    state = {
        isBudgetOpen: false,
        min: "",
        max: "",
        isFilterModalOpen: false
    }

    componentDidMount() {
        if (!this.props.location.search) {
            this.props.loadGigs({})
        }
        else {
            this.getFilteredGigs()
        }
        this.onSetExplore()
        window.addEventListener('click', (ev) => {
            var budgetSelect = document.getElementsByClassName('budget-select')[0];
            var budgetFilter = document.getElementsByClassName('budget-content')[0];
            if (!((ev.target === budgetSelect || budgetSelect?.contains(ev.target)) || (ev.target === budgetFilter || budgetFilter?.contains(ev.target)))) {
                var { isBudgetOpen } = this.state;
                if (isBudgetOpen) isBudgetOpen = !isBudgetOpen;
                this.setState({ isBudgetOpen });
            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filterBy !== this.props.filterBy || prevProps.location.search !== this.props.location.search) {
            this.getFilteredGigs()
        }
    }

    componentWillUnmount() {
        this.props.clearFilters();
    }
    getFilteredGigs = () => {
        const { filterBy, sortBy } = this.props
        this.props.loadGigs(filterBy, sortBy)
    }

    toggleBudget = () => {
        var { isBudgetOpen } = this.state;
        isBudgetOpen = !isBudgetOpen;
        this.setState({ isBudgetOpen });
    }

    onSetExplore = () => {
        if (this.props.isExplore) return;
        this.props.setHome(false);
        this.props.setBecomeSeller(false);
        this.props.setDetails(false);
        this.props.setProfile(false);
        this.props.setExplore(true);
    }


    handleBudget = ({ target }) => {
        const field = target.name;
        const value = +target.value
        this.setState({ [field]: value })
    }
    onClearBudget = () => {
        this.setState((prevState) => ({ ...prevState, min: "", max: "" }))
    }

    onApplayBudget = () => {
        var { min, max } = this.state;
        if (!min) min = 0;
        if (!max) max = 100000000 //mongo has problems with Infinity!
        const price = {
            min,
            max
        }
        const { filterBy } = this.props
        filterBy.price = price;
        this.props.onSetFilterBy({ ['price']: price }, 'price');
        this.setState(prevState => ({ ...prevState, isBudgetOpen: false }))
    }

    handleChange = ({ target }) => {
        const { filterBy } = this.props
        const value = target.value
        this.props.setSort(value)
        this.props.loadGigs(filterBy, value)
    }
    handleFilter = ({ target }) => {
        const field = target.name
        const value = target.value
        this.props.onSetFilterBy({ [field]: value }, field)
    }

    onGoToDetails = (gigId) => {
        this.props.history.push(`/explore/${gigId}`)
    }

    onClearFilters = async () => {
        this.props.clearFilters();
        const { filterBy } = this.props
        await this.props.loadGigs(filterBy, {})
        this.setState({ min: "", max: "", isBudgetOpen: false })
    }
    render() {
        const { gigs, filterBy, sortBy } = this.props
        console.log(filterBy.category);
        const { isFilterModalOpen } = this.state;
        var filtersClass = (isFilterModalOpen) ? "open" : "close";
        if (!gigs) return <Loader />
        var budgetClass = (this.state.isBudgetOpen) ? "open" : "";
        return (
            <React.Fragment>
                {!gigs.length ?
                    <div className='no-gigs-modal'>
                        <div className='img-container'>
                            <img src={img} alt='img' />
                        </div>
                        <h2>No Services Found For Your Search</h2>
                        <button className='btn' onClick={this.onClearFilters}>Explore gigs</button>
                    </div>
                    :
                    <section className='explore'>
                        <div className={`main-screen ${filtersClass}`}></div>
                        <section className="explore-main  max-width-container equal-padding">
                            <h1 className="category-headline"> {filterBy.category === 'all' ? 'All Categories' : filterBy.category}</h1>
                            <div className={`filter-container ${filtersClass}`}>
                                <div className="select-wrapper filters">
                                    <FormControl sx={{ minWidth: 120, margin: 0 }}>
                                        <ThemeProvider theme={theme}>
                                            <div className={`filters-div flex`}>
                                                <Select
                                                    value={filterBy.deliveryTime}
                                                    name='deliveryTime'
                                                    onChange={this.handleFilter}
                                                    displayEmpty
                                                    className='delivery select'
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >
                                                    <MenuItem value=''>
                                                        <em>Delivery Time</em>
                                                    </MenuItem>
                                                    <MenuItem value={1}>Express 24H</MenuItem>
                                                    <MenuItem value={3}>Up to 3 days</MenuItem>
                                                    <MenuItem value={7}>Up to 7 days</MenuItem>
                                                </Select>
                                                <div className="budget-div">
                                                    <div onClick={() => this.toggleBudget()} className="budget-select">
                                                        <span className="text">Budget</span>  <span className={`arrow ${budgetClass}`}><ArrowDropDownIcon /></span>
                                                    </div>
                                                    <div className={`budget-content ${budgetClass}`}>
                                                        <div className="budget-filter">
                                                            <div className="price-filter flex">
                                                                <div className="input-wrapper flex column">
                                                                    <label htmlFor="min">Min:
                                                                    </label>
                                                                    <input type="text" name="min" onChange={this.handleBudget} placeholder="Any" value={this.state.min} />
                                                                </div>
                                                                <div className="input-wrapper flex column">
                                                                    <label htmlFor="max">Max.
                                                                    </label>
                                                                    <input type="text" name="max" onChange={this.handleBudget} placeholder="Any" value={this.state.max} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="budget-btns flex">
                                                            <button className="close-btn" onClick={this.onClearBudget}>clear</button>
                                                            <button className="btn" onClick={this.onApplayBudget}>Apply</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ThemeProvider>
                                    </FormControl>
                                    <div className="action-btns">
                                        <button className="clear-btn" onClick={() => this.onClearFilters()}>Clear Filters</button>
                                        <button className="btn applay-filters" onClick={() => this.setState({ isFilterModalOpen: false })}>Apply</button>
                                    </div>
                                </div>
                            </div>
                            <div className="responsive-btns">
                                <button onClick={() => { this.setState({ isFilterModalOpen: true }) }} className="btn-filter-modal"><FilterListIcon />Filters</button>
                                {/* <button className="btn-filter-modal"><FilterListIcon />Sort By</button> */}
                            </div>
                            <div className="inner-container">
                                <div className="services-count">{gigs.length} services available</div>
                                <div className="container">
                                    <span className='sort-label'>
                                        Sort by
                                    </span>
                                    <div className="select-wrapper">
                                        <FormControl className="sort-form" sx={{ minWidth: 120 }}>
                                            <Select
                                                value={sortBy}
                                                name='sortBy'
                                                className="sort-by-select"
                                                onChange={this.handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="best selling">
                                                    <em>Best Selling</em>
                                                </MenuItem>
                                                <MenuItem value={'title'}>Title</MenuItem>
                                                <MenuItem value={'price'}>Price</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            </div>
                            <GigList gigs={gigs} onGoToDetails={this.onGoToDetails} />
                            {isFilterModalOpen && <button onClick={() => this.setState({ isFilterModalOpen: false })} className="close-modal"><CloseIcon /></button>}
                        </section >
                    </section >}
            </React.Fragment>
        )
    }
}



function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user,
        isHome: state.scssModule.isHome,
        isExplore: state.scssModule.isExplore,
        filterBy: state.gigModule.filterBy,
        sortBy: state.gigModule.sortBy
    }
}

const mapDispatchToProps = {
    loadGigs,
    setExplore,
    setHome,
    setDetails,
    setBecomeSeller,
    setProfile,
    onSetFilterBy,
    setSort,
    clearFilters
};


export const Explore = connect(mapStateToProps, mapDispatchToProps)(_Explore)