import React, {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

import {newContext} from './Login';
import {userInfo} from './NewAccountName';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#3b5998',
    flexGrow: '1',
    height: '44px',
  },

  toolbar: {
    minHeight: '44px',
    justifyContent: 'space-between',
  },

  title: {
    flexGrow: '1',
    textAlign: 'center',
  },

  content: {
    textAlign: 'center',
  },

  firstText: {
    fontWeight: 'bold',
  },

  secondText: {
    fontSize: '15px',
  },

  prompt: {
    textAlign: 'left',
    fontSize: '13px',
    color: '#606770',
  },

  textField: {
    width: '100%',
  },

  nextButton: {
    backgroundColor: '#1877f2',
    borderColor: '#60a62e #519f18 #409701',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '15px',
    width: '100%',
    textTransform: 'none',
  },
}));

/**
 * New Account Component
 * @return {*}
 */
function NewAccountPhoneComponent() {
  const classes = useStyles();
  const hook = useContext(newContext);
  const history = useHistory();
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    userInfo[name] = value;
    console.log(userInfo);
  };

  const user = localStorage.getItem('user');
  const bearerToken = user ? user.accessToken : '';
  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/v0/signup', {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res;
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Error signing up, please try again');
      });
  };
  return (
    <Box mx={1}>
      <Box>
        <AppBar elevation={0} className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              className={classes.iconButton}
              color="inherit"
              edge="start"
              size="small"
              onClick={() => {
                hook.setShowNewPassword(false);
                hook.setShowNewPhone(true);
              }}
            >
              <ArrowBackIosRoundedIcon />
            </IconButton>
            <Typography className={classes.title}>
              Join Mugtome Bazaar
            </Typography>
            <IconButton
              className={classes.iconButton}
              edge="start">
              <ArrowBackIosRoundedIcon htmlColor="#3b5998"/>
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box className={classes.content} mt={7}>
        <Typography variant='h6' className={classes.firstText}>
            Choose a Password
        </Typography>
        <Typography className={classes.secondText}>
            Create a password with at least 6 characters.
            It should be something others couldn't guess.
        </Typography>
        <Box my={1}>
          <form onSubmit={onSubmit}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={12}>
                <Typography className={classes.prompt}>
                  New password
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  variant='outlined'
                  size='small'
                  onChange={handleInputChange}
                  name='password'
                />
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={8}>
                <Button
                  className={classes.nextButton}
                  color='primary'
                  variant='contained'
                  type='submit'
                >
                  <span>Sign Up</span>
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default NewAccountPhoneComponent;
