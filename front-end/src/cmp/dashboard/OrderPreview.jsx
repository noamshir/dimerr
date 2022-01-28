import { NavLink } from "react-router-dom";
import React from 'react';

import { UserProfileImg } from "../profile/UserProfileImg"
import { socketService } from "../../services/socket.service";


export function OrderPreview({ order, type, user, onChangeStatus }) {
    const showingType = (type === 'buyer') ? 'seller' : 'buyer';
    const atIdx = order[showingType].username.indexOf('@');
    const username = order[showingType].username;
    const slicedUsername = atIdx < 0 ? username : username.slice(0, atIdx);
    var statusClass;

    if (order.orderStatus === ('pending' || 'delivered')) statusClass = 'gray';
    if (order.orderStatus === 'rejected') statusClass = 'deactivated red';
    if (order.orderStatus === 'active') {
        if (type === 'seller') statusClass = 'deactivated green'
        else statusClass = 'green';
    }


    const getStatus = () => {
        switch (order.orderStatus) {
            case 'pending': {
                return 'Approve'
            }
            case 'active': {
                return 'Active'
            }
            case 'rejected': {
                return 'Denied'
            }
        }

    }

    const setStatus = (value) => {
        if (order.orderStatus === 'rejected' || order.orderStatus === 'active') return
        order.orderStatus = value
        onChangeStatus(order)
        socketService.emit('new status', order)
        socketService.emit('new status msg', order)
    }

    return (
        <section className={showingType === 'buyer' ? `order-preview flex eighty` : `order-preview flex`}>
            {/* <div className="main flex"> */}
            <div className="main">
                {/* <div className='inner flex'> */}
                <NavLink className="gig-img" to={`/explore/${order.gig._id}`}>
                    <div className='img-container'>
                        <img src={order.gig.img} alt='img' />
                    </div>
                </NavLink>
                <div className='user-info flex'>
                    <h5>{slicedUsername}</h5>
                    <UserProfileImg isLink={true} user={order[showingType]} />
                </div>
                {/* </div> */}
                {/* <div className="second-line flex"> */}
                <div className='gig-info flex'>
                    <span className='price'>Price</span>
                    <span>{order.gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="delivery-container flex">
                    <span className='delivery-time'>Delivery Time</span>
                    <span className='days'>{order.gig.daysToMake === 1 ? `${order.gig.daysToMake} day` : `${order.gig.daysToMake} days`}</span>
                </div>
                {/* </div> */}
            </div>
            <div className="status-container">
                <span className='order-type'>Order Status:</span>
                {showingType === 'buyer' ?
                    <div className='btn-wrapper flex'>
                        <button className={`button ${getStatus() === 'Denied' ? 'red' : 'green'}`
                        } onClick={() => {
                            setStatus('active')
                        }}>{getStatus()}
                        </button>
                        {order.orderStatus === 'pending' && <button className={'button red'}
                            onClick={() => {
                                setStatus('rejected')
                            }}>Reject
                        </button>}
                    </div>
                    :
                    <span className={`status ${statusClass}`}>{order.orderStatus}</span>}
            </div>
        </ section >
    )
}