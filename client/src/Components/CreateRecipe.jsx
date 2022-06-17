import React, { useState, useEffect } from "react";
import { Link ,  useNavigate } from "react-router-dom"
import { postRecipe } from "../Redux/actions"
import { useDispatch , useSelector } from "react-redux"
import styles from "../Styles/CreateRecipe.module.css"

function validate(post){
    let errors = {}
    if (!post.title){
        errors.title = "Your recipe needs a title!"
    } else if (!post.summary){
        errors.summary = "Give a brief explanation of your recipe"
    } else if (!post.instructions){
        errors.instructions = "Don´t forget to tell us how you did it"
    }
    return errors
}

    
export default function RecipeCreate(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const allDiets = useSelector((state) => state.diets)
   
    const [errors, setErrors] = useState({})

    const [post, setPost] = useState({
        title: "",
        summary: "",
        spoonacularScore: 50,
        healthScore: 50,
        instructions: "",
        image: "",
        diets: []  
    })

    function handleChange(e){
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        setPost({
            ...post,
            diets: [...post.diets, e.target.value]
        })
    //    console.log(post)
    }

    function handleDietDelete(deleteThis){
        setPost({
            ...post,
            diets: post.diets.filter(diet => diet !== deleteThis)
        })
    }

    function handleSubmit(e){
        if(!post.title && !post.summary){
            e.preventDefault()
            return alert("La receta necesita un título y un resumen")
        } else if(!post.diets.length){
            e.preventDefault()
            return alert("Necesitas agregar al menos una dieta para la receta")
        } else {
            if (!post.image) {
                post.image = "https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466_960_720.jpg"
            }
            dispatch(postRecipe(post))
            alert("Recipe sucessfully created!")
            setPost({
                title: "",
                summary: "",
                spoonacularScore: 50,
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
                <button className={styles.button}>Inicio</button>
            </Link>
            <h1 className={styles.mainTitle}>Crea tu propia Receta</h1>
            <form className={styles.formContainer}>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Título</label>
                    <input className={styles.subInput} type="text" value={post.title} name="title" onChange={(e) => handleChange(e)} ></input>
                    {errors.title && (<p className={styles.error}>{errors.title}</p>)}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Resumen</label>
                    <textarea className={styles.subTextBox} type="text" value={post.summary} name="summary" maxLength="1000" onChange={(e) => handleChange(e)}></textarea>
                    {errors.summary && (<p className={styles.error}>{errors.summary}</p>)}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Puntuación en API Spoonacular</label>
                    <input className={styles.subInput} type="range" min="0" max="100" value={post.spoonacularScore} name="spoonacularScore" onChange={(e) => handleChange(e)}></input>
                    {<p className={styles.data}>{post.spoonacularScore}</p>}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Puntuación Salud</label>
                    <input className={styles.subInput} type="range" min="0" max="100" value={post.healthScore} name="healthScore" onChange={(e) => handleChange(e)}></input>
                    {<p className={styles.data}>{post.healthScore}</p>}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Instrucciones</label>
                    <textarea className={styles.subTextBox} type="text" value={post.instructions} name="instructions" onChange={(e) => handleChange(e)}></textarea>
                    {errors.instructions && (<p className={styles.error}>{errors.instructions}</p>)}
                </div>
                <div className={styles.subContainer}>
                    <label className={styles.subTitle}>Imagen URL</label>
                    <input className={styles.subInput} type="url" value={post.image} name="image" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className={styles.subContainer}>
                    <select className={styles.select} onChange={(e)=> handleSelect(e)}>
                        <option value="" hidden name="diets" >Seleccione Dietas</option>
                            {allDiets?.map(diet => {
                            return ( <option value={diet.id} key={diet.id}>{diet.name}</option>)
                            })
                            } 
                    </select>
                    <ul className={styles.diets}>
                        <li>                            
                            {post.diets.map(diet => 
                            <div className={styles.selectedDiets}>
                                <p>{allDiets?.find(element => element.id === diet)?.name}</p>
                                <button className={styles.crossButton} onClick={() => handleDietDelete(diet)}>x</button>
                            </div>
                            )}
                        </li>
                    </ul>
                </div>
                <button className={styles.submitButton} type="submit" onClick={(e) => handleSubmit(e)}>Crear Receta</button>
            </form>
        </div>
    )


}