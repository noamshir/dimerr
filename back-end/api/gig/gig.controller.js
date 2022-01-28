const gigService = require("./gig.service");
const logger = require("../../services/logger.service");
async function getGigs(req, res) {
  try {
    var { filterBy } = JSON.parse(req.query.params);
    console.log("FILTERBY IN CONTROLLER", filterBy);
    var gigs = await gigService.query(filterBy);
    res.send(gigs);
  } catch (err) {
    logger.error("Failed to get gigs", err);
    res.status(500).send({ err: "Failed to get gigs" });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  try {
    const gig = await gigService.getById(id);
    res.send(gig);
  } catch (err) {
    logger.error("Failed to get gig", err);
    res.status(500).send({ err: "Failed to get gig" });
  }
}

async function removeGig(req, res) {
  const gigId = req.params.id;
  try {
    await gigService.remove(gigId);
    res.send("removed gig");
  } catch (err) {
    logger.error("Failed to remove gig", err);
    res.status(500).send({ err: "Failed to remove gig" });
  }
}

async function updateGig(req, res) {
  const updatedGig = req.body;
  // console.log(updatedGig)
  try {
    const savedGig = await gigService.update(updatedGig);
    res.send(savedGig);
  } catch (err) {
    logger.error("Failed to update gig", err);
    res.status(500).send({ err: "Failed to update gig" });
  }
}

module.exports = {
  getGigs,
  getById,
  removeGig,
  updateGig,
};
