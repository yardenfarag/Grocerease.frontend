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
import { Product } from '../../models/product';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

interface Props {
  onOpenProductModal: () => void
}

export const ProductList: React.FC<Props> = (props) => {
  const dispatch: AppDispatch = useDispatch()
  const { id } = useParams()
  const products = useSelector((state: RootState) => state.product.products)
  const loading = useSelector((state: RootState) => state.product.loading)
  const filterBy = useSelector((state: RootState) => state.product.filterBy)
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
      dispatch(getProducts({ txt: filterBy.txt, page: newPage }))
      return newPage
    })
  }

  const nextHandler = () => {
    setPage((prevPage) => {
      if (prevPage === pageCount) return prevPage
      const newPage = prevPage + 1      
      dispatch(getProducts({ txt: filterBy.txt, page: newPage }))
      return newPage
    })
  }

  const setPageHandler = (pageNumber: number) => {
    setPage(pageNumber)
    dispatch(getProducts({ txt: filterBy.txt, page: pageNumber }))
  }

  const openProductModalHandler = () => {
    props.onOpenProductModal()
  }

  function generatePageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
    const delta = 2
    const range: (number | 'ellipsis')[] = []
    let lastPage = 1

    range.push(lastPage)

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > lastPage && i < totalPages) {
        if (i - lastPage > 1) {
          range.push('ellipsis')
        }
        range.push(i)
        lastPage = i
      }
    }

    if (lastPage !== totalPages) {
      if (totalPages - lastPage > 1) {
        range.push('ellipsis')
      }
      range.push(totalPages)
    }

    return range
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
          {sortedProducts && sortedProducts.map(product => <ProductPreview onOpenProductModal={openProductModalHandler} key={product._id} product={product} />)}
        </ul>
        <footer className={styles.footer}>
          <button className={styles.button} disabled={page === 1} onClick={previousHandler}><ArrowForward /></button>
          {generatePageNumbers(page, pageCount).map((item, index) => (
            <React.Fragment key={index}>
              {item === 'ellipsis' ? (
                <span className={styles.ellipsis}>...</span>
              ) : (
                <span
                  onClick={() => setPageHandler(item)}
                  className={`${styles.span} ${item === page ? styles.selected : ''}`}
                >
                  {item}
                </span>
              )}
            </React.Fragment>
          ))}
          <button className={styles.button} disabled={page === pageCount} onClick={nextHandler}><ArrowBack /></button>
        </footer>
      </div>
    </>
  )
}
