import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/login.png'
import { Link } from 'react-router-dom'

//MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

//Redux
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

const styles = (theme) => ({
  ...theme.spreadIt
})

const proxy =
  'https://cors-anywhere.herokuapp.com/https://europe-west1-socialapp-cba28.cloudfunctions.net/api'

class signup extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    }

    this.props.signupUser(newUserData, this.props.history)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const {
      classes,
      UI: { loading }
    } = this.props
    const { errors } = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt='login image' className={classes.image}></img>
          <Typography variant='h2' className={classes.pageTitle}>
            Signup
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
            <TextField
              id='confirmPassword'
              name='confirmPassword'
              type='confirmPassword'
              label='Confirm Password'
              className={classes.textField}
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={this.handleChange}
              fullWidth
              value={this.state.confirmPassword}
            />
            <TextField
              id='handle'
              name='handle'
              type='handle'
              label='Handle'
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              onChange={this.handleChange}
              fullWidth
              value={this.state.handle}
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
              Signup
              {loading && <CircularProgress size={30} className={classes.progress} />}
            </Button>
            <br />
            <br />
            <small>
              Already have an account ? login <Link to='/login'>here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    )
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  signupUser
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup))
