import React from 'react'
import { Grocery } from '../../models/grocery'
import { GroceryPreview } from '../Previews/GroceryPreview'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Store } from '../../models/store'
import styles from './ShoppingList.module.scss'
import { AddItemToShoppingList } from '../Forms/AddItemToShoppingList'

interface Props {
    onOpenProductModal: () => void
}

export const ShoppingList: React.FC<Props> = (props) => {
    const store: Store | null = useSelector((state: RootState) => state.store.curStore)

    const openProductModal = () => {
        props.onOpenProductModal()
    }
    return (
        <main className={styles.main}>
            {/* <SideNav/> */}
            <div className={styles.container}>
                <h1>רשימת קניות</h1>
                <AddItemToShoppingList />
                <ul className={styles.ul}>
                    {store && store.shoppingList?.map((item: Grocery) => <GroceryPreview onOpenProductModal={openProductModal} key={item.barcode} item={item} />)}
                </ul>
            </div>
        </main>
    )
}
