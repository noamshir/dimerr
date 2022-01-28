import photo1 from "../svg/photo1.jpg";
import photo2 from "../svg/photo2.jpg";
import photo3 from "../svg/photo3.jpg";
import meta from "../svg/Meta.svg";
import GoogleIcon from '@mui/icons-material/Google';

export const ReviewItem = ({ review, width }) => {
    return (
        <div className="review-item" style={{ width: width }}>
            {(review.imgUrl === 1) && < img src={photo1} alt="" />}
            {(review.imgUrl === 2) && < img src={photo2} alt="" />}
            {(review.imgUrl === 3) && < img src={photo3} alt="" />}

            <div className="review-content">
                <div className="wrap-text">
                    <div className="writer-info">
                        <h5>{review.writers}</h5>
                        {(review.imgUrl === 1) && < img className="meta-logo" src={meta} alt="" />}
                        {(review.imgUrl === 2) && <h4>{review.company}</h4>}
                        {(review.imgUrl == 3 && <div className="google-spans">
                            <span className="google blue">G</span>
                            <span className="google red">o</span>
                            <span className="google yellow">o</span>
                            <span className="google blue">g</span>
                            <span className="google green">l</span>
                            <span className="google red">e</span>
                        </div>)}
                    </div>
                    <p>{`"${review.txt}"`}</p>
                </div>
            </div>
        </div>
    );
};