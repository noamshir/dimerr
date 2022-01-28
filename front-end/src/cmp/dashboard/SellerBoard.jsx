import { connect } from "react-redux"
import { BoardHeader } from "./BoardHeader"
import { Orders } from "./Orders";
import { UserInfoCard } from "../profile/UserInfoCard";

function _SellerBoard({ user, switchToUser }) {
    return <section className="seller-board">
        <BoardHeader switchToUser={switchToUser} user={user} switchTo={"Buyer"} />
        <div className="user-board-content max-width-container equal-padding">
            <main className="user-main">
                <UserInfoCard showSellerStats={true} user={user} />
                <Orders user={user} type={'seller'} />
            </main>
        </div>
    </section>
}

function mapStateToProps({ userModule }) {
    return { user: userModule.user }
}

export const SellerBoard = connect(mapStateToProps)(_SellerBoard);