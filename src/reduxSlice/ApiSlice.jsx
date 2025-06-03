import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const apiCall = createAsyncThunk(
  'api/call',
  async ({ data, method = 'GET', url = '' }, { rejectWithValue, signal }) => {
    try {
      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
        },
        signal,
      };

      if (data && method !== 'GET') {
        config.body = JSON.stringify(data);
      }

      console.log(import.meta.env);
      const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (typeof result !== 'object' || result === null) {
        throw new Error('API response is not a valid JSON object');
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  data: null,
  loading: false,
  error: null,
  lastFetch: null,
  currentPage: 1,
  searchQuery: '',
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearData: (state) => {
      state.data = null;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  setSearchQuery: (state, action) => {
  state.searchQuery = action.payload;
  state.currentPage = 1; 
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(apiCall.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(apiCall.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastFetch = Date.now();
        state.error = null;
      })
      .addCase(apiCall.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearData, setLoading, setCurrentPage, setSearchQuery } = apiSlice.actions;

export const selectApiData = (state) => state.api.data;
export const selectApiLoading = (state) => state.api.loading;
export const selectApiError = (state) => state.api.error;
export const selectLastFetch = (state) => state.api.lastFetch;
export const selectCurrentPage = (state) => state.api.currentPage;
export const selectSearchQuery = (state) => state.api.searchQuery;

export default apiSlice.reducer;