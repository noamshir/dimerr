// import { Link } from 'react-router-dom'
import { utilService } from '../../services/util.service'
import { connect } from 'react-redux'

function _SellerStats({ user, orders }) {

    const responseRate = utilService.getRandomIntInclusive(85, 100)
    const responseStyle = { width: `${responseRate}%` }
    const deliveredRate = utilService.getRandomIntInclusive(85, 100)
    const deliveredStyle = { width: `${deliveredRate}%` }
    const completionRate = Math.round(100 * _getCompletionRate(orders));
    const completionStyle = { width: `${completionRate}%` }
    console.log(completionStyle);
    const date = new Date(Date.now());
    const month = date.toLocaleString('default', { month: 'long' })

    const responseTime = utilService.getRandomIntInclusive(1, 4)
    const earned = parseInt(_getEarnings(orders));

    return (
        <div className="seller-stats-container">

            <div className='seller-stats'>

                <div className='stats-category'>Response Rate</div>
                <div className='stats-bar-container'>
                    <div className='stats-bar' style={responseStyle}></div>
                </div>
                <div className='stats-precent'>{responseRate}%</div>

                <div className='stats-category'>Delivered on Time</div>
                <div className='stats-bar-container'>
                    <div className='stats-bar' style={deliveredStyle}></div>
                </div>
                <div className='stats-precent'>{deliveredRate}%</div>

                <div className='stats-category'>Order Completion</div>
                <div className='stats-bar-container'>
                    <div className='stats-bar' style={completionStyle}></div>
                </div>
                <div className='stats-precent'>{completionRate}%</div>

            </div>
            <div className='seller-performance'>
                <div className='earned-label'>Earned in {`${month}`}</div>
                <div className='earned'>{earned.toLocaleString("USA", { style: "currency", currency: "USD" })}</div>
                <div className='response-label'>Response Time</div>
                <div className='response'>{responseTime}Hrs</div>
            </div>

        </div >
    )
}

function _getCompletionRate(orders) {
    const statusArray = orders.map(order => order.orderStatus);
    const actives = statusArray.filter(status => status === 'active');
    const pendings = statusArray.filter(status => status === 'pending');
    return actives.length / (actives.length + pendings.length);
}
function _getEarnings(orders) {
    const activeOrders = orders.filter(order => order.orderStatus === 'active');
    const prices = activeOrders.map(order => order.gig.price);
    return prices.reduce((sum, price) => sum + price, 0);
}

function mapStateToProps(state) {
    return {
        orders: state.orderModule.orders
    }
}

const mapDispatchToProps = {
};


export const SellerStats = connect(mapStateToProps, mapDispatchToProps)(_SellerStats)