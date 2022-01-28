import { UserDetails } from './UserDetails'
import { SellerDetails } from './SellerDetails'


export function UserInfoCard({ user, showSellerStats }) {

    return (
        <div className="profile-details-container">
            <UserDetails user={user} />
            {user.sellerInfo && <SellerDetails showSellerStats={showSellerStats} user={user} />}
        </div>
    )


}