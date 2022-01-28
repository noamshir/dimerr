import WidgetsIcon from '@mui/icons-material/Widgets';
import { useState } from 'react';

export function BoardHeader({ switchTo, user, switchToSeller, switchToUser }) {
    const [classNav, setClass] = useState(false)

    return <section className="board-header">
        <div className="board-content flex max-width-container equal-padding">
            <nav className="board-nav">
                <div className="hamburger" onClick={() => {
                    setClass(!classNav)
                }}><WidgetsIcon /></div>
                <ul className={classNav ? "flex clean-list open" : "flex clean-list"}>
                    <li>Dashboard</li>
                    <li>Analytics</li>
                    <li>Messeges</li>
                </ul>
            </nav>
            <div className="flex-grow-helper"></div>
            {user.sellerInfo && <button className="btn-switch-user-view" onClick={() => {
                if (switchToSeller) switchToSeller(true);
                else if (switchToUser) switchToUser(false);
            }}>Switch to {switchTo}</button>}
        </div>
    </section>
}