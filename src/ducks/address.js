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
