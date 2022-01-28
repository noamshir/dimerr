const dbService = require("../../services/db.service");
const logger = require("../../services/logger.service");
const ObjectId = require("mongodb").ObjectId;
module.exports = {
  query,
  getById,
  remove,
  update,
};
async function query(filterBy = {}) {
  const criteria = _buildCriteria(filterBy);
  try {
    const collection = await dbService.getCollection("gig");
    const gigs = await collection.find(criteria).toArray();
    const sortedGigs = _getSortedGigs(gigs, filterBy.sortBy);
    return sortedGigs;
  } catch (err) {
    logger.error(`erorr while finding gigs`, err);
    throw err;
  }
}

async function getById(gigId) {
  try {
    const collection = await dbService.getCollection("gig");
    const gig = await collection.findOne({ _id: ObjectId(gigId) });
    return gig;
  } catch (err) {
    logger.error(`while finding gig ${gigId}`, err);
    throw err;
  }
}

async function remove(id) {
  try {
    const collection = await dbService.getCollection("gig");
    await collection.deleteOne({ _id: ObjectId(id) });
    return;
  } catch (err) {
    logger.error(`cannot remove gig ${id}`, err);
    throw err;
  }
}

async function update(gig) {
  try {
    gig._id = ObjectId(gig._id);
    const collection = await dbService.getCollection("gig");
    await collection.updateOne({ _id: gig._id }, { $set: { ...gig } });
    return gig;
  } catch (err) {
    logger.error(`cannot update gig ${gig._id}`, err);
    throw err;
  }
}

function _getSortedGigs(gigs, sortBy = "best selling") {
  switch (sortBy) {
    case "title":
      return gigs.sort(function (a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      });
    case "price":
      return gigs.sort(function (a, b) {
        return +a.price - +b.price;
      });
    case "best selling":
      return gigs.sort(function (a, b) {
        return +b.owner.rate - +a.owner.rate;
      });
    default:
      return gigs.sort(function (a, b) { return +b.owner.rate - +a.owner.rate });
  }
}

function _buildCriteria(filterBy) {
  var criteria = {};

  if (filterBy.userId) {
    const _id = filterBy.userId;
    criteria["owner._id"] = _id;
  }

  if (filterBy.category && filterBy.category !== "all") {
    criteria["categories"] = { $in: [filterBy.category.toLowerCase()] };
  }

  if (filterBy.title) {
    criteria["title"] = { $regex: filterBy.title };
  }
  if (filterBy.deliveryTime) {
    criteria["daysToMake"] = { $lte: filterBy.deliveryTime };
  }
  if (filterBy.price) {
    var { price } = filterBy;
    criteria["price"] = { $gte: price.min, $lte: price.max };
  }
  return criteria;
}
