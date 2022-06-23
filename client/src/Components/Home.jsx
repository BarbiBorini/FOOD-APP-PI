import React from "react";
import { useState, useEffect } from "react";
import { useDispatch , useSelector } from "react-redux"
import { getRecipes, getDetail, getDiets , filteredByDiet, orderByTitle, orderByScore} from "../Redux/actions";
import { Link } from "react-router-dom"
import Card from "./SingleCard";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import styles from "../Styles/Home.module.css"
import logo from "../../src/assets/calcifer.png";

export default function Home(){
    
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.allRecipes)
    const allDiets = useSelector((state) => state.diets)
    
    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])
    
    useEffect(() => {
        dispatch(getDiets())
    },[dispatch])

    // Paginado
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    const [order, setOrder] = useState("")
    // const [score, setScore] = useState("")

    function handleFilteredDiet(e){
        dispatch(filteredByDiet(e.target.value))
        setCurrentPage(1)
        e.preventDefault()
    }

    function handleSortedRecipesTitle(e){
        dispatch(orderByTitle(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
        e.preventDefault()
    }

    function handleSortedRecipesScore(e){
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`)
        e.preventDefault()
    }


    return (
        <div className={styles.background}>
            <div className={styles.firstContainer}>
                <Link to="/"><img src={logo} className={styles.image}/></Link>
                <Link to="/create">
                    <button className={styles.button}>Create recipe</button>
                </Link>
            </div>
            <div className={styles.secondContainer}>
                <select className={styles.selectBarAlph} onChange={(e) => handleSortedRecipesTitle(e)}>
                    <option disabled selected>Alphabetical order</option>
                    <option value="Asc">A to Z</option>
                    <option value="Desc">Z to A</option>
                </select>

               {/* original */}
                <select className={styles.selectBar} name="numerical" onChange={(e) => handleSortedRecipesScore(e)}>
                <option disabled selected>Order by  Health Score</option>
                    <option value="HealthMax">From Min to Max</option>
                    <option value="HealthMin">From Max to Min</option>
                </select>
                {/* nueva */}
                {/* <select className={styles.selectBar} name="numerical" onChange={e => handleSortedRecipesSpoonScore(e)}>
                    <option disabled selected>Order by score</option>
                    <option value="asc">From Min to Max</option>
                    <option value="desc">From Max to Min</option>
                </select> */}
                <select className={styles.selectBar} onChange={e => handleFilteredDiet(e)}>
                    <option disabled selected>Filter by diet type</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Keto</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto-Vegetarian</option>
                    <option value="ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleolithic">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                    <option value="dairy free">Dairy Free</option>
                </select>
                <SearchBar></SearchBar>
            </div>
            <div className={styles.paginadoContainer}>
                <Paginado recipesPerPage={recipesPerPage} allRecipes={allRecipes.length} paginado={paginado}></Paginado>
            </div>
            <div className={styles.recipeContainer}>
                {currentRecipes?.map(recipe => {
                    return (
                        <Link className={styles.link} to={`/recipe/${recipe.id}`}>
                        <Card image={recipe.image} title={recipe.title} diets={recipe.diets.map(r => <p className={styles.diet} >{r.name}</p>)} key={recipe.id} ></Card>
                        </Link>
                        )
                    })
                }
            </div>     
        </div>
    )
}