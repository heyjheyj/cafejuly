import React from "react";
import { useState } from "react";

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const Radiobox = ({prices, handleFilter}) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open)
  }

  const renderRadiobox = () => 
    prices.length > 0 && prices.map((price, index) => 
    <FormControlLabel control={<Radio value={`${price._id}`}
    />} label={`${price.name}`} key={index} />    
    )

  const handleChange = e => {
    handleFilter(e.target.value);
  };

  return (<>
    <List
      sx={{ p: 0, width: '100%', maxWidth: '70%', bgcolor: '#ffe0e5', borderRadius: '10px' }}
      component="nav"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
      <ListItemText primary="Price" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 3 }}>
            <RadioGroup onChange={handleChange} row name="pricerange">
              {renderRadiobox()}
            </RadioGroup>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    </>
  );
};

export default Radiobox;
