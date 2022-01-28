const dbService = require("../../services/db.service");
const { ObjectId } = require("mongodb");
const logger = require("../../services/logger.service");

module.exports = {
  query,
};

async function query() {
  try {
    const collection = await dbService.getCollection("categories");
    const categories = await collection.find({}).toArray();
    return categories;
  } catch (err) {
    logger.error("cant get categories", err);
    throw err;
  }
}
