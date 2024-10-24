import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {endpoints} from '../../config/locals/config';
import networkCall from '../../utils/networkCalls';

export interface User {
  email: string;
  username: string;
  password: string;
  phone: string;
  password_confirmation: string;
  role: string;
  referral_code: string;
}

export interface AuthDataType {
  message: string | null;
  loading: boolean;
  loadingLogin: boolean;
  token: null | string;
  phoneOrEmail: string;
  isOtpVerified: boolean;
  isCompleted: boolean;
  isSignInActive: boolean;
  termsAndCondition: {
    terms_and_conditions: {
      id: number;
      terms_and_condition: string;
      created_at: string;
      updated_at: string;
    }[];
  };
  otp: string;
  errorMassage: string;
  isLoginSuccess: boolean;
}

const initialState: AuthDataType = {
  message: null,
  loading: false,
  loadingLogin: false,
  token: null,
  phoneOrEmail: '',
  isOtpVerified: false,
  isCompleted: false,
  isSignInActive: true,
  termsAndCondition: {
    terms_and_conditions: [
      {id: 0, terms_and_condition: '', created_at: '', updated_at: ''},
    ],
  },
  otp: '',
  errorMassage: '',
  isLoginSuccess: false,
};
const setToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};
export const loginAction = createAsyncThunk(
  'loginAction',
  async (
    {
      login,
      password,
      fcm_token,
    }: {login: string; password: string; fcm_token: string},
    {rejectWithValue, fulfillWithValue},
  ) => {
    const data = {
      user: {
        login,
        password,
        fcm_token,
      },
    };
    try {
      const response = await networkCall(
        endpoints.LOGIN,
        'POST',
        JSON.stringify(data),
      );
      if (response) {
        console.log(response.response.token, '===>auth login', 'login auth');
        return fulfillWithValue(response);
      } else {
        return rejectWithValue('Login failed!');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
export const termsAndConditions = createAsyncThunk(
  'termsAndConditions',
  async (__, {rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await networkCall(endpoints.TERMS_CONDITIONS);
      if (response) {
        return fulfillWithValue(response);
      } else {
        return rejectWithValue('Terms and Conditions failed!');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
export const bestSellerAction = createAsyncThunk(
  'bestSellerAction',
  async (_, {rejectWithValue, fulfillWithValue}) => {
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization:
    //       'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2RhdGEiOjI5MH0.go4chDGnT9bBFF1anoYBByqrrrTx6hrbjyZohKzVvnI',
    //   },
    // };

    try {
      const response = await networkCall(endpoints.BEST_SELLER);
      console.log(response, '======>best auth');
      if (response) {
        return fulfillWithValue(response);
      } else {
        return rejectWithValue('Terms and Conditions failed!');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);

export const registerAction = createAsyncThunk(
  'registerAction',
  async (
    {
      email,
      username,
      password,
      phone,
      password_confirmation,
      role,
      referral_code,
    }: User,
    {rejectWithValue, fulfillWithValue},
  ) => {
    const data = {
      user: {
        email,
        username,
        password,
        phone,
        password_confirmation,
        role,
        referral_code: referral_code || '',
      },
    };
    try {
      const response = await networkCall(
        endpoints.SIGNUP,
        'POST',
        JSON.stringify(data),
      );
      if (response) {
        setToken(response.response.token);
        return fulfillWithValue(response);
      } else {
        return rejectWithValue('Something went wrong!');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
export const sendOTP = createAsyncThunk(
  'sendOTP',
  async (username: string, {rejectWithValue, fulfillWithValue}) => {
    const data = {
      username,
    };
    try {
      const response = await networkCall(
        endpoints.LOGIN,
        'POST',
        JSON.stringify(data),
      );
      if (response) {
        return fulfillWithValue(response);
      } else {
        return rejectWithValue('OTP failed!');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
export const forgotPasswordAction = createAsyncThunk(
  'forgotPasswordAction',
  async (
    {
      password,
      confirm_password,
      username,
    }: {password: string; confirm_password: string; username: string},
    {rejectWithValue, fulfillWithValue},
  ) => {
    const data = {
      password,
      confirm_password,
      username,
    };
    try {
      const response = await networkCall(
        endpoints.FORGOT_PASSWORD,
        'PUT',
        JSON.stringify(data),
      );
      if (response) {
        console.log(response, '=====>auth reset');
        return fulfillWithValue(response);
      } else {
        return rejectWithValue('Password failed!');
      }
    } catch (error) {
      return rejectWithValue('Something went wrong!');
    }
  },
);
export const AuthSlice = createSlice({
  name: 'authlice',
  initialState,
  reducers: {
    getPhoneOrEmail: (state, action) => {
      state.phoneOrEmail = action.payload;
      console.log(action.payload, 'auth email');
    },
    getVerification: (state, action) => {
      state.isOtpVerified = action.payload.data.otp;
      state.isCompleted = action.payload.data.verify;
    },
    toggleAuthScreen: state => {
      state.isSignInActive = !state.isSignInActive;
    },
    getOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerAction.pending, state => {
      state.loadingLogin = true;
      state.message = null;
    });
    builder.addCase(registerAction.fulfilled, state => {
      state.loadingLogin = false;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loadingLogin = false;
      state.message = 'Please try again!';
    });
    builder.addCase(loginAction.pending, state => {
      state.loadingLogin = true;
      state.message = null;
      state.isLoginSuccess = false;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loadingLogin = false;
    });
    builder.addCase(loginAction.rejected, state => {
      state.loadingLogin = false;
      state.message = 'Please try again!';
    });
    builder.addCase(termsAndConditions.pending, state => {
      state.loading = true;
      state.message = null;
    });
    builder.addCase(termsAndConditions.fulfilled, (state, action) => {
      state.loading = false;
      state.termsAndCondition = action.payload.response;
    });
    builder.addCase(termsAndConditions.rejected, state => {
      state.loading = false;
      state.message = 'Please try again!';
    });
    builder.addCase(bestSellerAction.pending, state => {
      state.loading = true;
    });
    builder.addCase(bestSellerAction.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload, '======>best auth1');
    });
    builder.addCase(bestSellerAction.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

export const {getPhoneOrEmail, getVerification, toggleAuthScreen, getOtp} =
  AuthSlice.actions;

export default AuthSlice.reducer;
