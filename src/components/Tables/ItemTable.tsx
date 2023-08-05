import React, { useState } from 'react'
import { Item } from '../../models/item'
import { useSelector } from 'react-redux'
import styles from './ItemTable.module.scss'
import { RootState } from '../../store'
import { ItemTr } from './ItemTr'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, ColumnSort, getFilteredRowModel } from '@tanstack/react-table'
import { ItemFilter } from '../Forms/ItemFilter'

interface Props {
    items: Item[]
}

export const ItemTable: React.FC<Props> = (props) => {
    let itemsView = useSelector((state: RootState) => state.settings.view)
    let filterBy: { txt: string } = useSelector((state: RootState) => state.store.filterBy)
    const [sorting, setSorting] = useState<ColumnSort[]>([])
    const [filtering, setFiltering] = useState('')

    const data = props.items

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
        <>
            {props.items.length === 0 && <h2>לא נמצאו פריטים</h2>}
            {props.items.length !== 0 && <div className={styles.wrapper}>
                <ItemFilter />
                <table className={styles.table}>
                    <thead>
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
                    </thead>
                    <tbody className={styles.tbody}>
                        {filteredItems.map((item: Item) => (
                            <ItemTr key={item.id} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>}
        </>
    )
}
