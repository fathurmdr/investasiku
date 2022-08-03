import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import investmentDetailService from "./investmentDetailService";
// import { toast } from "react-toastify";

const initialState = {
  investmentDetails: [],
  rates: {
    rate: 0,
    rateMonth: 0,
    rateYear: 0,
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get investment details
export const getInvestmentDetails = createAsyncThunk(
  "investment-detail/getAll",
  async (payload, thunkAPI) => {
    try {
      const { investId } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentDetailService.getInvestmentDetails(
        investId,
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

// Add Buy Back
export const addBuyback = createAsyncThunk(
  "investment-detail/addBuyback",
  async (payload, thunkAPI) => {
    try {
      const { investId, buyBack } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentDetailService.addBuyback(investId, buyBack, token);
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

// Buy investment
export const buyInvestment = createAsyncThunk(
  "investment-detail/buy",
  async (payload, thunkAPI) => {
    try {
      const { investId, buyForm } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentDetailService.buyInvestment(
        investId,
        buyForm,
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

// sell investment
export const sellInvestment = createAsyncThunk(
  "investment-detail/sell",
  async (payload, thunkAPI) => {
    try {
      const { investId, sellForm } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentDetailService.sellInvestment(
        investId,
        sellForm,
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

// calculate rate
export const calculateRate = createAsyncThunk(
  "investment-detail/calculateRate",
  async (investmentDetails, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await investmentDetailService.calculateRate(
        investmentDetails,
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

// Edit investment
export const editInvestmentDetail = createAsyncThunk(
  "investment-detail/edit",
  async (payload, thunkAPI) => {
    try {
      const { investId, investDetailId, editInvestDetailForm } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentDetailService.editInvestmentDetail(
        investId,
        investDetailId,
        editInvestDetailForm,
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

// Delete investment detail
export const deleteInvestmentDetail = createAsyncThunk(
  "investment-detail/delete",
  async (payload, thunkAPI) => {
    try {
      const { investId, investDetailId } = payload;
      const token = thunkAPI.getState().auth.user.token;
      return await investmentDetailService.deleteInvestmentDetail(
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

export const investmentDetailSlice = createSlice({
  name: "investment-detail",
  initialState,
  reducers: {
    reset: (state) => {
      state.investmentDetails = [];
      state.rates = {
        rate: 0,
        rateMonth: 0,
        rateYear: 0,
      };
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getInvestmentDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvestmentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentDetails = action.payload.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
      })
      .addCase(getInvestmentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(addBuyback.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBuyback.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentDetails.push(action.payload);
      })
      .addCase(addBuyback.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(buyInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(buyInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentDetails.push(action.payload);
      })
      .addCase(buyInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(sellInvestment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sellInvestment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentDetails.push(action.payload);
      })
      .addCase(sellInvestment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(calculateRate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(calculateRate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rates = action.payload;
      })
      .addCase(calculateRate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editInvestmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editInvestmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentDetails = state.investmentDetails.map((el) =>
          el._id === action.payload._id ? action.payload : el
        );
      })
      .addCase(editInvestmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteInvestmentDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteInvestmentDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.investmentDetails = state.investmentDetails.filter(
          (el) => el._id !== action.payload.id
        );
        toast.success("Data berhasil dihapus!");
      })
      .addCase(deleteInvestmentDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = investmentDetailSlice.actions;
export default investmentDetailSlice.reducer;
