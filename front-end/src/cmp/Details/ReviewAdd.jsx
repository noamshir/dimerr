import React from "react";
import { RateStars } from "./RateStars";



export function ReviewAdd({ owner, loadOwner, setReviewAdd }) {

    return (
        <section className='review-add'>
            <header className='review-add-header'>
                <h2>Rate {'&'} Review</h2>
                <h5 className='title'>Share with the community your experience when working with this seller.</h5>
                <RateStars owner={owner} loadOwner={loadOwner} setReviewAdd={setReviewAdd}/>
            </header>
        </section>
    )
}