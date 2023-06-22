import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface GalleryState {
  gallery: any[];
  loading: boolean;
};

interface GalleryResponse {
  data: any;
}

interface GalleryParams {
  section: string;
  sort: string;
  window: string;
  viral: boolean;
}



export const getGallery = createAsyncThunk('gallery/getGallery', async (param: GalleryParams) => {
  try {
    const response = await axios.get(`https://imgur-apiv3.p.rapidapi.com/3/gallery/${param.section.toLowerCase()}/${param.sort.toLowerCase()}/${param.window.toLowerCase()}/0`, {
      params: { showViral: param.viral },
      headers: {
        Authorization: 'Client-ID a666cbbdb9c570d',
        'X-RapidAPI-Key': '34f2699b7emshe75ba650d801c5cp1b6dfbjsn23038745caa1',
        'X-RapidAPI-Host': 'imgur-apiv3.p.rapidapi.com'
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
});



const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    gallery: [],
    loading: false,
  } as GalleryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGallery.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getGallery.fulfilled,
        (state, action: PayloadAction<GalleryResponse>) => {
          state.loading = false;
          state.gallery = action.payload.data;
        }
      )
      .addCase(getGallery.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default gallerySlice.reducer;
