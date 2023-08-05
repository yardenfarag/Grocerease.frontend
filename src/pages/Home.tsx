import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

export const Home = () => {
    return (
        <main className={styles.main}>
            <div className={styles.hero}>
                <img className={styles['hero-img']} src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1689093575/Untitled_design_2_ztbyji.png" alt="hero" />
            </div>
            <div className={styles.content}>
                <img className={styles['logo-img']} src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1689094135/logo-removebg-preview_ybcmb7.png" alt="logo" />
                <img className={styles['title-img']} src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1689094062/logo-white-removebg-preview_perjdr.png" alt="" />
                <h2 className={styles.h2}>לפניך כלי חכם המאפשר מעקב אחר מלאי המצרכים בביתך, הרכבת רשימת קניות והשוואת מחירים.</h2>
                <Link className={styles.button} to='/signup'>אני רוצה להתחיל!</Link>
            </div>
        </main>
        )  
}
