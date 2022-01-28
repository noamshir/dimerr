import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    socketService,
    SOCKET_EMIT_USER_ONLINE,
    SOCKET_EMIT_USER_OFFLINE,
} from "../../services/socket.service";
function _UserProfileImg({ user, isLink, closeMenu, toggleMenu, setIsOnline = false, dotClass, myUser }) {
    const [connectedClass, setConnectedClass] = useState('')

    useEffect(() => {
        setSockets();
        return () => {
            socketService.off(SOCKET_EMIT_USER_ONLINE)
            socketService.off(SOCKET_EMIT_USER_OFFLINE)
        }
    }, [])

    const setSockets = () => {
        socketService.emit('isUserConnected', user._id)
        socketService.on(SOCKET_EMIT_USER_OFFLINE, (userId) => {
            if (setIsOnline && user?._id === userId) setIsOnline(false);
            else if (user?._id === userId) setConnectedClass('');
        })
        socketService.on('user-connection', (id) => {
            if (id === user._id) {
                if (setIsOnline) setIsOnline(true);
                else {
                    setConnectedClass('connection-dot')
                }
            }
        })
        socketService.on("find-user", (id) => {
            if (id === user._id) {
                if (setIsOnline) setIsOnline(false);
                setConnectedClass('')
            }
        })
    }
    socketService.on(SOCKET_EMIT_USER_OFFLINE, (userId) => {
        if (setIsOnline && user?._id === userId) setIsOnline(false);
        else if (user?._id === userId) setConnectedClass('');
    })

    if (!isLink) {
        return (
            <div className="container-user-img" onClick={() => {
                if (toggleMenu) toggleMenu();
            }}>
                {user.imgUrl ?
                    <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}>
                        <div className={`${connectedClass} ${dotClass}`}></div>
                    </div>
                    : <div className="user-img">
                        <span className="spanclass">{user.username?.charAt(0)}</span>
                        <div className={`${connectedClass} ${dotClass}`}></div>
                    </div>}
            </div>
        )
    }
    return (
        <Link onClick={() => {
            if (closeMenu) closeMenu();
        }} className="clean-link" to={`/profile/${user._id}`}>
            {user.imgUrl ?
                <div className="user-img" style={{ backgroundImage: `url(${user.imgUrl})` }}>
                    <div className={connectedClass}></div>
                </div>
                : <div className="user-img">
                    <span>{user.username?.charAt(0)}</span>
                    <div className={connectedClass}></div>
                </div>}
        </Link>
    )
}

function mapStateToProps({ userModule }) {
    return {
        myUser: userModule.user
    }
}

export const UserProfileImg = connect(mapStateToProps)(_UserProfileImg);