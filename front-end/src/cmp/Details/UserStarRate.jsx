import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export function UserStarRate({ gig, isSeller, isReviews, owner }) {
    const stars = [<StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />, <StarIcon />]

    if (!owner) return <React.Fragment></React.Fragment>
    return (
        <div className='stars'>
            {stars.map((star, idx) => {
                if (idx < (gig.owner.rate)) return <span key={idx} className='star'>{star}</span>
                else return <span key={idx} className='star'><StarOutlineIcon /></span>
            })}
            {!isReviews && <span className='rate-num'>{'(1k+)'}</span>}
        </div>
    )
}