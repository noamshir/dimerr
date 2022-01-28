import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


export function HomePageInfo() {



    return (
        <section className='home-page-info'>
            <div className="container max-width-container equal-padding">
                <div className="left-side-container">
                    <h2>
                        A whole world of freelance talent at your fingertips
                    </h2>

                    <div className="paragraph">
                        <div className="title">
                            <span><CheckCircleOutlineIcon /></span>
                            <h3>
                                The best for every budget
                            </h3>
                        </div>
                        <span className='desc'>
                            Find high-quality services at every price point. No hourly rates, just project-based pricing.
                        </span>
                    </div>
                    <div className="paragraph">
                        <div className="title">
                            <span><CheckCircleOutlineIcon /></span>
                            <h3> Quality work done quickly </h3>
                        </div>
                        <span className='desc'>
                            Find the right freelancer to begin working on your project within minutes.
                        </span>
                    </div>
                    <div className="paragraph">
                        <div className="title">
                            <span><CheckCircleOutlineIcon /></span>
                            <h3>
                                Protected payments, every time
                            </h3>
                        </div>
                        <span className='desc'>
                            Always know what you'll pay upfront. Your payment isn't released until you approve the work.
                        </span>
                    </div>
                    <div className="paragraph">
                        <div className="title">
                            <span><CheckCircleOutlineIcon /></span>
                            <h3>
                                24/7 support
                            </h3>
                        </div>
                        <span className='desc'>
                            Questions? Our round-the-clock support team is available to help anytime, anywhere.
                        </span>
                    </div>
                </div>
                <div className="right-side-container">
                    <div className="img-container">
                        <img src="https://media.istockphoto.com/photos/young-woman-using-laptop-and-digital-tablet-while-working-at-home-picture-id1291461192?k=20&m=1291461192&s=612x612&w=0&h=8pIp6qgJ5d5DG1YUtocyM4uzc14_thBm6x3EXgyk9x8=" alt="image" />
                    </div>
                </div>
            </div>
        </section>
    )
}