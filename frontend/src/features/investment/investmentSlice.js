import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import investmentService from "./investmentService";

const initialState = {
  investments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new investment
export const createInvestment = createAsyncThunk(
  "investment/create",
  async (investmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.createInvestment(investmentData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Edit investment
export const editInvestment = createAsyncThunk(
  "investment/edit",
  async (investmentData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.editInvestment(investmentData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user investments
export const getInvestments = createAsyncThunk(
  "investment/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.getInvestments(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user investment
export const deleteInvestment = createAsyncThunk(
  "investment/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.deleteInvestment(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const investmentSlice = createSlice({
  name: "investment",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investments.push(action.payload);
        toast.success("Data berhasil ditambahkan! 😎");
      })
      .addCase(createInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investments = state.investments.map((el) =>
          el._id === action.payload._id ? action.payload : el
        );
        toast.success("Data berhasil diupdate! 😎");
      })
      .addCase(editInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getInvestments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvestments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investments = action.payload;
      })
      .addCase(getInvestments.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investments = state.investments.filter(
          (investment) => investment._id !== action.payload.id
        );
        toast.success("Data berhasil dihapus!");
      })
      .addCase(deleteInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = investmentSlice.actions;
export default investmentSlice.reducer;
