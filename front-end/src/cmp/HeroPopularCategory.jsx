import { connect } from 'react-redux'
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { gigService } from '../services/gig.service'
import { onSetFilterBy, loadGigs } from '../store/gig.action';


function _HeroPopularCategory(props) {
    const [popularCategories, setCategories] = useState([]);
    useEffect(async () => {
        var ans = await getCategories();
        setCategories(ans);
        return () => {
        }
    }, [])
    const getCategories = async () => {
        return await gigService.getPopularCategories(4);
    }

    const onSetFilter = (category) => {
        props.loadGigs({ category })
        props.onSetFilterBy({ category }, 'category')
        props.history.push(`/explore?category=${category}`)
    }
    return (
        <ul className="clean-list hero-popular-category">
            Popular:
            {popularCategories.map((category, idx) => {
                return (
                    <li key={idx}>
                        <button className="btn-popular-category" onClick={() => {
                            onSetFilter(category)
                        }}>{category}</button>
                    </li>
                )
            })}
        </ul>
    )
}

function mapStateToProps(state) {
    return {
    }
}

const mapDispatchToProps = {
    loadGigs,
    onSetFilterBy
}

const _HeroPopularCategoryWithRouter = withRouter(_HeroPopularCategory);
export const HeroPopularCategory = connect(mapStateToProps, mapDispatchToProps)(_HeroPopularCategoryWithRouter)