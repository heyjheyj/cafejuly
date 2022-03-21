import React, { useState } from "react";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CookieIcon from '@mui/icons-material/Cookie';

const Checkboxs = ({ lists, handleFilter }) => {
  const [checked, setChecked] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open)
  }

  const handleToggle = listId => {
    const currentIndex = checked.indexOf(listId);

    let newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(listId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    handleFilter(newChecked);
  };


  const renderCheckbox = lists =>
    lists.length > 0 &&
    lists.map((list, index) =>
      <FormControlLabel 
        control={<Checkbox 
                  onChange={() => handleToggle(list._id)}
                  checked={checked.indexOf(list) === -1 ? false : true}
                  value={`${list.name}`}
                />} 
        label={`${list.name}`} 
        key={index} 
      />
    );

  return (<>
    <List
      sx={{ p: 0, width: '100%', maxWidth: '70%', bgcolor: '#ffe0e5', borderRadius: '10px', marginRight: '10px' }}
      component="nav"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <CookieIcon />
        </ListItemIcon>
      <ListItemText primary="Cookies" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 2 }}>
            <FormGroup sx={{ display: 'flex', flexDirection: 'row'}}>
              {renderCheckbox(lists)}
            </FormGroup>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
    </>
  );
};

export default Checkboxs;
