import { connect } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { storageService } from '../../services/async-storage.service';
import { setLikedGig, loadGigs } from '../../store/gig.action';
import { gigService } from '../../services/gig.service';

function _GigHeader({ gig, loadGig, user, setLikedGig, loadGigs }) {
  var sticky = "";
  const [isLiked, setLiked] = useState(false)

  useEffect(() => {
    checkIfLiked()
    loadGigs()
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
  async function toggleLike() {
    await setLikedGig(gig, user)
    loadGig(gig._id)
    setLiked(!isLiked)
  }

  var activeLike = (isLiked) ? "active" : "";
  return (
    <header className={`gig-details-header ${sticky}`}>
      <div className="header-content max-width-container equal-padding flex">
        <nav className="gig-header-nav flex">
          <ul className="clean-list flex">
            <li><a className="clean-link" href="#Overview">Overview</a></li>
            <li><a className="clean-link" href="#AboutThisGig">About this gig</a></li>
            <li><a className="clean-link" href="#AboutSeller">About the seller</a></li>
            <li><a className="clean-link" href="#Reviews">Reviews</a></li>
          </ul>
        </nav>
        <div className="like-header flex">
          <button className={`like-btn-header ${activeLike}`} onClick={() => toggleLike()}><FavoriteIcon /></button>
          <span className="likes-count">{gig.likedByUser.length}</span>
        </div>
      </div>
    </header>
  )
}

const mapsStateToprops = (state) => {
  return {
    gigs: state.gigModule.gigs,
    user: state.userModule.user
  }
}
const mapDispatchToProps = {
  setLikedGig,
  loadGigs
};

export const GigHeader = connect(mapsStateToprops, mapDispatchToProps)(_GigHeader);