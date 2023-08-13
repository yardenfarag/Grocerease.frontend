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
    const product = useSelector((state: RootState) => state.product.curProduct)
    const loading = useSelector((state: RootState) => state.product.loading)

    const closeModal = () => {
        props.onToggleModal()
    }

    return (
        <>
            <main className={styles.main}>
                {loading && <div className={styles.loading}><Loader height='50px' width='50px' /></div>}
                {!loading && !product && <h1 className={styles.loading}>בחר מוצר להצגה</h1>}
                {product && <article className={styles.container}>
                    <header className={styles.header}>
                        <h1 className={styles.h1}>{product.product_info.Main_Fields.Trade_Item_Description}</h1>
                        <Close onClick={closeModal} className={styles.icon} />
                    </header>
                    <hr className={styles.hr}/>
                    <img className={styles.img} src={product.imgUrl} alt="" />
                    <ul className={styles.ul}>
                        {product.product_info.Main_Fields.BrandName && <li className={styles.li}>מותג <span className={styles.span}>{product.product_info.Main_Fields.BrandName}</span></li>}
                        {product.product_info.Main_Fields.Country_of_Origin[0].value && <li className={styles.li}>ארץ ייצור <span className={styles.span}>{product.product_info.Main_Fields.Country_of_Origin[0].value}</span></li>}
                        {product.product_info.General_Information.Manufacturer_Name && <li className={styles.li}>יצרן <span className={styles.span}>{product.product_info.General_Information.Manufacturer_Name}</span></li>}
                        {product.product_info.Product_Components_and_Instructions_General.Ingredient_Sequence_and_Name && <li className={styles.li}>מרכיבים <span className={styles.span}>{product.product_info.Product_Components_and_Instructions_General.Ingredient_Sequence_and_Name}</span></li>}
                        {product.product_info.Product_Components_and_Instructions_General.Allergen_Type_Code_and_Containment[0].value && <li className={styles.li}>אלרגנים <span className={styles.span}>{product.product_info.Product_Components_and_Instructions_General.Allergen_Type_Code_and_Containment[0].value}</span></li>}
                        {product.product_info.Product_Components_and_Instructions_General.Allergen_Type_Code_and_Containment_May_Contain[0].value && <li className={styles.li}>עלול להכיל <span className={styles.span}>{product.product_info.Product_Components_and_Instructions_General.Allergen_Type_Code_and_Containment_May_Contain[0].value}</span></li>}
                        {product.product_info.Kashrut.Rabbinate[0].value && <li className={styles.li}>כשרות <span className={styles.span}>{product.product_info.Kashrut.Rabbinate[0].value}</span></li>}
                    </ul>

                </article>}
            </main>
        </>
    )
}
