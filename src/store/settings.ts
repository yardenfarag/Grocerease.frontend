import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { storageService } from '../services/storage.service'

const VIEW_SETTINGS_KEY = 'viewSettings'
const THEME_SETTINGS_KEY = 'themeSettings'

const initialSettingsState = { view: storageService.load(VIEW_SETTINGS_KEY) || 'list', isDarkMode: storageService.load(THEME_SETTINGS_KEY) ||  true }


const settingsSlice = createSlice({
    name: 'settings',
    initialState: initialSettingsState,
    reducers: {
        toggleView: (state, action: PayloadAction<string>) => {
            state.view = action.payload
            storageService.store(VIEW_SETTINGS_KEY, action.payload)
        },
        toggleTheme: (state) => {
            state.isDarkMode = !state.isDarkMode
            if (state.isDarkMode) {
                storageService.store(THEME_SETTINGS_KEY, true)
            } else {
                storageService.store(THEME_SETTINGS_KEY, false)
            }
        }
    },
})

export const settingsActions = settingsSlice.actions

export default settingsSlice.reducer