import React, { useState } from 'react'
import { ItemPreview } from './ItemPreview'
import { Item } from '../models/item'
import { useSelector } from 'react-redux'
import styles from './ItemTable.module.scss'
import { RootState } from '../store'
import { ItemTr } from './ItemTr'
import { Add, ImportExport, Remove } from '@mui/icons-material'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, ColumnSort, getFilteredRowModel } from '@tanstack/react-table'
import { storeActions } from '../store/store'
import { useDispatch } from 'react-redux'
import { ItemFilter } from './ItemFilter'

interface Props {
    items: Item[]
}

export const ItemTable: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    let itemsView = useSelector((state: RootState) => state.settings.view)
    let filterBy: { txt: string } = useSelector((state: RootState) => state.store.filterBy)
    const [sorting, setSorting] = useState<ColumnSort[]>([])
    const [filtering, setFiltering] = useState('')

    const data = props.items

    const handleQuantityChange = (itemId: string, increment: boolean) => {
        const itemToUpdate = props.items.find((item) => item.id === itemId)
        if (itemToUpdate) {
            const updatedQuantity = increment ? itemToUpdate.quantity + 1 : itemToUpdate.quantity - 1
            const updatedItem = { ...itemToUpdate, quantity: updatedQuantity }
            dispatch(storeActions.updateItem(updatedItem))
        }
    }

    const columns: ColumnDef<Item>[] = [
        {
            header: 'שם',
            accessorKey: 'title',
        },
        {
            header: 'מיקום',
            accessorKey: 'place',
        },
        {
            header: 'כמות',
            accessorKey: 'quantity',
        },
        {
            header: 'ת.תפוגה',
            accessorKey: 'expiry',
        },
        {
            header: 'פעולות',
            accessorKey: 'actions'
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: (value) => setSorting(value),
        onGlobalFilterChange: (value) => setFiltering(value),
    })

    const filteredItems = !filterBy.txt
        ? props.items
        : props.items?.filter(
            (item: Item) => item.title.includes(filterBy.txt) || item.place?.includes(filterBy.txt)
        )

    return (
        <div className={styles.wrapper}>
            <ItemFilter />
            <table className={styles.table}>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr className={styles.thead} key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <th onClick={header.column.getToggleSortingHandler} key={header.id}>
                                {header.isPlaceholder ? null : (
                                    <div className={styles.th}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                        {/* {header.column.getIsSorted() === 'asc' ? '🔽' : '🔼'} */}
                                    </div>
                                )}
                            </th>
                        ))}
                    </tr>
                ))}

                <tbody className={styles.tbody}>
                    {filteredItems.map((item: Item) => (
                        <ItemTr key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
