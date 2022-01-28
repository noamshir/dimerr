const categorieService = require("./categories.service");
const logger = require("../../services/logger.service");

async function getCategories(req, res) {
  try {
    const categories = await categorieService.query();
    res.send(categories);
  } catch (err) {
    logger.error("error happend while trying to get categories...", err);
    res.status(500).send({ err: "Failed to get categories" });
  }
}

module.exports = {
  getCategories,
};
