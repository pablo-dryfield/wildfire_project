import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

export const WildfireList = ({ wildfires , month, year, isLoading}) => {
console.log(isLoading);
  if (!Array.isArray(wildfires.features) || wildfires.features.length === 0) {
    if(year !== 0 && month !== '' && month !== 'Select Month' && year !== 'Select Year'){
      if(isLoading){
        return <Typography variant="h6">Loading data...</Typography>;
      }else{
        return <Typography variant="h6">No wildfires data available.</Typography>;
      } 
    }else{
      return <Typography variant="h6"></Typography>;
    }
  }

  return (
    <List>
      {wildfires.features.sort((a, b) => a.properties.title.localeCompare(b.properties.title)).map((wildfire, index) => (
        <ListItem key={index}>
          <ListItemText primary={`${wildfire.properties.title}`} />
        </ListItem>
      ))}
    </List>
  );
};