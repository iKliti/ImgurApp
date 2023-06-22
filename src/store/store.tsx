import { configureStore } from '@reduxjs/toolkit'
import GalleryReducer from './gallerySlice'

export default configureStore({
  reducer: {
    gallery: GalleryReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  })
})
