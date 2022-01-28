const initialState = {
    orders: [],
}

export function orderReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_ORDERS':
            newState = { ...state, orders: [...action.orders] }
            break;
        case 'ADD_ORDER':
            newState = { ...state, orders: [...state.orders, action.order] }
            break;
        case 'UPDATE_ORDER':
            newState = { ...state, orders: state.orders.map(order => order._id === action.order._id ? action.order : order)}
            break;
        case 'REMOVE_ORDER':
            newState = { ...state, orders: state.orders.filter(order => order._id !== action.orderId) }
            break;
        default:
    }
    return newState;
}
