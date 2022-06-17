const { Router } = require('express');
const { Diet } = require("../db");
const { Op } = require('sequelize');

const router = Router();


router.get("/", async (req,res,next) => {
    try {
        let dietDb = await Diet.findAll()
        res.status(200).send(dietDb)
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;