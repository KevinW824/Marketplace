import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import {newContext} from './Login';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#3b5998',
    alignItems: 'center',
    height: '44px',
  },

  toolbar: {
    minHeight: '44px',
  },

  title: {
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

  textField: {
    width: '100%',
  },

  prompt: {
    textAlign: 'left',
    fontSize: '13px',
    color: '#606770',
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

export const userInfo = {
  fn: '',
  ln: '',
  email: '',
  phone: '',
  password: '',
};

/**
 * New Account Component
 * @return {*}
 */
function NewAccountNameComponent() {
  const classes = useStyles();
  const hook = useContext(newContext);
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    userInfo[name] = value;
    console.log(userInfo);
  };

  return (
    <Box mx={1}>
      <Box>
        <AppBar elevation={0} className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Typography className={classes.title}>
              Join Mugtome Bazaar
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box className={classes.content} mt={7}>
        <Typography variant='h6' className={classes.firstText}>
            What's your name?
        </Typography>
        <Typography className={classes.secondText}>
            Enter the name you use in real life
        </Typography>
        <Box my={1}>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={6}>
              <Typography className={classes.prompt}>
                First name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography className={classes.prompt}>
                  Last name
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                variant='outlined'
                size='small'
                name='fn'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                className={classes.textField}
                variant='outlined'
                size='small'
                name='ln'
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={8}>
              <Button
                className={classes.nextButton}
                color='primary'
                variant='contained'
                onClick={() => {
                  hook.setShowNewName(false);
                  hook.setShowNewEmail(true);
                }}
              >
                <span>Next</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default NewAccountNameComponent;
