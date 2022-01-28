const express = require ('express');
const { getCategories } = require('./categories.controller');
const router = express.Router()

router.get("/",getCategories)

module.exports =router;