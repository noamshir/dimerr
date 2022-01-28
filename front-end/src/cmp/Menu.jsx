import { connect } from "react-redux"
import { NavLink } from "react-router-dom"
import { toggleJoinModal, toggleSignInModal } from "../store/scss.action";
import { UserProfileImg } from "./profile/UserProfileImg";

function _Menu({ user, closeMenu, toggleJoinModal, toggleSignInModal, menuOpen }) {

    const openJoin = () => {
        closeMenu();
        toggleJoinModal(true);
    }
    const openSignIn = () => {
        closeMenu();
        toggleSignInModal(true);
    }
    const classname = (menuOpen) ? "open" : "";
    return <section className={`side-Bar ${classname}`}>
        <div className="side-bar-content">
            <header className="menu-header">
                {!user && <button className="btn" onClick={() => openJoin()} >Join Dimmer</button>}
                {user && <div className="user-content flex">
                    <UserProfileImg closeMenu={() => closeMenu()} user={user} isLink={true} />
                    <h5>{user.username}</h5>
                </div>}
            </header>

            <nav className="menu-nav">
                <ul className="clean-list">
                    {!user && <li onClick={() => openSignIn()} className="menu-item sign">Sign in</li>}
                    <li className="menu-item"><NavLink onClick={() => closeMenu()} className="clean-link" to="/">Home</NavLink></li>
                    <li className="menu-item"><NavLink onClick={() => closeMenu()} className="clean-link" to="/explore">Explore</NavLink></li>
                    {!user?.sellerInfo && <li className="menu-item"><NavLink onClick={() => closeMenu()} className="clean-link" to="/becomeSeller">Become a Seller</NavLink></li>}
                </ul>
            </nav>
        </div>
    </section>
}


function mapStateToProps({ userModule }) {
    return {
        user: userModule.user
    }
}
const mapDispatchToProps = {
    toggleJoinModal,
    toggleSignInModal
}

export const Menu = connect(mapStateToProps, mapDispatchToProps)(_Menu)