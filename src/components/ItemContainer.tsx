import React from 'react'
import styles from './ItemContainer.module.scss'
import { AddItemForm } from './AddItemForm'
import { Item } from '../models/item'
import { ItemList } from './ItemList'

interface Props {
  items?: Item[]
}

export const ItemContainer: React.FC<Props> = (props) => {
  return (
    <div className={styles['item-container']}>
      <ItemList items={props.items}/>
      <AddItemForm/>
    </div>
  )
}
