import { AppBar, Toolbar, Typography } from '@mui/material';

export const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        Wildfire Tracker
      </Typography>
    </Toolbar>
  </AppBar>
);