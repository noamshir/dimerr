import React, { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { SearchBar } from '../SearchBar.jsx';
import { UserProfileImg } from '../profile/UserProfileImg';
import { Logo } from '../Logo.jsx';
import { logout } from '../../store/user.action'
import { setProfile, toggleJoinModal, toggleSignInModal } from '../../store/scss.action.js';
import { ProfileMenu } from './ProfileMenu.jsx';

import {
    socketService,
    SOCKET_EMIT_LOGIN,
    SOCKET_EMIT_USER_CONNECTED,
    SOCKET_EMIT_JOIN,
    SOCKET_EMIT_LEAVE,
} from "../../services/socket.service";

import { showErrorMsg, showSuccessMsg } from '../../services/event-bus.service'
function _AppHeader({ isHome, isBecomeSeller, isScroll, isSearchBar, openSignUpModal, openSignInModal, user, logout, openMenu }) {
    const [isProfileMenu, setMenu] = useState(false);
    var headerTransparent = "";
    var color = "";
    var sticky = "not-sticky";
    var searchBar = "show-bar";

    useEffect(() => {
        if (!user) return;
        socketService.emit(SOCKET_EMIT_JOIN, user._id)
        socketService.on(user._id, () => {
            socketService.emit(SOCKET_EMIT_USER_CONNECTED, user._id);
        });
        socketService.on('order status', onShowMsg)
        return () => {
            socketService.emit(SOCKET_EMIT_LEAVE, user._id)
            socketService.off(user._id)
            socketService.off('order status')
        }
    }, [user])

    if ((isHome || isBecomeSeller) && (!isScroll)) {
        headerTransparent = "header-transparent";
        color = "home-header-color"
        sticky = "sticky"
        searchBar = ""
    }
    if ((isHome || isBecomeSeller) && isScroll) {
        sticky = "sticky";
        searchBar = ""
        if (isSearchBar) searchBar = "show-bar"
    }
    const onShowMsg = ({ msg, isSuccess }) => {
        isSuccess ? showSuccessMsg(msg) : showErrorMsg(msg)
    }
    const onLogout = async () => {
        await logout(user);
        showSuccessMsg("user logged out!");
    }
    window.addEventListener('click', (ev) => {
        if (ev.target.className !== "clean-list profile-scroll" && ev.target.className !== "spanclass" && ev.target.className !== "user-img") {
            setMenu(false);
        }
    })
    const onToggleMenu = () => {
        var flag = !isProfileMenu;
        setMenu(flag);
    }
    if (user) {
        socketService.on("find-user", (userid) => {
            if (user._id === userid) socketService.emit("user-connection", userid);
        })
        socketService.emit("set-user-socket", user._id);
    }
    return <section className={`main-header ${sticky}`}>
        <div id="Header">
            <header className={`header-package dimerr-header ${headerTransparent} logged-out-homepage-header`}>
                <div className="header-row-wrapper">
                    <div className="header-row max-width-container equal-padding row-main flex">
                        <button className={`btn-nav ${color}`} onClick={() => openMenu()}><MenuIcon className="menu-icon"></MenuIcon></button>
                        <NavLink to="/" className={`dimerr-logo ${color} clean-link`}> <Logo /> </NavLink>
                        <div className={`dimerr-header-search-animated ${searchBar}`}>
                            <SearchBar placeholder="Try Logo..." />
                        </div>
                        <nav className={`dimerr-nav ${color} dimerr-nav-right flex`}>
                            <div className="nav-helper"></div>
                            <ul className="flex">
                                <li className="display-from-size-large">  <NavLink className={`clean-link ${color}`} to="/explore">Explore</NavLink></li>
                                {!user?.sellerInfo && <li className="display-from-size-large"><NavLink className={`clean-link ${color}`} to="/becomeSeller">Become a Seller</NavLink></li>}
                                {!user ?
                                    <React.Fragment>
                                        <li className="display-from-size-medium"><button className={`clean-btn ${color}`} onClick={() => openSignInModal(true)}>Sign in</button></li>
                                        <li className="display-from-size-small"><button className={`clean-btn join-a ${color}`} onClick={() => openSignUpModal(true)}>Join</button></li>
                                    </React.Fragment> :
                                    <React.Fragment>
                                        <li className="display-from-size-small profile-container">
                                            <UserProfileImg user={user} isLink={false} toggleMenu={onToggleMenu} dotClass='dot-bottom' ></UserProfileImg>
                                            {isProfileMenu && <ProfileMenu onLogout={onLogout} user={user} closeMenu={onToggleMenu} />}
                                        </li>
                                    </React.Fragment>
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

        </div>
    </section>

}

function mapStateToProps(state) {
    return {
        isHome: state.scssModule.isHome,
        isExplore: state.scssModule.isExplore,
        isScroll: state.scssModule.isScroll,
        isSearchBar: state.scssModule.isSearchBar,
        isBecomeSeller: state.scssModule.isBecomeSeller,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    logout,
    openSignInModal: toggleSignInModal,
    openSignUpModal: toggleJoinModal
};


export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader)