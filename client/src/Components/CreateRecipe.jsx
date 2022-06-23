import React, { useState, useEffect } from "react";
import { Link ,  useNavigate } from "react-router-dom"
import { postRecipe, getDiets } from "../Redux/actions"
import { useDispatch , useSelector } from "react-redux"
import styles from "../Styles/CreateRecipe.module.css"
import defaultPicture from '../assets/ponyo.jpg'

function validate(post){
    let errors = {}
    if (!post.title) errors.title = "Your recipe needs a title!";
    if (!post.summary) errors.summary = "Give a brief explanation of your recipe";
    if (!post.instructions) errors.instructions = "Don´t forget to tell us how you did it"
    
    return errors
}


export default function RecipeCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allDiets = useSelector((state) => state.diets)
    const [errors, setErrors] = useState({})
    const dietList = [
        {id: "ketogenic", name: 'Keto'},
        {id: "vegetarian", name: 'Vegetarian'},
        {id: "lacto vegetarian", name: 'Lacto-Vegetarian'},
        {id: "ovo vegetarian", name: 'Ovo-Vegetarian'},
        {id: "lacto ovo vegetarian", name: 'Lacto-Ovo-Vegetarian'},
        {id: "vegan", name: 'Vegan'},
        {id: "pescetarian", name: 'Pescetarian'},
        {id: "paleolithic", name: 'Paleo'},
        {id: "primal", name: 'Primal'},
        {id: "low fodmap", name: 'Low FODMAP'},
        {id: "whole 30", name: 'Whole30'},
        {id: "dairy free", name: 'Dairy Free'}
    ]

    const [post, setPost] = useState({
        title: "",
        summary: "",
        healthScore: 50,
        instructions: "",
        image: "",
        diets: []  
    })

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch]);

    function handleChange(e){
        e.preventDefault();
        setPost((prevInput) => { // de esta manera el componente muestra los cambios (componentdidupdate?) para poder ir validando
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value
            }
            const validations = validate(newInput);
            setErrors(validations)
               return newInput
        });
    }


    function handleSelect(e){
        setPost({
            ...post,
            diets: [...post.diets, e.target.value]
        })
    }

    function handleDietDelete(deleteThis){
        setPost({
            ...post,
            diets: post.diets.filter(diet => diet !== deleteThis)
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!post.title && !post.summary){
            e.preventDefault()
            return alert("Your recipe needs a title and a summary")
        } else if(!post.diets.length){
            e.preventDefault()
            return alert("You need to add at least one diet for the recipe")
        } else {
            if (!post.image) {
                post.image = defaultPicture
            }
            dispatch(postRecipe(post))
            alert("Recipe sucessfully created!")
            setPost({
                title: "",
                summary: "",
                healthScore: 50,
                instructions: "",
                image: "",
                diets: []
            })
            navigate("/home")
        }
    }


    return(
        <div className={styles.background}>
            <Link to="/home" >
                <button className={styles.button}>Back</button>
            </Link>
            <h1 className={styles.mainTitle}>Add your own recipe</h1>
            <form className={styles.formContainer}>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Recipe title</label>
                    <input className={styles.subInput} type="text" value={post.title} name="title" onChange={(e) => handleChange(e)} ></input>
                    {errors.title && (<p className={styles.error}>{errors.title}</p>)}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Summary</label>
                    <textarea className={styles.subTextBox} type="text" value={post.summary} name="summary" maxLength="1000" onChange={(e) => handleChange(e)}></textarea>
                    {errors.summary && (<p className={styles.error}>{errors.summary}</p>)}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Health score</label>
                    <input className={styles.subInput} type="range" min="0" max="100" value={post.healthScore} name="healthScore" onChange={(e) => handleChange(e)}></input>
                    {<p className={styles.data}>{post.healthScore}</p>}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Step by step</label>
                    <textarea className={styles.subTextBox} type="text" value={post.instructions} name="instructions" onChange={(e) => handleChange(e)}></textarea>
                    {errors.instructions && (<p className={styles.error}>{errors.instructions}</p>)}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Image URL</label>
                    <input className={styles.subInput} type="url" value={post.image} name="image" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className={styles.subContainer}>
                    <select className={styles.select} onChange={(e)=> handleSelect(e)}>
                        <option disabled selected name="diets">Filter by diet type</option>
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
                    <ul className={styles.diets}>
                        <li>                            
                            {post.diets.map(diet => 
                            <div className={styles.selectedDiets}>
                                <p>{dietList.find(element => element.id === diet).name}</p>
                                <button className={styles.crossButton} onClick={() => handleDietDelete(diet)}>x</button>
                            </div>
                            )}
                        </li>
                    </ul>
                </div>
                <button className={styles.submitButton} type="submit" onClick={(e) => handleSubmit(e)}>Create recipe</button>
            </form>
        </div>
    )


}  
