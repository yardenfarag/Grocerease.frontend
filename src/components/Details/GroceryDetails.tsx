import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { Loader } from '../UI/Loader'
import styles from './GroceryDetails.module.scss'
import { Close } from '@mui/icons-material'

interface Props {
    onToggleModal: () => void
}

export const GroceryDetails: React.FC<Props> = (props) => {
    const { curProduct, loadingProduct } = useSelector((state: RootState) => state.product)

    const listItems = [
        { label: 'מותג', value: curProduct?.product_info.Main_Fields.BrandName },
        { label: 'תכולה', value: curProduct?.product_info.Main_Fields.Net_Content.text },
        { label: 'יצרן', value: curProduct?.product_info.General_Information.Manufacturer_Name },
        { label: 'מרכיבים', value: curProduct?.product_info.Product_Components_and_Instructions_General.Ingredient_Sequence_and_Name },
        { label: 'אלרגנים', value: curProduct?.product_info.Product_Components_and_Instructions_General.Allergen_Type_Code_and_Containment[0].value },
        { label: 'עלול להכיל', value: curProduct?.product_info.Product_Components_and_Instructions_General.Allergen_Type_Code_and_Containment_May_Contain[0].value },
        { label: 'כשרות', value: curProduct?.product_info.Kashrut.Rabbinate[0].value },
    ]

    const closeModal = () => {
        props.onToggleModal()
    }

    return (
        <>
            <main className={styles.main}>
                {loadingProduct && <div className={styles.loading}><Loader height='100px' width='100px' /></div>}
                {!loadingProduct && !curProduct && <h1 className={styles.loading}>בחר מוצר להצגה</h1>}
                {curProduct && <article className={styles.container}>
                    <header className={styles.header}>
                        <h1 className={styles.h1}>{curProduct.product_info.Main_Fields.Trade_Item_Description}</h1>
                        <Close onClick={closeModal} className={styles.icon} />
                    </header>
                    <hr className={styles.hr} />
                    <img className={styles.img} src={curProduct.imgUrl} alt="" />
                    <ul className={styles.ul}>
                        {listItems.map((item, index) => (
                            item.value && <li className={styles.li} key={index}>
                                {item.label} <span className={styles.span}>{item.value}</span>
                            </li>
                        ))}
                    </ul>
                </article>}
            </main>
        </>
    )
}
