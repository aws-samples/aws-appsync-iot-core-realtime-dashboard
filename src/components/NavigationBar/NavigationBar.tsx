import React from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme, makeStyles } from '@material-ui/core';

// import { ROUTES } from '../../common/constants';
// import Logo from '../../assets/images/logo.png';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

const NavigationBar: React.FC = () => {

  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const handleMap = () => {
    if (location.pathname !== "/") {
      history.push("/");
    }
  }

  return (
    <AppBar position="fixed">
        <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Bay Health Dashboard
            </Typography>
          
          <div className={classes.toolbarButtons}>
              <Button color="inherit" onClick={()=> handleMap()}>Map</Button>
          </div>
        </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;
