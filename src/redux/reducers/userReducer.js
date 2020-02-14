import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_AD,
  UNLIKE_AD,
  NOTIFICATIONS_READ,
  FORGOT_PASSWORD,
  CHANGE_PASSWORD,
  CHANGE_EMAIL,
  DELETE_USER
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  reviews: [],
  advertisments: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state, //spreading
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload // credentials: action.payload[0]
      };
    // case POST_AD:
    //   return {
    //     ...state,
    //     advertisments: [action.payload, ...state.advertisments]
    //   };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case LIKE_AD:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.credentials.handle,
            adId: action.payload.adId
          }
        ]
        // advertisments: [action.payload, ...state.advertisments]
      };
    case UNLIKE_AD:
      return {
        ...state,
        likes: state.likes.filter(like => like.adId !== action.payload.adId) //unlike a scream filter ou
        // advertisments: [action.payload, ...state.advertisments]
      };

    case NOTIFICATIONS_READ:
      state.notifications.forEach(n => (n.read = true));
      return {
        ...state
      };
    case FORGOT_PASSWORD:
      return {
        ...state
      };
    case CHANGE_PASSWORD:
      return {
        ...state
      };
    case CHANGE_EMAIL:
      return {
        ...state
      };
    case DELETE_USER: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
