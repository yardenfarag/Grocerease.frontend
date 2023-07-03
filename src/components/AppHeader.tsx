import React, { useState } from 'react'
import { ItemFilter } from './ItemFilter'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { DarkMode, FormatListNumberedRtl, LightMode, Settings } from '@mui/icons-material'
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
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }
    return (
        <header className={styles['app-header']}>
            <div className={styles['user-avatar']}>
                <div style={{ backgroundColor: store?.color }} className={styles['user-letter']}>{user?.fullName && user.fullName[0].toLocaleUpperCase()}</div>
            </div>
            <ItemFilter />
            <nav>
                <ul className={styles.ul}>
                    {/* <li onClick={toggleDarkMode} className={styles.li}>{isDarkMode ? <DarkMode/> : <LightMode/>}</li> | */}
                    <li className={styles.li} onClick={toggleShoppingListHandler}><FormatListNumberedRtl /></li>
                    {/* <li className={styles.li}><Settings /></li> */}
                </ul>
            </nav>
        </header>
    )
}
