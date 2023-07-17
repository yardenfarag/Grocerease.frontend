import { FormatListNumberedRtl, Info, Inventory, Menu, Settings } from '@mui/icons-material'
import React, { useState } from 'react'
import styles from './SideNav.module.scss'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import { SvgIconTypeMap } from '@mui/material'
import { NavLink, useParams } from 'react-router-dom'

interface MenuItem {
    path: string
    name: string
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
}

export const SideNav = () => {
    const { id } = useParams()
    const url = location.pathname.split('/')[3]
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const menuItems = [
        {
            path: '/store/' + id,
            name: 'מצרכים',
            icon: <Inventory />
        },
        {
            path: `/store/${id}/planner`,
            name: 'רשימת קניות',
            icon: <FormatListNumberedRtl />
        },
        {
            path: `/store/${id}/info`,
            name: 'מידע',
            icon: <Info />
        }
    ]
    return (
        <div className={styles.container}>
            <div style={{ width: isMenuOpen ? '160px' : '50px', padding: isMenuOpen ? '0px' : '0px' }} className={styles.sidenav}>
                <div className={styles['top-section']}>
                    <div className={styles.bars}>
                        <Menu onClick={toggleMenu} />
                    </div>
                </div>
                {
                    menuItems.map((item, index) => (
                        <NavLink to={item.path} key={index} className={`${styles.link} ${window.location.href.slice(23) === item.path ? styles['active'] : ''}`}>
                            <div className={styles.icon}>{item.icon}</div>
                            <div style={{ display: isMenuOpen ? 'block' : 'none' }} className={styles['link-text']}>{item.name}</div>
                        </NavLink>
                    ))
                }
                <div className={styles['button-container']}>
                    {isMenuOpen && <button className={styles.button}>התנתק/י</button>}
                </div>
            </div>
        </div>
    )
}
