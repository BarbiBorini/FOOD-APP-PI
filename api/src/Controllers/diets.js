const { Diet } = require("../db")
const axios = require("axios")
require('dotenv').config()
const { API_KEY } = process.env;

const preLoadDiets = async() => {
    try {
        const apiInfo = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
        const apiDiets = apiInfo.data?.results.map(element => element.diets)
        const repeatedDiets = apiDiets.flat()
        const finalListOfDiets = [...new Set(repeatedDiets)] 
        
        const diets = finalListOfDiets.map(name => ({ name }));
        await Diet.bulkCreate(diets)
    } catch(err) {
        console.error(err)
    }
} 

module.exports = {
    preLoadDiets
}