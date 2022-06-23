const { Router } = require('express');
const router = Router()
const { getAllRecipes, searchById } = require("../Controllers/recipes");
const { Recipe } = require("../db");

router.get("/", async (req,res,next) =>{ 
    try {
        const { name }= req.query
        const allRecipes = await getAllRecipes()
        if(name){
             let recipe = allRecipes.filter(recipe => recipe.title.toLowerCase().includes(name.toString().toLowerCase()))
            if(recipe.length){
                res.status(200).send(recipe)
            } else {
                res.status(404).send("Recipe doesn´t exist")  
            }
        } else {
            res.status(200).send(allRecipes)
        }

    } catch (error) {
        next(error)
    }

})

router.get("/:idRecipe", async(req,res,next) => {
    try {
        const id = req.params.idRecipe
        const detailById = await searchById(id)
        if (!detailById){ 
            return res.status(404).send("Recipe by Id doesn´t exist")
        }
        res.status(200).send(detailById)

    } catch (error) {
        next(error)        
    }
})


router.post("/create", async (req,res,next) => {
    try {
        const {title, summary, healthScore, instructions, image, diets} = req.body

        const recipeCreate = await Recipe.create({
            title,
            summary,
            healthScore,
            instructions,
            image
        })

        const proms = diets.map(diet => recipeCreate.addDiet(diet));
        await Promise.all(proms)

        res.status(200).send({ msg: "Recipe successfully created" })

    } catch (error) {
        next(error)
    }
})

module.exports = router;