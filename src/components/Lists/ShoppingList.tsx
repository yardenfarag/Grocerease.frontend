import React from 'react'
import { Grocery } from '../../models/grocery'
import { GroceryPreview } from '../Previews/GroceryPreview'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Store } from '../../models/store'
import styles from './ShoppingList.module.scss'
import { AddItemToShoppingList } from '../Forms/AddItemToShoppingList'
import { storeActions } from '../../store/store'
import { Toast } from '../UI/Toast'
import { toast } from 'react-hot-toast'

interface Props {
    onOpenProductModal: () => void
    onSetSuggestionsCoords: (top?:number, left?:number) => void
}

export const ShoppingList: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const store: Store | null = useSelector((state: RootState) => state.store.curStore)

    const openProductModal = () => {
        props.onOpenProductModal()
    }

    const addItemsToStoreHandler = () => {
        for (const grocery of store?.shoppingList!) {
            dispatch(storeActions.addItem(grocery))
            dispatch(storeActions.deleteGroceryFromShoppingList(grocery.barcode))
        }
        toast.success('הפריטים הועברו למלאי בהצלחה!')
    }

    
    return (
        <main className={styles.main}>
            <Toast />
            <div className={styles.container}>
                <h1 className={styles.h1}>רשימת קניות</h1>
                <AddItemToShoppingList />
                <ul className={styles.ul}>
                    {store && store.shoppingList?.map((item: Grocery) => <GroceryPreview onOpenProductModal={openProductModal} key={item.barcode} item={item} />)}
                    {store && !store.shoppingList.length && <div className={styles.empty}>
                        <h1>אין מידע להצגה</h1>
                    </div>}
                </ul>
                <button onClick={addItemsToStoreHandler} className={styles.button}>העברה למלאי</button>
            </div>
        </main>
    )
}
