import {
  SET_ADS,
  LOADING_DATA,
  LIKE_AD,
  UNLIKE_AD,
  DELETE_AD,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_AD,
  SET_AD,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

//get all advertisments using '/ads'
//get all advertisment specific to user '/service/getAds'
export const getAds = () => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/service/getAds')
    .then(res => {
      // console.log(res);
      dispatch({
        type: SET_ADS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: SET_ADS,
        payload: []
      });
    });
};

//like a advertisment
export const likeAd = adId => dispatch => {
  axios
    .get(`/ad/${adId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_AD,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//unlike a advertisment
export const unlikeAd = adId => dispatch => {
  axios
    .get(`/ad/${adId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_AD,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

//delete a advertisment

export const deleteAd = adId => dispatch => {
  axios
    .delete(`/ad/${adId}`)
    .then(() => {
      dispatch({ type: DELETE_AD, payload: adId });
    })
    .catch(err => console.log(err));
};

//post ad body
export const postAd = newAd => dispatch => {
  dispatch({ type: LOADING_UI });

  axios
    .post('/ad', newAd)
    .then(res => {
      dispatch({
        type: POST_AD,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//clear errors
export const clearErrors = () => dispatch => {
  dispatch({ type: CLEAR_ERRORS });
};

//post only advertisment image
export const uploadAdImage = formData => dispatch => {
  dispatch({ type: LOADING_UI });
  console.log('in uploadAdImage function');
  axios
    .post('/adImage', formData)
    .then(res => {
      dispatch({
        type: POST_AD,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//post advertisment caption+image
export const postAdWithImage = formData => dispatch => {
  dispatch({ type: LOADING_UI });
  console.log('in post ad with image function');
  axios
    .post('/advertisment', formData)
    .then(res => {
      dispatch({
        type: POST_AD,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//get one advertisment
export const getAd = adId => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/ad/${adId}`)
    .then(res => {
      dispatch({ type: SET_AD, payload: res.data });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => console.log(err));
};

//comment on ad
export const submitComment = (adId, commentData) => dispatch => {
  axios
    .post(`/ad/${adId}/comment`, commentData)
    .then(res => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch(err => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//get specific user details
export const getSpecificUserData = userHandle => {};
