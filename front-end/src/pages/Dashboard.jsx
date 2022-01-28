import { connect } from "react-redux";
import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { UserBoard } from "../cmp/dashboard/UserBoard";
import { Loader } from "../cmp/utils/Loader"
import { SellerBoard } from "../cmp/dashboard/SellerBoard";
import { setProfile, setDetails, setHome, setExplore, setBecomeSeller } from "../store/scss.action";


function _DashBoard({ currUser, setDetails, setExplore, setBecomeSeller, setProfile, setHome, isProfile }, ...props) {
    const [user, setUser] = useState(currUser);
    const [isInSeller, setIsSeller] = useState(false);
    useEffect(() => {
        onSetDashBoard();
    }, [])
    const onSetDashBoard = () => {
        if (isProfile) return;
        setProfile(true)
        setHome(false)
        setExplore(false)
        setDetails(false)
        setBecomeSeller(false)
    }

    const switchDashboard = (isSeller) => {
        setIsSeller(isSeller);
    }
    if (!currUser) return <Loader />
    return <section className="dashboard">
        <div className="dashboard-content">
            {(!user.sellerInfo || (!isInSeller)) && <UserBoard switchToSeller={switchDashboard} />}
            {user.sellerInfo && isInSeller && <SellerBoard switchToUser={switchDashboard} />}
        </div>
    </section>
}

function mapStateToProps({ userModule, scssModule }) {
    return {
        currUser: userModule.user,
        isProfile: scssModule.isProfile
    }
}

const mapDispatchToProps = {
    setBecomeSeller,
    setDetails,
    setExplore,
    setHome,
    setProfile
}

const _DashBoardWithRouter = withRouter(_DashBoard)
export const DashBoard = connect(mapStateToProps, mapDispatchToProps)(_DashBoardWithRouter);