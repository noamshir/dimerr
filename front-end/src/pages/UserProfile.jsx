import React, { useState, useEffect } from 'react'
// import Select from 'react-select'
import { connect } from 'react-redux'
import { userService } from '../services/user.service';
import { gigService } from '../services/gig.service';
// import { saveSellerInfo } from '../store/user.action'
import { UserInfoCard } from '../cmp/profile/UserInfoCard'

import { GigList } from '../cmp/GigList'
import { withRouter } from 'react-router-dom';
import { setHome, setExplore, setDetails, setProfile } from '../store/scss.action.js';
import { Loader } from '../cmp/utils/Loader';

// import { initialService } from '../initials/initial.service';

function _UserProfile(props) {
    const { setHome, setExplore, setDetails, setProfile, match, loggedInUser } = props
    const [gigs, setGigs] = useState([]);
    const [user, setUser] = useState(null);
    useEffect(async () => {
        setExplore(false);
        setHome(false);
        setDetails(false)
        setProfile(true);
        onSetGigs(await onSetUser());
    }, [])

    useEffect(async () => {
        if (!user) return;
        if (user._id !== props.match.params.userId) onSetGigs(await onSetUser());
    }, [props.match.params.userId])

    async function onSetUser() {
        const userToSet = await userService.getById(match.params.userId)
        setUser(userToSet);
        return userToSet;
    }
    async function onSetGigs(user) {
        const gigs = await gigService.query({ userId: user._id })
        setGigs(gigs);
    }
    if (!user) return <Loader></Loader>
    return (
        <div className="profile-main-container max-width-container equal-padding">
            <UserInfoCard user={user} />
            {user.sellerInfo && <GigList gigs={gigs} />}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        loggedInUser: state.userModule.user,
    }
}



const mapDispatchToProps = {
    setDetails,
    setExplore,
    setHome,
    setProfile,
};

const _UserProfileWithRouter = withRouter(_UserProfile);
export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(_UserProfileWithRouter)