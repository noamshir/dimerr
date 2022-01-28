import { Link } from 'react-router-dom'
import { SellerStats } from '../dashboard/SellerStats'

export function SellerDetails({ user, showSellerStats }) {

    if (!showSellerStats)
        return (
            <div className="seller-details-container">
                {user.sellerInfo.sellerDesc && <div className="description-wrapper">
                    <h2>Description</h2>
                    <p className="description">{user.sellerInfo.sellerDesc}</p>
                </div>}
                {user.sellerInfo.skills.length && <div className="skills-wrapper">
                    <h2>Skills</h2>
                    <ul className="skills clean-list">
                        {user.sellerInfo.skills.map((skill, idx) => {
                            return <li className="skill" key={idx}><Link className="clean-link" to="/explore">{skill}</Link></li>
                        })}
                    </ul>
                </div>
                }
            </div>
        )

    return (
        <SellerStats />
    )
}