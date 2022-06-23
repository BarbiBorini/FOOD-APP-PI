const { Router } = require('express');
const router = Router()
const { Diet } = require("../db")
const { preLoadDiets } = require('../Controllers/diets')

router.get("/", async (req,res,next) => {
    try {
        preLoadDiets.forEach(e => {
            Diet.findOrCreate({
                where: { name: e}
            })
        });
        const dietDb = await Diet.findAll()
        res.status(200).send(dietDb)
        
    } catch (error) {
        next(error)
    }
})

module.exports = router;
