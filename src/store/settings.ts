import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storageService } from '../services/storage.service'

const VIEW_SETTINGS_KEY = 'viewSettings'
const THEME_SETTINGS_KEY = 'themeSettings'

const initialSettingsState = { view: storageService.load(VIEW_SETTINGS_KEY) || 'list', theme: storageService.load(THEME_SETTINGS_KEY) ||  'dark' }


const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettingsState,
    reducers: {
        toggleView: (state, action: PayloadAction<string>) => {
            state.view = action.payload
            storageService.store(VIEW_SETTINGS_KEY, action.payload)
        },
        toggleTheme: (state, action: PayloadAction<string>) => {
            state.theme = action.payload
            storageService.store(THEME_SETTINGS_KEY, action.payload)
        }
    },
})

export const settingsActions = settingsSlice.actions

export default settingsSlice.reducer