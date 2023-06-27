import React from 'react'
import { ItemFilter } from './ItemFilter'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { FormatListNumberedRtl , Settings } from '@mui/icons-material'

interface Props {
    onToggleShoppingListHandler: () => void
}

export const AppHeader: React.FC<Props> = (props) => {
    const user = useSelector((state: RootState) => state.auth.user)
    const store = useSelector((state: RootState) => state.store.curStore)

    const toggleShoppingListHandler = () => {
        props.onToggleShoppingListHandler()
    }
    return (
        <header className='app-header'>
            <div className='flex flex-column between items-center'>
                <div className="user-avatar">
                    <div style={{ width: '30px', backgroundColor: store?.color }} className="user-letter">{user?.fullName && user.fullName[0].toLocaleUpperCase()}</div>
                </div>
                <ItemFilter />
                <nav>
                    <ul className='clean-list flex'>
                        <li onClick={toggleShoppingListHandler}><FormatListNumberedRtl/></li> |
                        <li><Settings/></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
