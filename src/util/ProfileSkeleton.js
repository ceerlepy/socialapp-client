import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import NoImg from '../images/no-img.png'
//MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
//icons
import LocationOn from '@material-ui/icons/LocationOn'
import LinkIcon from '@material-ui/icons/Link'
import CalendarToday from '@material-ui/icons/CalendarToday'

const styles = (theme) => ({
  ...theme.spreadIt,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: '0 auto 7px auto'
  },
  fullline: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '100%',
    marginBottom: 10
  },
  halfline: {
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.6)',
    width: '50%',
    marginBottom: 10
  }
})

const ProfileSkeleton = (props) => {
  const { classes } = props

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className='image-wrapper'>
          <img src={NoImg} alt='profile' className='profile-image' />
        </div>
        <div className='profile-details'>
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullline} />
          <div className={classes.fullline} />
          <hr />
          <LocationOn color='primary' />
          <span>Location</span>
          <hr />
          <LinkIcon color='primary' /> https://website.com
          <hr />
          <CalendarToday color='primary' /> Joined date
        </div>
      </div>
    </Paper>
  )
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ProfileSkeleton)
