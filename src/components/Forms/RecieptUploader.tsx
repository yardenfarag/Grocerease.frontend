import React, { useState } from 'react'
import styles from './ReceiptUploader.module.scss'
import { Receipt } from '@mui/icons-material'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { getProductsFromReceipt } from '../../store/receipt';
import { uploadService } from '../../services/upload.service';

type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export const ReceiptUploader = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        try {
            const imgUrl = await uploadService.uploadImg(event)

            dispatch(getProductsFromReceipt(imgUrl))
        } catch (error) {
            console.error(error)
        }
    }
}

  return (
    <div className={styles.div}>
      <label className={styles.label}>
        <span className={styles.span}><Receipt /></span>
        סרוק קבלה
        <input className={styles.input} type="file" onChange={handleFileChange} />
      </label>
    </div>
  )
}
