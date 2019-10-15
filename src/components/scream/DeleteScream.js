import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../../util/MyButton'
//MUI stuff
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
//Icons
import DeleteOutline from '@material-ui/icons/DeleteOutline'
//REDUX
import { connect } from 'react-redux'
import { deleteScream } from '../../redux/actions/dataActions'

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
}

class DeleteScream extends Component {
  state = { open: false }
  handleOpen = () => {
    this.setState({ open: true })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId)
    this.handleClose()
  }
  render() {
    const { classes } = this.props
    return (
      <Fragment>
        <MyButton tip='Delete scream' onClick={this.handleOpen} btnClassName={classes.deleteButton}>
          <DeleteOutline color='secondary' />
        </MyButton>
        <Dialog open={this.state.open} onClose={this.handleOpen} fullWidth maxWidth='sm'>
          <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color='primary'>
              Close
            </Button>
            <Button onClick={this.deleteScream} color='secondary'>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}

DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired
}

export default connect(
  null,
  { deleteScream }
)(withStyles(styles)(DeleteScream))
