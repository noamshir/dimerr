import { NavLink } from "react-router-dom"

export function ProfileMenu({ onLogout, user, closeMenu }) {
    return <aside className="profile-menu">
        <div className="menu-pointer"></div>
        <ul className="clean-list profile-scroll">
            <li className="menu-item" onClick={() => closeMenu()}><NavLink className="clean-link" to={`/profile/${user._id}`}>Profile</NavLink></li>
            <li className="menu-item" onClick={() => closeMenu()}><NavLink className="clean-link" to={`/dashboard/${user._id}`}>Dashboard</NavLink></li>
            <li className="menu-item logout" onClick={() => onLogout()}><NavLink className="clean-link" to={`/explore`}>Logout</NavLink></li>
        </ul>
    </aside>
}