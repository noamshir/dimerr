import { connect } from 'react-redux'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { withRouter } from 'react-router-dom';

import { onSetFilterBy } from '../store/gig.action'

function _SearchBar(props) {
    const [txt, setTxt] = useState('');

    const handleChange = ({ target }) => {
        const { value } = target
        setTxt(value);
    }
    const onSubmit = (ev) => {
        ev.preventDefault();
        props.onSetFilterBy({ title: txt }, 'title');
        props.history.push(`/explore?title=${txt}`)
    }

    return (
        <React.Fragment>
            <form
                onSubmit={onSubmit}>
                <div className='search-icon'><SearchIcon /></div>
                <input
                    className='search-bar'
                    type="search"
                    placeholder={props.placeholder}
                    autoComplete='off'
                    value={txt}
                    name='txt'
                    onChange={handleChange}
                />
                <button className='btn search-btn display-for-header'>Search</button>
            </form>
        </React.Fragment>
    )
}

function mapStateToProps(state) {
    return {
        
    }
}

const mapDispatchToProps = {
    onSetFilterBy
}

const _SearchBarWithRoute = withRouter(_SearchBar)
export const SearchBar = connect(mapStateToProps, mapDispatchToProps)(_SearchBarWithRoute)
