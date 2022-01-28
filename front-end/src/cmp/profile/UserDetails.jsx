import { UserProfileImg } from './UserProfileImg'
import { UserStarRate } from '../Details/UserStarRate'
import React, { useState, useEffect } from 'react'

import {
    socketService,
    SOCKET_EMIT_USER_ONLINE,
    SOCKET_EMIT_USER_OFFLINE,
    SOCKET_EMIT_JOIN_IS_CONNECTED,
    SOCKET_EMIT_LEAVE
} from '../../services/socket.service'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';

export function UserDetails({ user }) {

    const [isOnline, setIsOnline] = useState(false);

    var { createdAt } = user
    createdAt = new Date(user.createdAt)
    var month = createdAt.toLocaleString('default', { month: 'short' })
    var year = createdAt.getFullYear();
    const gig = { owner: { rate: user.sellerInfo?.rate } }
    return (
        <div className="user-details max-width-container equal-padding">
            <div className="user-stats-wrapper">
                <span className={`online-status ${isOnline && 'online'}`}>{isOnline ? 'online' : 'offline'}</span>
                <UserProfileImg setIsOnline={setIsOnline} user={user} isLink={false} />
                <div className="fullname">{user.fullname}</div>
                {user.sellerInfo && <UserStarRate gig={gig} owner={user} />}
            </div>
            <div className="user-info-wrapper">
                <div className="user-stats">
                    {user.sellerInfo && <div className='origin-wrapper'>
                        <div><LocationOnIcon /> From</div>
                        <div className='origin'> {user.sellerInfo.origin}</div>
                    </div>}
                    <div className='member-since'>
                        <div><PersonIcon /> Member since</div>
                        <div className='date'>{month} {year}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}