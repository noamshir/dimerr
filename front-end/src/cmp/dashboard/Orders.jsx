import { connect } from 'react-redux'
import React from 'react';

import { OrdersList } from "./OrdersList"
import { Loader } from "../utils/Loader"
import { loadOrders, onChangeStatus } from '../../store/order.action';
import { socketService } from '../../services/socket.service';

class _Orders extends React.Component {

    state = {
        orders: null
    }

    componentDidMount() {
        this.loadOrders();
        this.setSocket();
    }

    componentWillUnmount() {
        socketService.off('added order')
        socketService.off('changed status')
        socketService.emit('leave', this.props.user._id);
    }

    loadOrders = async () => {
        await this.props.loadOrders(this.props.user._id, this.props.type);
        this.setState({ orders: this.props.orders });
    }

    setSocket = () => {
        socketService.setup()
        socketService.on('added order', this.onAddOrder)
        socketService.on('changed status', this.onUpdateOrder)
        socketService.emit('join-order-channel', this.props.user._id);
    }
    onAddOrder = (order) => {
        this.setState(prevState => ({ orders: [...prevState.orders, order] }))
    }

    onUpdateOrder = (updatedOrder) => {
        const { orders } = this.state
        const updatedOrders = orders.map(order => order._id === updatedOrder._id ? updatedOrder : order)
        this.setState({ orders: updatedOrders })
    }

    render() {

        const { orders } = this.state
        if (!orders) return <Loader />
        return (
            < div className="orders-section" >
                <main className="orders-content">
                    {!orders.length && <h3>No Orders Yet...</h3>}
                    {orders.length > 0 && <OrdersList onChangeStatus={this.props.onChangeStatus} type={this.props.type} orders={orders} loadOrders={this.props.loadOrders} user={this.props.user} />}
                </main>
            </div >
        )
    }
}


function mapStateToProps(state) {
    return {
        orders: state.orderModule.orders
    }
}

const mapDispatchToProps = {
    loadOrders,
    onChangeStatus
};


export const Orders = connect(mapStateToProps, mapDispatchToProps)(_Orders)
