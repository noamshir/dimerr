const express = require('express');
const { getGigs, getById, removeGig, updateGig } = require('./gig.controller');
const router = express.Router()

router.get("/", getGigs)
router.get("/:id", getById);
router.delete("/:id", removeGig)
router.put("/:id", updateGig)

module.exports = router;