import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

export const fetchCountries = createAsyncThunk('countries/fetchAll', async () => {
  const response = await axios.get(`${BASE_URL}/all`);
  return response.data;
});

export const fetchCountryDetails = createAsyncThunk('countries/fetchDetails', async (name) => {
  const response = await axios.get(`${BASE_URL}/name/${name}`);
  return response.data[0];
});

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    country: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountryDetails.fulfilled, (state, action) => {
        
        state.country = action.payload;
      });
  },
});

export default countrySlice.reducer;