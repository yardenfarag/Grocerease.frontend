import React from 'react'
import { Link } from 'react-router-dom'
import { ItemFilter } from './ItemFilter'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

interface Props {
    onToggleShoppingListHandler: () => void
}

export const AppHeader: React.FC<Props> = (props) => {
    const user = useSelector((state: RootState) => state.user.loggedInUser)
    const store = useSelector((state: RootState) =>state.store.curStore)
    // const changeLngHandler = (ev: any) => {
    //     props.onChangeLng(ev.target.value)
    // }
    const toggleShoppingListHandler = () => {
        props.onToggleShoppingListHandler()
    }
    return (
        <header className='app-header'>
            <div className='flex flex-column between items-center'>
                <div className="user-avatar">
                    <div style={{width: '30px', backgroundColor: store?.color}} className="user-letter">{user.fullName[0]}</div>
                </div>
                {/* <div className="logo">
                    <img className='logo-img' src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1680119258/Group_1_nhbrcc.svg" alt="logo" />
                </div> */}
                <ItemFilter />
                <nav>
                    <ul className='clean-list flex'>
                        {/* <select onChange={changeLngHandler}>
                            <option value="he">Hebrew</option>
                            <option value="en">English</option>
                        </select> */}
                        {/* <li>⚙️</li> */}
                        {/* <li><Link to="/stock">Stock</Link></li> */}
                    <li onClick={toggleShoppingListHandler}>רשימת קניות</li> |
                    <li>הגדרות</li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
