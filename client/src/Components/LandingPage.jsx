import React from "react";
import {Link} from "react-router-dom"
import styles from "../Styles/LandingPage.module.css"

export default function LandingPage(){
    return (
        <div className={styles.background}>
            <div> 
                <h1 className={styles.apiTitle}>Bienvenidos</h1>
                <Link to ="/home">
                    <button className={styles.button}>A saborear!!</button>
                </Link>
            </div>
        </div>
    )
}