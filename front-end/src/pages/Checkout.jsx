import React from "react";
import CheckIcon from '@mui/icons-material/Check';
import { connect } from "react-redux";

import { UserStarRate } from "../cmp/Details/UserStarRate";
import { gigService } from "../services/gig.service";
import { userService } from "../services/user.service";
import { addOrder } from '../store/order.action';
import { showSuccessMsg } from "../services/event-bus.service";
import { setExplore, setHome, setDetails, setBecomeSeller, setProfile } from '../store/scss.action';
import { toggleSignInModal } from '../store/scss.action';
import { socketService } from "../services/socket.service";



class _Checkout extends React.Component {
    state = {
        gig: null,
        owner: null
    }

    async componentDidMount() {
        const { gigId } = this.props.match.params
        let urlParams = new URLSearchParams(this.props.location.search);
        this.features = urlParams.get("features")
        this.fixFeatures()
        this.onSetProfile();
        await this.loadGig(gigId)
        this.loadOwner(this.state.gig.owner._id)
    }
    onSetProfile = () => {
        if (this.props.isProfile) return;
        this.props.setExplore(false);
        this.props.setHome(false);
        this.props.setDetails(false);
        this.props.setBecomeSeller(false);
        this.props.setProfile(true);
    }

    fixFeatures = () => {
        this.features = this.features.split(',')
    }

    loadGig = async (gigId) => {
        const gig = await gigService.getById(gigId)
        this.setState(prevState => ({ ...prevState, gig }))
    }
    loadOwner = async (userId) => {
        const owner = await userService.getById(userId)
        this.setState(prevState => ({ ...prevState, owner }))
    }

    getAvgRate = () => {
        const { owner, gig } = this.state
        if (!owner.reviews.length) return ''
        const acc = owner.reviews.reduce((acc, review) => {
            acc += +review.rate
            return acc
        }, 0)
        gig.owner.rate = (acc / owner.reviews.length).toFixed(1)
        return (acc / owner.reviews.length).toFixed(1)
    }

    trimIWill = () => {
        let { gig: { title } } = this.state
        title = title.trim();
        var titleToEdit = title.toLowerCase();
        if (titleToEdit.startsWith('i will')) {
            title = title.slice(7);
            title = title.charAt(0).toUpperCase() + title.slice(1);
        }
        return title;
    }

    onSetOrder = async () => {
        const { gig, owner } = this.state
        const { user } = this.props
        if (!user) {
            this.props.toggleSignInModal(true);
            return;
        }
        const savedOrder = await this.props.addOrder(gig, user, owner)
        socketService.emit('new order', savedOrder)
        showSuccessMsg('Order saved, check it out in your profile!')
        this.props.history.push(`/dashboard/${user._id}`)
    }

    render() {
        const { gig, owner } = this.state
        if (!gig || !owner) return <React.Fragment></React.Fragment>
        return (
            <section className='checkout max-width-container equal-padding' >
                <div className="left-side-container">
                    <div className="main-content-container">
                        <div className="img-container">
                            <img src={gig.imgUrls[0]} alt="first image"></img>
                        </div>
                        <div className="main">
                            <h3>{gig.title}</h3>
                            <div className="star-rate-container">
                                <UserStarRate owner={owner.reviews} gig={gig} isReviews={true} />
                                <span className='num-of-rating'>{this.getAvgRate()}</span>
                                <span className='review-length'>({owner.reviews.length})</span>
                            </div>
                        </div>
                        <div className="price">{gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</div>
                    </div>
                    <div className="details">
                        <h2>Order Details</h2>
                        <p>{this.trimIWill()}</p>
                        <div className='order-features'>
                            <ul className='clean-list'>
                                {this.features.map((feature, idx) => {
                                    return (<li key={idx}>
                                        <CheckIcon className="check-icon" />
                                        {feature}
                                    </li>)
                                })}
                            </ul>
                        </div>
                    </div>
                </div >
                <div className="right-side-container">
                    <div className="order-modal sticky">
                        <h3>Price summary</h3>
                        <ul className='clean-list'>
                            <li>Subtotal
                                <span> {gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                            </li>
                            <li>Service Fee
                                <span> {(gig.price * 0.05).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                            </li>
                            <li className='bold'>
                                Total
                                <span> {(gig.price + (gig.price / 3)).toLocaleString("USA", { style: "currency", currency: "USD" })}</span>
                            </li>
                            <li> Delivery Time
                                <div className="li-inner-container">
                                    <span>{gig.daysToMake}</span>
                                    <span> {gig.daysToMake === 1 ? 'day' : 'days'}</span>
                                </div>
                            </li>
                        </ul>
                        <button className='btn' onClick={this.onSetOrder}>Purchase</button>
                    </div>
                </div>
            </section>
        )
    }
}

function mapStateToProps(state) {
    return {
        isProfile: state.scssModule.isProfile,
        order: state.orderModule.order,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    setExplore,
    setHome,
    setDetails,
    setBecomeSeller,
    setProfile,
    addOrder,
    toggleSignInModal

}

export const Checkout = connect(mapStateToProps, mapDispatchToProps)(_Checkout)