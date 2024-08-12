import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
// import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};



function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Selection({names,selectedJunction,setSelectedJunction}) {
  const theme = useTheme();
  const [personName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedJunction(value);
  };

  return <>
    <h5>Select Junction</h5>
    <div>
     
      <FormControl sx={{  width: 200 }}>
        
       
        <Select
          
          value={selectedJunction}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip"  />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
             
                <Chip key={selectedJunction} label={selectedJunction} />
            
            </Box>
          )}
          MenuProps={MenuProps}
          sx={{
            // Adjust height as needed
           '& .MuiSelect-select': {
             padding:'5px 0', // Adjust padding to fit the height
           },
           '& .MuiOutlinedInput-input': {
             padding:'5px 0', // Adjust padding to fit the height
           },
         }}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  </>
}


Selection.propTypes = {
  names: PropTypes.any,
  selectedJunction:PropTypes.any,
  setSelectedJunction:PropTypes.any
};