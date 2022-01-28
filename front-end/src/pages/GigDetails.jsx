import { connect } from 'react-redux'
import React from 'react'

import { DetailsHeader } from '../cmp/Details/DetailsHeader'
import { OrderModal } from '../cmp/Details/OrderModal'
import { Carousel } from '../cmp/Carousel'
import { CarouselItem } from '../cmp/CarouselItem'
import { AboutSeller } from '../cmp/Details/AboutSeller'
import { AboutGig } from '../cmp/Details/AboutGig'
import { ReviewList } from '../cmp/Details/ReviewList'
import { userService } from '../services/user.service'
import { gigService } from '../services/gig.service'
import {
    socketService,
    SOCKET_EMIT_JOIN,
    SOCKET_EMIT_LEAVE,
    SOCKET_EMIT_ADD_REVIEW
} from '../services/socket.service'

import { onSetFilterBy } from '../store/gig.action'
import { setHome, setExplore, setDetails, setBecomeSeller, setProfile } from '../store/scss.action.js';
import { GigHeader } from '../cmp/header/GigHeader'
import { Loader } from '../cmp/utils/Loader'



class _GigDetails extends React.Component {
    state = {
        gig: null,
        owner: null
    }

    async componentDidMount() {
        const { gigId } = this.props.match.params
        this.onSetDetails();
        await this.loadGig(gigId)
        await this.loadOwner(this.state.gig.owner._id)
        this.setSockets();
    }
    componentWillUnmount() {
        socketService.emit(SOCKET_EMIT_LEAVE, this.props.match.params)
    }

    onSetDetails = () => {
        if (this.props.isDetails) return;
        this.props.setProfile(false);
        this.props.setExplore(false);
        this.props.setHome(false);
        this.props.setDetails(true)
        this.props.setBecomeSeller(false);
    }

    setSockets = () => {
        socketService.emit(SOCKET_EMIT_JOIN, this.state.owner._id)
        socketService.on(SOCKET_EMIT_ADD_REVIEW, (review) => {
            var { owner } = this.state;
            owner.reviews = [...owner.reviews, review];
            this.setState({ owner });
        })
    }

    loadGig = async (gigId) => {
        const gig = await gigService.getById(gigId)
        this.setState(prevState => ({ ...prevState, gig }))
    }
    loadOwner = async (userId) => {
        const owner = await userService.getById(userId)
        this.setState(prevState => ({ ...prevState, owner }))
    }

    getUserLevel = () => {
        const { gig } = this.state
        if (gig.owner.rate === 1 || gig.owner.rate < 3) {
            return gig.owner.level = 'New Seller'
        } else if (gig.owner.rate < 4) {
            return gig.owner.level = 'Level 1'
        } else if (gig.owner.rate < 4.5) {
            return gig.owner.level = 'Level 2'
        }
        return gig.owner.level = 'Top Rated Seller'
    }

    render() {
        const { gig, owner } = this.state
        if (!gig || !owner) return <Loader></Loader>
        return (
            <React.Fragment>
                <GigHeader gig={gig} loadGig={this.loadGig} />
                <section className='gig-details max-width-container equal-padding'>
                    <div className="details-main-container">
                        <DetailsHeader gig={gig} getUserLevel={this.getUserLevel} owner={owner} />
                        <Carousel gig={gig} isDetails={true}>
                            {gig.imgUrls.map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl}></CarouselItem>)}
                        </Carousel>
                        <OrderModal modalClass="in-details" gig={gig} />
                        <AboutGig gig={gig} owner={owner} />
                        <AboutSeller gig={gig} getUserLevel={this.getUserLevel} owner={owner} />
                        <ReviewList owner={owner} gig={gig} loadOwner={this.loadOwner} />
                    </div>
                    <OrderModal modalClass="aside" gig={gig} />
                </section>
            </React.Fragment>
        )

    }
}


function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    onSetFilterBy,
    setDetails,
    setExplore,
    setHome,
    setBecomeSeller,
    setProfile,
}

export const GigDetails = connect(mapStateToProps, mapDispatchToProps)(_GigDetails)