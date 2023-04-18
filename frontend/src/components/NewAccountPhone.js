import React, {useContext} from 'react';
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
            <IconButton
              className={classes.iconButton}
              color="inherit"
              edge="start"
              size="small"
              onClick={() => {
                hook.setShowNewPhone(false);
                hook.setShowNewEmail(true);
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
            Enter Your Phone Number
        </Typography>
        <Typography className={classes.secondText}>
            Enter the mobile number where you can be reached.
            You can hide this from your profile later.
        </Typography>
        <Box my={1}>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item xs={12}>
              <Typography className={classes.prompt}>
                Phone number
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant='outlined'
                size='small'
                name='phone'
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
                  hook.setShowNewPhone(false);
                  hook.setShowNewPassword(true);
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

export default NewAccountPhoneComponent;
