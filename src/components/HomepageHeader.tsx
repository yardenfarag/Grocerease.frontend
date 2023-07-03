import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './HomepageHeader.module.scss'

interface Props {

}

const HomepageHeader: React.FC<Props> = (props) => {

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1683362285/logo-no-background_ralhdn.ico" />
            </div>
            <nav>
                <ul className={styles.ul}>
                    <Link to='/login'><li className={`${styles.li} ${styles['btn-login']}`}>
                        התחברות
                    </li></Link>
                    <li className={`${styles.li} ${styles['btn-signup']}`}>
                        הרשמה
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HomepageHeader