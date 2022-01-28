import StarIcon from '@mui/icons-material/Star';



export function ReviewPreview({ review }) {

    return (
        <div className='review-preview'>
            {review.by.imgUrl ? <div className="reviewer-img" style={{ backgroundImage: `url(${review.by.imgUrl})` }}></div>
                : <div style={{ backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16)}} className="reviewer-img">
                    <span>{review.by.fullname.charAt(0)}</span>
                </div>}

            <header>
                <div className="reviewer-info">
                    <span className="reviewer-name">{review.by.fullname}</span>
                    <div className="star-rate">
                        <span className='star'><StarIcon /></span>
                        <span className="num-of-rating">{review.rate}</span>
                    </div>
                </div>
                <div className="origin-area">
                    <img className='flag' src="data:image/png;base64,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" alt="flag" />
                    <div className="reviewer-origin">{review.by.origin}</div>
                </div>
            </header>
            <div className="review-desc">
                <p>{review.txt}</p>
            </div>

        </div>
    )
}