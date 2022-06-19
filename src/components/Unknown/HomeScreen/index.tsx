import firebase from 'firebase/app';
import 'firebase/auth';
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { UIContext } from '../UIContext';
import clearFirestoreCache from '../../../common/clearFirestoreCache';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F50057',
    },
  },
});

const HomeScreen: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { setAlert } = React.useContext(UIContext);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    clearFirestoreCache();
    firebase
      .auth()
      .signOut()
      .then(() =>
        setAlert({
          show: true,
          severity: 'info',
          message: 'Goodbye',
        }),
      )
      .catch((error) =>
        setAlert({
          show: true,
          severity: 'error',
          message: error.message,
        }),
      );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Voypost
            </Typography>
            <div>
              <Button>
                <Avatar onClick={handleMenu}>U</Avatar>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
              >
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
};

export default HomeScreen;
