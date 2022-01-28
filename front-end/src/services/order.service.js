import { storageService } from "./async-storage.service.js";

// import Axios from 'axios'
import { httpService } from "./http.service.js";
// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'

// var axios = Axios.create({
//     withCredentials: true
// })

const STORAGE_KEY = "order_db";

export const orderService = {
  query,
  getById,
  save,
  remove,
  saveOrder,
  changeStatus
};

async function query(userId, type) {
  //TODO - type means buyer or seller
  var filterBy = { userId, type };
  const orders = await httpService.get("order", { params: { filterBy } });
  return orders
}
async function getById(orderId) {
  return httpService.get(`order/${orderId}`);
  // return storageService.get(STORAGE_KEY, orderId);
}
async function remove(orderId) {
  return httpService.delete(`order/${orderId}`);
  // return Promise.reject('Not now!');
  // return storageService.remove(STORAGE_KEY, orderId);
}
async function save(order) {
  if (order._id) {
    return httpService.put(`order/${order._id}`, order);
    // return storageService.put(STORAGE_KEY, order);
  } else {
    return httpService.post("order", order);
    // const user = userService.getLoggedinUser()
    // order.owner = user;
  }
}

async function changeStatus(order) {
  const updatedOrder = await save(order)
  return updatedOrder
}

async function saveOrder(gig, user, owner) {
  const order = {
    buyer: {
      imgUrl: user.imgUrl,
      _id: user._id,
      username: user.username,
    },
    seller: {
      imgUrl: owner.imgUrl,
      _id: owner._id,
      username: owner.username,
    },
    gig: {
      _id: gig._id,
      title: gig.title,
      daysToMake: gig.daysToMake,
      price: gig.price + gig.price / 3,
      img: gig.imgUrls[0],
    },
    orderStatus: 'pending',
  };

  return await save(order);
}