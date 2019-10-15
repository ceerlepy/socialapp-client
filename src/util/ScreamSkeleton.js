import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import NoImg from '../images/no-img.png'
//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const styles = (theme) => ({
  ...theme.spreadIt,
  card: {
    display: 'flex',
    marginBottom: 20
  },
  cardContent: {
    width: '100%',
    flexDirection: 'column',
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: 'cover'
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 10
  },
  date: {
    height: 14,
    width: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10
  },
  fullline: {
    height: 15,
    width: '90%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 10
  },
  halfline: {
    height: 15,
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 10
  }
})

const ScreamSkeleton = (props) => {
  const { classes } = props

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.cover} image={NoImg} />
      <CardContent className={classes.cardContent}>
        <div className={classes.handle} />
        <div className={classes.date} />
        <div className={classes.fullline} />
        <div className={classes.fullline} />
        <div className={classes.halfline} />
      </CardContent>
    </Card>
  ))
  return <Fragment>{content}</Fragment>
}

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ScreamSkeleton)
