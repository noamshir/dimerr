import { ReviewCarousel } from "./ReviewCarousel"
import { ReviewItem } from "./ReviewItem"

export function HomeReviews() {
    const reviews = [{ txt: "When you want to create a business bigger than yourself, you need a lot of help. That's what dimerr does.", writers: "Caitlin Tormey, Chief Commercial Officer", company: "Meta", imgUrl: 1 },
    { txt: "Dimerr helped us to start our digital marketplace. Helped us to fulfill our dream!", writers: "Mike and Abby, CEO and Founders ", company: "StockX", imgUrl: 2 },
    { txt: "We used Dimmer for SEO, our logo, website, copy, animated videos — literally everything. It was like working with a human right next to you versus being across the world.", writers: "Lucy, Co-Founder ", company: "Goggle", imgUrl: 3 },
    ]
    return <section className="home-reviews">
        <div className="home-reviews-content max-width-container equal-padding flex">
            <div className="review">
                <ReviewCarousel>
                    {reviews && reviews.map((review, idx) => <ReviewItem key={idx} review={review} imgUrl={review.imgUrl}>
                    </ReviewItem>)}
                </ReviewCarousel>
            </div>
        </div>
    </section>
}
