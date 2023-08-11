import React, { useEffect, useState } from 'react'
import { ProductPreview } from '../Previews/ProductPreview'
import styles from './ProductList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getProducts } from '../../store/product';
import { useParams } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { ProductFilter } from '../Forms/ProductFilter';
import { Loader } from '../UI/Loader';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {

}

export const ProductList: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch()
  const { id } = useParams()
  const products = useSelector((state: RootState) => state.product.products)
  const loading = useSelector((state: RootState) => state.product.loading)
  const count = useSelector((state: RootState) => state.product.count)
  const pageCount = useSelector((state: RootState) => state.product.pageCount)
  const [page, setPage] = useState(1)

  let sortedProducts = products ? [...products].sort((a, b) => a.product_name.localeCompare(b.product_name)) : []

  useEffect(() => {
    if (id) {
      dispatch(getProducts({ txt: '', page }))
    }

    return () => {
      dispatch(getProducts({ txt: '&' }))
    };
  }, [id, dispatch])

  const previousHandler = () => {
    setPage((prevPage) => {
      if (prevPage === 1) return prevPage
      const newPage = prevPage - 1
      dispatch(getProducts({ txt: '', page: newPage }))
      return newPage
    })
  }

  const nextHandler = () => {
    setPage((prevPage) => {
      if (prevPage === pageCount) return prevPage
      const newPage = prevPage + 1
      dispatch(getProducts({ txt: '', page: newPage }))
      return newPage
    })
  }

  const setPageHandler = (pageNumber: number) => {
    setPage(pageNumber)
    dispatch(getProducts({ txt: '', page: pageNumber }))
  }


  return (
    <>
      <div className={styles['product-list']}>
        <ProductFilter />
        {loading &&
          <div className={styles.loading}>
            <Loader height='80px' width='80px' />
          </div>}
        <ul className={styles.ul}>
          {sortedProducts && sortedProducts.map(product => <ProductPreview key={product._id} product={product} />)}
        </ul>
        <footer className={styles.footer}>
          <button className={styles.button} disabled={page === 1} onClick={previousHandler}><ArrowForward /></button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber: number) => <span onClick={() => setPageHandler(pageNumber)} className={`${styles.span} ${pageNumber === page ? styles.selected: ''}`} key={pageNumber}>{pageNumber}</span>)}
          <button className={styles.button} disabled={page === pageCount} onClick={nextHandler}><ArrowBack /></button>
        </footer>
      </div>
    </>
  )
}
