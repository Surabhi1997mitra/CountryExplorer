import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CountryName {
  common: string,
  official: string,
  nativeName: object
}

interface FlagProps {
  png: string, 
  svg: string
}

interface Country {
    name: CountryName;
    capital: string;
    population: number;
    flags: FlagProps;
    region: string;
}

interface CountriesState {
    countries: Country[];
    loading: boolean;
    error: string | null;
}

const initialState: CountriesState = {
    countries: [],
    loading: false,
    error: null,
};

export const fetchCountries = createAsyncThunk(
    'countries/fetchCountries',
    async () => {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        return response.data;
    }
);


const countriesSlice = createSlice({
    name: 'countries',
    initialState,
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
          .addCase(fetchCountries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Failed to fetch countries';
          });
      },
})
export default countriesSlice.reducer;
