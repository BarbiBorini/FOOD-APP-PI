import React from "react";
import {Link} from "react-router-dom";
import styles from "../Styles/LandingPage.module.css";
import ponyo from '../assets/ponyo-eating.jpg';

export default function LandingPage(){
    return (
        <div className={styles.container}>
            <div className={styles.seconContainer}> 
                <h2>welcome to</h2>
                <h1>CALCIFER's recipe app</h1>
                <Link to ="/home">
                    <button className={styles.button}>Home</button>
                </Link>
            </div>
            <img className="image" src={ponyo} alt="Ponyo"/>
        </div>
    )
}