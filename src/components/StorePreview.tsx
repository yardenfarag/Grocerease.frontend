import React from 'react'
import {Link} from 'react-router-dom'
import styles from './StorePreview.module.scss'

interface Props {
  id: string
  color: string
  title: string
}

export const StorePreview: React.FC<Props> = (props) => {
  return (
    <Link to={props.id} className={styles['store-preview']}>
      <div style={{backgroundColor: props.color}} className={styles['store-back']}></div>
      <div className={styles['store-front']}></div>
        <h3 className={styles['store-front']}>{props.title}</h3>
    </Link>
  )
}

