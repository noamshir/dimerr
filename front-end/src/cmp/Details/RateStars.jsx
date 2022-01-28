import StarRatings from 'react-star-ratings';
import React from 'react';
import { connect } from 'react-redux'
import { userService } from '../../services/user.service'
import { toggleSignInModal } from '../../store/scss.action';
import { showSuccessMsg } from '../../services/event-bus.service';

export class _RateStars extends React.Component {
    state = {
        ratings: {
            sellerComm: 0,
            service: 0,
            recommned: 0
        },
        txt: ''
    }


    changeRating = (newRating, name) => {
        this.setState(prevState => ({ ratings: { ...prevState.ratings, [name]: newRating } }))
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ ...prevState, [field]: value }))
    }

    sumRate = () => {
        const { ratings } = this.state
        const avg = (ratings.service + ratings.sellerComm + ratings.recommned) / 3
        return avg.toFixed(1)
    }

    submit = async (ev) => {
        ev.preventDefault()
        const { user, owner } = this.props
        if (!user) {
            this.props.toggleSignInModal(true);
            return;
        }
        const avgRate = this.sumRate()
        await userService.saveReview(avgRate, this.state.txt, user, owner)
        showSuccessMsg("review added!");
        this.props.setReviewAdd(false)
        this.props.loadOwner(owner._id)
    }

    render() {
        const { ratings, txt } = this.state
        return (
            <form className='rate-stars-form' onSubmit={this.submit}>
                <div className="question">
                    <h3>Communication With Seller</h3>
                    <h5>How responsive was the seller during the process?</h5>
                    <StarRatings
                        rating={ratings.sellerComm}
                        starRatedColor="#ffb33e"
                        changeRating={this.changeRating}
                        name='sellerComm'
                        starDimension="20px"
                        starSpacing="0px"
                        starHoverColor="#ffb33e"
                    />
                </div>
                <div className="question">
                    <h3>Service as Described</h3>
                    <h5>Did the result match the Gig's description?</h5>
                    <StarRatings
                        rating={ratings.service}
                        starRatedColor="#ffb33e"
                        changeRating={this.changeRating}
                        name='service'
                        starDimension="20px"
                        starSpacing="0px"
                        starHoverColor="#ffb33e"
                    />
                </div>
                <div className="question">
                    <h3>Buy Again or Recommend</h3>
                    <h5>Would you recommend buying this Gig?</h5>
                    <StarRatings
                        rating={ratings.recommned}
                        starRatedColor="#ffb33e"
                        changeRating={this.changeRating}
                        name='recommned'
                        starDimension="20px"
                        starSpacing="0px"
                        starHoverColor="#ffb33e"
                    />
                </div>
                <div className="text-area">
                    <h3>Give Your Honest Opinion (Optional)</h3>
                    <textarea name="txt" value={txt} onChange={this.handleChange} placeholder={`Are you satisfied with the result? Would you use the seller\'s services again?`}></textarea>
                </div>
                <button type='submit'>Add</button>
            </form>
        );
    }
}



function mapStateToProps(state) {
    return {
        user: state.userModule.user,
    }
}

const mapDispatchToProps = {
    toggleSignInModal
};


export const RateStars = connect(mapStateToProps, mapDispatchToProps)(_RateStars)