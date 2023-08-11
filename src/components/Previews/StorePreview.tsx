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
    <Link to={props.id + '/items'}>
      <div style={{border: '2px solid ' + props.color}} className={styles['store-preview']}>
        <h3 className={styles.h3}>{props.title}</h3>
      </div>
    </Link>
  )
}

