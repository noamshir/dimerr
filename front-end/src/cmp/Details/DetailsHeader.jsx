import React from 'react'
import { UserStarRate } from './UserStarRate'
import { UserProfileImg } from '../profile/UserProfileImg'


export function DetailsHeader({ gig, getUserLevel, owner }) {

    return (
        <div className='details-header inpage-nav' id='Overview'>
            <h1 className="gig-title">{gig.title}</h1>
            <div className="owner-info">
                <UserProfileImg user={owner} isLink={true} />
                <h5 className='owner-name'>{gig.owner.fullname}</h5>
                <h5 className='owner-level'>{getUserLevel()}</h5>
                <span className='spacer'>|</span>
                <UserStarRate gig={gig} owner={owner} />
            </div>
        </div>
    )
}
