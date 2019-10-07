import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/login.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

//MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
  ...theme.user
})

const proxy =
  'https://cors-anywhere.herokuapp.com/https://europe-west1-socialapp-cba28.cloudfunctions.net/api'

class login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: []
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.setState({
      loading: true
    })

    const userData = {
      email: this.state.email,
      password: this.state.password
    }

    axios
      .post(`${proxy}/login`, userData)
      .then((res) => {
        console.log(res.data)
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        this.setState({
          loading: false
        })
        this.props.history.push('/')
      })
      .catch((err) => {
        console.error(err.response)
        this.setState({
          errors: err.response.data,
          loading: false
        })
      })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props
    const { errors, loading } = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt='login image' className={classes.image}></img>
          <Typography variant='h2' className={classes.pageTitle}>
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id='email'
              name='email'
              type='email'
              label='Email'
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
              fullWidth
              value={this.state.email}
            />
            <TextField
              id='password'
              name='password'
              type='password'
              label='Password'
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
              fullWidth
              value={this.state.password}
            />
            {errors.general && (
              <Typography variant='body2' className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            {errors.error && (
              <Typography variant='body2' className={classes.customError}>
                {errors.error}
              </Typography>
            )}
            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.button}
              disabled={loading}
            >
              LOGIN
              {loading && <CircularProgress size={30} className={classes.progress} />}
            </Button>
            <br />
            <br />
            <small>
              don't have an account ? sign up <Link to='/signup'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    )
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
