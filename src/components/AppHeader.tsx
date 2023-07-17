import React, { useState } from 'react'
import { ItemFilter } from './ItemFilter'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { DarkMode, FormatListNumberedRtl, Inventory, LightMode, Settings } from '@mui/icons-material'
import styles from './AppHeader.module.scss'

interface Props {
    onToggleShoppingListHandler: () => void
}

export const AppHeader: React.FC<Props> = (props) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const store = useSelector((state: RootState) => state.store.curStore)
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleShoppingListHandler = () => {
        props.onToggleShoppingListHandler()
    }
    const getGreeting = (): string => {
        const currentTime: Date = new Date()
        const currentHour: number = currentTime.getHours()

        if (currentHour >= 5 && currentHour < 12) {
            return 'בוקר טוב, '
        } else if (currentHour >= 12 && currentHour < 16) {
            return 'צהריים טובים, '
        } else if (currentHour >= 16 && currentHour < 18) {
            return 'אחר הצהריים טובים, '
        } else if (currentHour >= 18 && currentHour < 21) {
            return 'ערב טוב, '
        } else {
            return 'לילה טוב, '
        }
    }
    const getEmoji = (): string => {
        const currentTime: Date = new Date();
        const currentHour: number = currentTime.getHours();

        if (currentHour >= 5 && currentHour < 12) {
            return '☀️'
        } else if (currentHour >= 12 && currentHour < 16) {
            return '🌞'
        } else if (currentHour >= 16 && currentHour < 18) {
            return '🌅'
        } else if (currentHour >= 18 && currentHour < 21) {
            return '🌇'
        } else {
            return '🌙'
        }
    }

    return (
        <header className={styles['app-header']}>
            <div className={styles['user']}>
                <h1>{getEmoji()}</h1>
                <h2>{getGreeting()}{user?.fullName}</h2>
            </div>
            {/* <ItemFilter /> */}
            <nav>
                <ul className={styles.ul}>
                    {/* <li onClick={toggleDarkMode} className={styles.li}>{isDarkMode ? <DarkMode/> : <LightMode/>}</li> | */}
                    <li className={styles.li} onClick={toggleShoppingListHandler}><Inventory style={{fontSize: '1.2rem'}}/>מצרכים</li>
                    <li className={styles.li} onClick={toggleShoppingListHandler}><FormatListNumberedRtl style={{fontSize: '1.2rem'}}/>רשימת קניות</li>
                    <li className={styles.li} onClick={toggleShoppingListHandler}><Settings style={{fontSize: '1.2rem'}}/>הגדרות</li>
                    {/* <li className={styles.li}><Settings /></li> */}
                </ul>
            </nav>
            <button className={styles.button}>התנתק/י</button>
        </header>
    )
}
