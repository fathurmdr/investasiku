import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import investmentService from "./investmentService";

const initialState = {
  investments: [],
  investmentById: {},
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

// Get user investments
export const getInvestmentById = createAsyncThunk(
  "investment/getOne",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.getInvestmentById(id, token);
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

// Add Buy Back
export const addBuyback = createAsyncThunk(
  "investment/addBuyback",
  async (payload, thunkAPI) => {
    try {
      const { investId, buyBack, date } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.addBuyback(investId, buyBack, date, token);
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

// Buy Investment
export const buyInvestment = createAsyncThunk(
  "investment/buyInvestment",
  async (payload, thunkAPI) => {
    try {
      const { investId, buyForm } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.buyInvestment(investId, buyForm, token);
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

// Sell Investment
export const sellInvestment = createAsyncThunk(
  "investment/sellInvestment",
  async (payload, thunkAPI) => {
    try {
      const { investId, sellForm } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.sellInvestment(investId, sellForm, token);
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

// Edit Investment Detail
export const editInvestmentDetail = createAsyncThunk(
  "investment/editInvestmentDetail",
  async (payload, thunkAPI) => {
    try {
      const { investId, investDetailId, formData } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.editInvestmentDetail(
        investId,
        investDetailId,
        formData,
        token
      );
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

// Delete Investment Detail
export const deleteInvestmentDetail = createAsyncThunk(
  "investment/deleteInvestmentDetail",
  async (payload, thunkAPI) => {
    try {
      const { investId, investDetailId } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.deleteInvestmentDetail(
        investId,
        investDetailId,
        token
      );
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

// Reset Investment Detail
export const resetInvestmentDetail = createAsyncThunk(
  "investment/resetInvestmentDetail",
  async (investId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentService.resetInvestmentDetail(investId, token);
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
        toast.success("Data berhasil ditambahkan! 😎");
      })
      .addCase(createInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
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
        toast.error(state.message);
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
        toast.error(state.message);
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
        toast.error(state.message);
      })
      .addCase(getInvestmentById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvestmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentById = action.payload;
      })
      .addCase(getInvestmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(addBuyback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBuyback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentById.investmentDetails.push(action.payload);
        toast.success("Data berhasil ditambahkan!");
      })
      .addCase(addBuyback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(buyInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buyInvestment.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Data berhasil ditambahkan!");
      })
      .addCase(buyInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(sellInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Data berhasil ditambahkan!");
      })
      .addCase(sellInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(editInvestmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editInvestmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Data berhasil update!");
      })
      .addCase(editInvestmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(deleteInvestmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvestmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        toast.success("Data berhasil dihapus!");
      })
      .addCase(deleteInvestmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      })
      .addCase(resetInvestmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetInvestmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentById.investmentDetails = [];
        toast.success("Data berhasil reset!");
      })
      .addCase(resetInvestmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(state.message);
      });
  },
});

export const { reset } = investmentSlice.actions;
export default investmentSlice.reducer;
