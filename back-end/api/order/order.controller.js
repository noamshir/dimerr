const orderService = require("./order.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;

async function getOrders(req, res) {
  try {
    var { filterBy } = JSON.parse(req.query.params);
    var orders = await orderService.query(filterBy);
    orders = orders.map((order) => {
      order.createdAt = ObjectId(order._id).getTimestamp();
      return order;
    });
    res.send(orders);
  } catch (err) {
    logger.error("Failed to get orders", err);
    res.status(500).send({ err: "Failed to get orders" });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const order = await orderService.getById(id);
    res.send(order);
  } catch (err) {
    logger.error("Failed to get order", err);
    res.status(500).send({ err: "Failed to get order" });
  }
}

async function removeOrder(req, res) {
  const orderId = req.params.id;
  try {
    await orderService.remove(orderId);
    res.send("removed order");
  } catch (err) {
    logger.error("Failed to remove order", err);
    res.status(500).send({ err: "Failed to remove order" });
  }
}

async function updateOrder(req, res) {
  const updatedOrder = req.body;
  console.log(updatedOrder);
  try {
    const savedOrder = orderService.update(updatedOrder);
    res.send(savedOrder);
  } catch (err) {
    logger.error("Failed to update order", err);
    res.status(500).send({ err: "Failed to update order" });
  }
}

async function addOrder(req, res) {
  try {
    const order = req.body;
    const addedOrder = await orderService.add(order);
    console.log("order in controller", addedOrder);
    res.json(addedOrder);
  } catch (err) {
    logger.error("Failed to add order", err);
    res.status(500).send({ err: "Failed to add order" });
  }
}

module.exports = {
  getOrders,
  getById,
  removeOrder,
  updateOrder,
  addOrder,
};
