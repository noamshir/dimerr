import { orderService } from "../services/order.service";




export function loadOrders(userId, type) {
    return async (dispatch) => {
        try {
            const userOrders = await orderService.query(userId, type);
            const action = { type: 'SET_ORDERS', orders: userOrders };
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function addOrder(gig, user, owner) {
    return async (dispatch) => {
        try {
            const savedOrder = await orderService.saveOrder(gig, user, owner)
            const action = { type: 'ADD_ORDER', order: savedOrder }
            dispatch(action)
            return savedOrder
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function updateOrder(order) {
    return async (dispatch) => {
        try {
            const savedOrder = await orderService.save(order)
            const action = { type: 'UPDATE_ORDER', order: savedOrder };
            dispatch(action)
            return savedOrder
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function remove(orderId) {
    return async (dispatch) => {
        try {
            await orderService.remove(orderId)
            const action = { type: 'REMOVE_ORDER', orderId }
            dispatch(action)
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function onChangeStatus(order) {
    return async (dispatch) => {
        const action = { type: 'UPDATE_ORDER', order };
        dispatch(action)
        try {
            orderService.changeStatus(order)
        }
        catch (err) {
            console.log('err', err);
        }
    }
}

// export function socketAddOrder(order) {
//     return async (dispatch) => {
//         const action = { type: 'UPDATE_ORDER', order };
//         dispatch(action)
//         return Promise.resolve(order)
//     }
// }
