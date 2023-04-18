import React, {useContext} from 'react';
import {newContext} from './Login';

import LoginComponent from './LoginComponent';
import NewAccountName from './NewAccountName';
import NewAccountEmail from './NewAccountEmail';
import NewAccountPhone from './NewAccountPhone';
import NewAccountPassword from './NewAccountPassword';

import Box from '@material-ui/core/Box';

/**
 * Login component containing everything
 * @return {*}
 */
function Content() {
  // const hook = useContext(newContext);
  return (
    <Box>
      {useContext(newContext).showLogin ? <LoginComponent /> : <> </>}
      {useContext(newContext).showNewName ? <NewAccountName /> : <> </>}
      {useContext(newContext).showNewEmail ? <NewAccountEmail /> : <> </>}
      {useContext(newContext).showNewPhone ? <NewAccountPhone /> : <> </>}
      {useContext(newContext).showNewPassword ? <NewAccountPassword /> : <> </>}
    </Box>
  );
}

export default Content;
