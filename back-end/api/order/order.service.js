const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
  query,
  getById,
  remove,
  update,
  add,
};
async function query({ userId, type }) {
  try {
    const critiria = _critiria(type, userId);
    const collection = await dbService.getCollection('order');
    const orders = await collection.find(critiria).toArray();
    return orders;
  } catch (err) {
    logger.error(`erorr while finding orders`, err);
    throw err;
  }
}

async function getById(orderId) {
  try {
    const collection = await dbService.getCollection("order");
    const order = await collection.findOne({ _id: ObjectId(orderId) });
    return order;
  } catch (err) {
    logger.error(`while finding order ${orderId}`, err);
    throw err;
  }
}

async function remove(id) {
  try {
    const collection = await dbService.getCollection("order");
    await collection.deleteOne({ _id: ObjectId(id) });
    return;
  } catch (err) {
    logger.error(`cannot remove order ${id}`, err);
    throw err;
  }
}

async function update(order) {
  try {
    order._id = ObjectId(order._id);
    const collection = await dbService.getCollection("order");
    await collection.updateOne({ _id: order._id }, { $set: { ...order } });
    return order;
  } catch (err) {
    logger.error(`cannot update order ${order._id}`, err);
    throw err;
  }
}

async function add(order) {
  // order.inStock = true
  // order.reviews = reviews
  try {
    const collection = await dbService.getCollection("order");
    await collection.insertOne(order);

    return order;
  } catch (err) {
    logger.error("cannot insert order", err);
    throw err;
  }
}

function _critiria(type, id) {
  const critiria = {};
  if (type === "buyer") {
    critiria["buyer._id"] = id;
  } else {
    critiria["seller._id"] = id;
  }
  return critiria;
}
