import { Category, DarkMode, Kitchen, LightMode, ListAlt, Logout, Menu } from '@mui/icons-material'
import React, { useState } from 'react'
import styles from './SideNav.module.scss'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/auth'
import { RootState } from '../../store'
import { settingsActions } from '../../store/settings'

export const SideNav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isDarkMode = useSelector((state:RootState) => state.settings.isDarkMode)
    const { id } = useParams()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const logoutHandler = () => {
        dispatch(authActions.logout())
        navigate('/')
    }

    const toggleThemeHandler = () => {
        dispatch(settingsActions.toggleTheme())
    }

    const menuItems = [
        {
            path: `/store/${id}/items`,
            name: 'המצרכים שלי',
            icon: <Kitchen />
        },
        {
            path: `/store/${id}/planner`,
            name: 'רשימת קניות',
            icon: <ListAlt />
        },
        {
            path: `/store/${id}/products`,
            name: 'מוצרים',
            icon: <Category />
        }
    ]

    return (
        <div className={styles.container}>
            <div style={{ width: isMenuOpen ? '180px' : '50px'}} className={styles.sidenav}>
                <div className={styles['top-section']}>
                    <div className={styles.bars}>
                        <Menu onClick={toggleMenu} />
                    </div>
                </div>
                {
                    menuItems.map((item, index) => (
                        <NavLink 
                        title={item.name} 
                        onClick={toggleMenu} 
                        to={item.path} 
                        key={index} 
                        className={({ isActive, isPending}) => isPending ? styles.link : isActive ? `${styles.link} ${styles.active}` : styles.link}
                        >
                            <div className={styles.icon}>{item.icon}</div>
                            <div style={{ display: isMenuOpen ? 'block' : 'none' }} className={styles['link-text']}>{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className={styles['button-container']}>
                    {isMenuOpen && <button onClick={logoutHandler} className={styles.button}><Logout/></button>}
                    {isMenuOpen && <button onClick={toggleThemeHandler} className={styles.button}>{ isDarkMode ? <LightMode/> : <DarkMode/> }</button>}
                </div>
            </div>
        </div>
    )
}
