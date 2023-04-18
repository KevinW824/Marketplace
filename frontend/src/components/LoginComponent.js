import React, {useContext, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {makeStyles, styled} from '@material-ui/core/styles';
import {newContext} from './Login';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  box: {
    textAlign: 'center',
  },

  title: {
    color: '#1778f2',
    fontWeight: 'bold',
    fontSize: '24px',
  },

  textfield: {
    width: '100%',
    background: '#f5f6f7',
    borderRadius: '3px',
    boxShadow: '0.5px 0.5px 0.5px #e9eaeb',
  },

  gap: {
    padding: '4px',
  },

  largeGap: {
    padding: '8px',
  },

  labelRoot: {
    fontSize: '14px',
  },

  labelFocused: {
    fontSize: '14px',
  },

  LoginButton: {
    width: '100%',
    backgroundColor: '#1778f2',
    boxShadow: '0',
  },

  loginSpan: {
    fontSize: '17px',
    height: '40px',
    lineHeight: '40px',
    textShadow: 'rgba(0,0,0,0.25)',
    fontWeight: 'bold',
    textTransform: 'none',
  },

  createNewButton: {
    backgroundColor: '#46a800',
    borderColor: '#60a62e #519f18 #409701',
    boxShadow: 'none',
  },

  createNewSpan: {
    fontSize: '14px',
    lineHeight: '28px',
    textShadow: 'rgba(0,0,0,0.25)',
    fontWeight: 'bold',
    textTransform: 'none',
  },

  link: {
    fontFamily: ['Roboto-Regular', 'Helvetica', 'sans-serif'],
    color: '#216fdb',
    fontSize: '14px',
    lineHeight: '16px',
  },

  divider: {
    marginTop: '12px',
    marginBottom: '4px',
  },
}));

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#e9eaeb',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

/**
 * Login component containing everything
 * @return {*}
 */
function LoginComponent() {
  const classes = useStyles();
  const hook = useContext(newContext);
  const [user, setUser] = useState({email: '', password: ''});
  const history = useHistory();

  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
  };

  return (
    <Grid container justifyContent="center" spacing={1}>
      <Grid item xs={12} sm={3}>
        <Box className={classes.box} mx={1}>
          <Box>
            <Typography className={classes.title}>
              Mugtome Bazaar
            </Typography>
          </Box>
          <form onSubmit={onSubmit}>
            <CssTextField
              className={classes.textfield}
              variant='outlined'
              size='small'
              label='Mobile number or email'
              id="number-or-email"
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                },
              }}
              onChange={handleInputChange}
              name="email"
              required
            />
            <Box className={classes.gap}></Box>
            <CssTextField
              className={classes.textfield}
              variant='outlined'
              size='small'
              label='Password'
              type='password'
              InputLabelProps={{
                classes: {
                  root: classes.labelRoot,
                  focused: classes.labelFocused,
                },
              }}
              onChange={handleInputChange}
              name="password"
              required
            />
            <Box className={classes.gap}></Box>
            <Button
              className={classes.LoginButton}
              variant='contained'
              color='primary'
              size='small'
              type='submit'
            >
              <span className={classes.loginSpan}>Log In</span>
            </Button>
          </form>
          <Box className={classes.largeGap}></Box>
          <Link href="#" underline="none" className={classes.link}>
            {'Forgot password?'}
          </Link>
          <Box className={classes.gap}></Box>
          <Divider variant='middle' className={classes.divider}></Divider>
          <Box className={classes.largeGap}></Box>
          <Button
            className={classes.createNewButton}
            variant='contained'
            color='primary'
            size='small'
            onClick={() => {
              hook.setShowLogin(false);
              hook.setShowNewName(true);
            }}
          >
            <span className={classes.createNewSpan}>Create new account</span>
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LoginComponent;
