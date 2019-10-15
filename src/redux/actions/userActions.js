import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  MARK_NOTIFICATIOS_READ
} from '../types'
import axios from 'axios'

const proxy =
  'https://cors-anywhere.herokuapp.com/https://europe-west1-socialapp-cba28.cloudfunctions.net/api'

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })

  axios
    .post(`${proxy}/login`, userData)
    .then((res) => {
      setStorageAndAuthenticationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI })

  axios
    .post(`${proxy}/signup`, newUserData)
    .then((res) => {
      setStorageAndAuthenticationHeader(res.data.token)
      dispatch(getUserData())
      dispatch({ type: CLEAR_ERRORS })
      history.push('/')
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      })
    })
}

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken')
  delete axios.defaults.headers.common['Authorization']
  dispatch({ type: SET_UNAUTHENTICATED })
}

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .post(`${proxy}/user/image`, formData)
    .then(() => {
      dispatch(getUserData())
    })
    .catch((err) => console.error(err))
}

export const editUserDetails = (userDetails) => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .post(`${proxy}/user`, userDetails)
    .then(() => {
      dispatch(getUserData())
    })
    .catch((err) => console.error(err))
}

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER })
  axios
    .get(`${proxy}/user`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      })
    })
    .catch((err) => console.error(err))
}

export const markNotificationsRead = (notificationIds) => (dispatch) => {
  axios
    .post(`${proxy}/notifications`, notificationIds)
    .then(() => {
      dispatch({ type: MARK_NOTIFICATIOS_READ })
    })
    .catch((err) => console.error(err))
}

const setStorageAndAuthenticationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', token)
  axios.defaults.headers.common['Authorization'] = FBIdToken
}
