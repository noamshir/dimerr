import { gigService } from "../services/gig.service.js";




export function loadGigs(filterBy, sortBy = '') {
    return async (dispatch) => {
        try {
            const gigs = await gigService.query({ ...filterBy, sortBy })
            const action = { type: 'SET_GIGS', gigs };
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function add(gig) {
    return async (dispatch) => {
        try {
            const savedGig = await gigService.save(gig)
            let action
            if (gig._id) action = { type: 'UPDATE_GIG', gig: savedGig };
            else action = { type: 'ADD_GIG', gig: savedGig }
            dispatch(action)
            return savedGig
        } catch (err) {
            console.log('err', err)
        }
    }
}
export function onSetFilterBy(filterBy, field) {
    return (dispatch) => {
        try {
            const action = { type: 'SET_FILTERBY_FIELD', field, value: filterBy[field] }
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function clearFilters() {
    return (dispatch) => {
        try {
            const action = { type: 'CLEAR_FILTERBY' }
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function setSort(value) {
    return (dispatch) => {
        try {
            const action = { type: 'SET_SORT', value }
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function remove(gigId) {
    return async (dispatch) => {
        try {
            await gigService.remove(gigId)
            const action = { type: 'REMOVE_GIG', gigId }
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function setLikedGig(gig, user) {
    return async (dispatch) => {
        try {
            const savedGig = await gigService.toggleLike(gig._id, user)
            dispatch({ type: 'UPDATE_GIG', gig: savedGig })
        } catch (err){
            console.log('err', err)
        }
    }
}
