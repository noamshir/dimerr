import React, { useState } from "react";
import { utilService } from "../../services/util.service";
import { UserStarRate } from "./UserStarRate";
import { UserProfileImg } from '../profile/UserProfileImg'


export function AboutSeller({ gig, getUserLevel, owner }) {
    const [isOnline, setIsOnline] = useState(false);

    if (!owner) return <React.Fragment></React.Fragment>
    return (
        <div className='about-seller inpage-nav' id="AboutSeller">
            <h2 className='about-seller-header'>About the Seller</h2>
            <div className="seller-info">
                <UserProfileImg setIsOnline={setIsOnline} user={owner} isLink={true} />
                <div className="seller-name-level-rate">
                    <h5 className='owner-name'>{gig.owner.fullname}</h5>
                    <h5 className='owner-level'>{getUserLevel()}</h5>
                    <UserStarRate gig={gig} isSeller={true} owner={owner} />
                </div>
                <span className={`online-status ${isOnline && 'online'}`}>{isOnline ? 'online' : 'offline'}</span>
            </div>
            <div className='seller-table'>
                <div className="seller-stats">
                    <div className="card">
                        <h4>From</h4>
                        <h4>{owner.sellerInfo.origin}</h4>
                    </div>
                    <div className="card">
                        <h4>Member since</h4>
                        <h4>Feb 2022</h4>
                    </div>
                    <div className="card">
                        <h4>Avg. response time</h4>
                        <h4>{utilService.getRandomIntInclusive(1, 4)} hours</h4>
                    </div>
                    <div className="card">
                        <h4>Last delivery</h4>
                        <h4>about {utilService.getRandomIntInclusive(1, 24)} hours</h4>
                    </div>
                    <div className="seller-desc">
                        <p>{owner.sellerInfo.sellerDesc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}