import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import InstagramIcon from '@mui/icons-material/Instagram';


export function AppFooter() {


    return (
        <section className='app-footer'>
            <div className="main-info max-width-container equal-padding">
                <div className="logo-small-container">
                    <h2>dimerr<span>®</span></h2>
                    <small>© Dimerr International Ltd. 2022</small>
                </div>

                <ul className='social clean-list'>
                    <li>
                        <a className='clean-link' target="_blank" href="https://www.facebook.com/" >
                            <FacebookRoundedIcon />
                        </a>
                    </li>
                    <li>
                        <a className='clean-link' target="_blank" href="https://twitter.com/explore" >
                            <TwitterIcon />
                        </a>
                    </li>
                    <li>
                        <a className='clean-link' target="_blank" href="https://www.linkedin.com/" >
                            <LinkedInIcon />
                        </a>
                    </li>
                    <li>
                        <a className='clean-link' target="_blank" href="https://www.pinterest.com/" >
                            <PinterestIcon />
                        </a>
                    </li>
                    <li>
                        <a className='clean-link' target="_blank" href="https://www.instagram.com/" >
                            <InstagramIcon />
                        </a>
                    </li>
                </ul>
            </div>

        </section>
    )
}