import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';


import { Carousel } from "./Carousel";
import { CarouselItem } from "./CarouselItem";
import { setLikedGig } from '../store/gig.action.js'
import { storageService } from '../services/async-storage.service';
import { gigService } from '../services/gig.service';
import { UserProfileImg } from './profile/UserProfileImg'


function _GigPreview({ gig, onGoToDetails, user, setLikedGig }) {
    const [likeMsgClass, setClass] = useState(false)
    const [isLiked, setLiked] = useState(false)

    useEffect(() => {
        checkIfLiked()
    }, [])

    async function checkIfLiked() {
        if (user) {
            const isUserLiked = await gigService.isLikedByUser(gig)
            setLiked(isUserLiked)
        } else {
            const isGuestLiked = await storageService.isLikedByGuest(gig._id)
            setLiked(isGuestLiked)
        }
    }

    function getUserLevel() {
        if (gig.owner.rate === 1 || gig.owner.rate < 3) {
            return gig.owner.level = 'New Seller'
        } else if (gig.owner.rate < 4) {
            return gig.owner.level = 'Level 1'
        } else if (gig.owner.rate < 4.5) {
            return gig.owner.level = 'Level 2'
        }
        return gig.owner.level = 'Top Rated Seller'
    }

    async function toggleLike() {
        setLiked(!isLiked)
        setLikedGig(gig, user)
    }

    function getTitleToShow() {
        if (gig.title.length > 48) {
            return `${gig.title.substring(0, 30)}...`
        }
        return gig.title
    }

    return (
        <section className='gig-preview'>
            <div className="gig-img">
                <Carousel onGoToDetails={onGoToDetails} gig={gig}>
                    {gig.imgUrls.slice(0, 5).map((imgUrl, idx) => <CarouselItem key={idx} imgUrl={imgUrl}></CarouselItem>)}
                </Carousel>
            </div>
            <div className="owner-info">
                <UserProfileImg user={gig.owner} isLink={false} />
                {/* <div className='owner-pic' style={{ backgroundImage: `url(${gig.owner.imgUrl})` }}></div> */}
                <div className="owner-level-name">
                    <h5 className='owner-name'>{gig.owner.fullname}</h5>
                    <h5 className='owner-level'>{getUserLevel()}</h5>
                </div>
            </div>

            <Link className='clean-link' to={`/explore/${gig._id}`}>
                <p className='gig-title'>{getTitleToShow()}</p>
            </Link>

            <div className='card-end-wrapper'>
                <div className='rate-wrapper'>
                    <span className='gig-rating'><StarIcon /> {gig.owner.rate}<span className='review-number'>(1k+)</span></span>
                </div>
                <div className="price-like-container">

                    <span className={isLiked ? 'popup like active' : 'popup like'}
                        onMouseLeave={() => {
                            setClass(false)
                        }} onMouseEnter={() => {
                            setClass(true)
                        }}
                        onClick={toggleLike}
                    ><FavoriteIcon />
                        <span className={likeMsgClass ? 'popuptext show' : 'popuptext'}> {isLiked ? 'added' : 'add to favorite'}</span>
                    </span>
                    <Link className='clean-link' to={`/explore/${gig._id}`}>
                        <ul className='clean-list'>
                            <li className='starting-price'>Starting At</li>
                            <li>{gig.price.toLocaleString("USA", { style: "currency", currency: "USD" })}</li>
                        </ul>
                    </Link>
                </div>
            </div>

        </section >
    )
}


function mapStateToProps(state) {
    return {
        gigs: state.gigModule.gigs,
        user: state.userModule.user
    }
}

const mapDispatchToProps = {
    setLikedGig
};


export const GigPreview = connect(mapStateToProps, mapDispatchToProps)(_GigPreview)