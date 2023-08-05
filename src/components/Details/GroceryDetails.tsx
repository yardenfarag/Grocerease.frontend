import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useDispatch } from 'react-redux'
import { getProductByBarcode } from '../../store/product'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { Loader } from '../UI/Loader'
import styles from './GroceryDetails.module.scss'
import { Close } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
    onToggleModal: () => void
}

export const GroceryDetails: React.FC<Props> = (props) => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const product = useSelector((state: RootState) => state.product.curProduct)
    const loading = useSelector((state: RootState) => state.product.loading)

    const { barcode, id } = useParams()

    useEffect(() => {
        if (barcode) {
            dispatch(getProductByBarcode(barcode))
        }
    }, [barcode])

    const handleGoBack = () => {
        props.onToggleModal()
        navigate('/store/' + id + '/planner')
    }
    return (
        <>
            <div className={styles.modal}>
                {loading && <div className={styles.loading}><Loader height='50px' width='50px' /></div>}
                {product && <article className={styles['modal-container']}>
                    <header className={styles['modal-container-header']}>
                        <h1 className={styles['modal-container-title']}>{product.product_name}
                            <Close onClick={handleGoBack} className={styles.icon} /></h1></header>
                    <section className={styles['modal-container-body']}>
                        <img className={styles.img} src={product.product_image} alt="" />
                        <h3 className={styles.h3}>{product.product_description}</h3>
                        <p className={styles.p}>{product.manufacturer_name}</p>
                    </section>
                </article>}
            </div>
        </>
    )
}
