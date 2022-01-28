import React from "react"



export function AboutGig({ gig }) {



    return (
        <div className='about-gig inpage-nav' id="AboutThisGig">
            <h2>About this gig</h2>

            <p className='gig-desc'>
                <span> Hi There!,</span>
                <span> Welcome to one of my incredible gigs!</span>
                <span>
                    {gig.description}
                </span>
            </p>
        </div>
    )
}