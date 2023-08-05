import { Kitchen, ListAlt, Logout, Menu } from '@mui/icons-material'
import React, { useState } from 'react'
import styles from './SideNav.module.scss'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'

interface MenuItem {
    path: string
    name: string
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
}

export const SideNav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const logout = () => {
        dispatch(authActions.logout())
        navigate('/')
    }

    const menuItems = [
        {
            path: '/store/' + id,
            name: 'המצרכים שלי',
            icon: <Kitchen />
        },
        {
            path: `/store/${id}/planner`,
            name: 'רשימת קניות',
            icon: <ListAlt />
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
                        <NavLink onClick={toggleMenu} to={item.path} key={index} className={`${styles.link} ${window.location.href.slice(23) === item.path ? styles['active'] : ''}`}>
                            <div className={styles.icon}>{item.icon}</div>
                            <div style={{ display: isMenuOpen ? 'block' : 'none' }} className={styles['link-text']}>{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className={styles['button-container']}>
                    {isMenuOpen && <button onClick={logout} className={styles.button}><Logout/></button>}
                </div>
            </div>
        </div>
    )
}
