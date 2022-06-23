import axios from "axios"
import { GET_RECIPES, GET_DIETS_TYPES, FILTERED_BY_DIETS, ORDER_BY_TITLE, ORDER_BY_SCORE, GET_DETAIL, SEARCH_RECIPE } from './types';

export function getRecipes(){
    return function(dispatch){
             axios.get("http://localhost:3001/recipes")
            .then(response => {
                return dispatch({
                    type: GET_RECIPES,
                    payload: response.data
                })
    })
}}

export function getDiets(){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: GET_DIETS_TYPES,
                payload: json.data.map(d => d.name)
            })
        } catch (error) {
            console.log(error)
        }
    }
}




export function filteredByDiet(payload){ 
    return {
        type: FILTERED_BY_DIETS,
        payload
    }
}

export function orderByTitle(payload){
    return {
        type: ORDER_BY_TITLE,
        payload
    }
}

export function orderByScore(payload){
    return {
        type: ORDER_BY_SCORE,
        payload
    }
}


export function getDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes/${id}`)
            return dispatch({
                type: GET_DETAIL,
                payload: json.data
            })
        } catch (error) {
            console.log(error)    
        }
    }
}

export function searchRecipe(name){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch({
                type: SEARCH_RECIPE,
                payload: json.data
            })  
        } catch (error) {
            console.log(error)
        }
    }
}

export function postRecipe(payload){
    return async function(dispatch){
        try {
            var json = await axios.post(`http://localhost:3001/recipes/create`, payload)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

