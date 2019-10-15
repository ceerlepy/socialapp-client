import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  CLEAR_ERRORS,
  SET_ERRORS,
  POST_SCREAM,
  LOADING_UI,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types'
import axios from 'axios'

let proxy =
  'https://cors-anywhere.herokuapp.com/https://europe-west1-socialapp-cba28.cloudfunctions.net/api'

// get the all scream data
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA })

  axios
    .get(`${proxy}/screams`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

// get the scream data
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI })

  axios
    .get(`${proxy}/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      })
      dispatch({ type: STOP_LOADING_UI })
    })
    .catch((err) => {
      console.log(err)
    })
}

//Post scream
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI })

  axios
    .post(`${proxy}/scream`, newScream)
    .then((res) => {
      console.log('** meltem nextProps')
      console.log(res.data)
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      })
      dispatch(clearErrors())
    })
    .catch((err) => {
      console.log(err)
      dispatch(setErrors(err))
    })
}

//like scream
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`${proxy}/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

//unlike scream
export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`${proxy}/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

//submit comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  axios
    .post(`${proxy}/scream/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      })
      dispatch(clearErrors())
    })
    .catch((err) => {
      console.log(err)
      dispatch(setErrors(err))
    })
}

//delete scream
export const deleteScream = (screamId) => (dispatch) => {
  axios
    .delete(`${proxy}/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

//get User Data
export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA })
  axios
    .get(`${proxy}/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      })
    })
    .catch((err) => {
      console.log(err)
      dispatch({
        type: SET_SCREAMS,
        payload: null
      })
    })
}

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}

export const setErrors = (err) => (dispatch) => {
  dispatch({
    type: SET_ERRORS,
    payload: err.response.data
  })
}
