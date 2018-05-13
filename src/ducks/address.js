import { takeLatest, put } from 'redux-saga/effects';
import api from "../api/postcode-jp";

// Actions
const GET_ADDRESS_REQUESTED = 'saga-and-router4/address/GET_ADDRESS_REQUESTED'; // 住所の取得を要求した。
const GET_ADDRESS_SUCCEEDED = 'saga-and-router4/address/GET_ADDRESS_SUCCEEDED'; // 住所の取得が成功した。
const GET_ADDRESS_FAILED = 'saga-and-router4/address/GET_ADDRESS_FAILED'; // 住所の取得が失敗した。

// Initial State
export const initialState = {
  apiIsProcessing: false, // true はAPIのリクエストが投げられ、かつレスポンスがまだ返ってきていない状態
  zipCode: null,  // 入力された郵便番号
  address: null,  // APIが成功で返ってきた場合の該当住所
  error: null,    // APIが失敗で返ってきた場合のエラーメッセージ
};

// Reducer (exported as default)
export default function address(state = initialState, action) {
  switch(action.type) {
    case GET_ADDRESS_REQUESTED:
      return Object.assign({}, state,
        { apiIsProcessing: true, zipCode: action.payload.zipCode, address: null, error: null  });
    case GET_ADDRESS_SUCCEEDED:
      return Object.assign({}, state,
        { apiIsProcessing: false, address: action.payload.address });
    case GET_ADDRESS_FAILED:
      return Object.assign({}, state,
        { apiIsProcessing: false, error: action.payload.message });
    default:
      return state;
  }
}

// Action Creators
export const getAddressRequested = (zipCode) => (
  {
    type: GET_ADDRESS_REQUESTED,
    payload: { zipCode },
  }
);

// Sagas
function* getAddress(action) {
  const res = yield api.getAddress(action.payload.zipCode);
  if (res.data && res.data.length > 0) { // 成功： 指定された郵便番号に該当する住所が存在した。
    yield put({
      type: GET_ADDRESS_SUCCEEDED,
      payload: {
        zipCode: action.payload.zipCode,
        address: res.data[0].allAddress,
        error: false,
      }
    });
  } else { // 失敗： 指定された郵便番号に該当する住所が存在しなかった。
    const message = res.validationErrors ? res.validationErrors[0].message : null;
    yield put({
      type: GET_ADDRESS_FAILED,
      payload: new Error(message),
      error: true,
    });
  }
};

function* watchLastGetZipData() {
  yield takeLatest(GET_ADDRESS_REQUESTED, getAddress);
}

export const sagas = [
  watchLastGetZipData,
];
