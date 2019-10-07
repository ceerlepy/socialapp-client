import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Scream from '../components/scream'

class home extends Component {
  state = {
    screams: null
  }

  componentDidMount() {
    let proxy =
      'https://cors-anywhere.herokuapp.com/https://europe-west1-socialapp-cba28.cloudfunctions.net/api'

    // axios.defaults.proxy.host = proxy;
    // axios.defaults.proxy.port = ...
    // axios.defaults.proxy.auth.username = ...
    // axios.defaults.proxy.auth.password = ...

    axios
      .get(`${proxy}/screams`)
      .then((res) => {
        console.log(res.data)
        this.setState({
          screams: res.data
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    let recentScreamsMarkup = this.state.screams ? (
      this.state.screams.map((scream) => <Scream scream={scream} key={scream.screamId} />)
    ) : (
      <p>Loading...</p>
    )
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>Profiles...</p>
        </Grid>
      </Grid>
    )
  }
}

export default home
