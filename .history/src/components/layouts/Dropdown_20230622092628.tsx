import React, { RefObject } from 'react';
import { Box, Button, ButtonGroup, Paper, Grow, Popper, MenuList, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';

interface DropDownProps {
  type: string;
  menuitems: { id: number | string; title: string }[];
  handleToggle: (type: string) => void;
  handleClick: (type: string) => void;
  selectedItem: string;
  anchorref: RefObject<HTMLButtonElement>; // Update the type to HTMLButtonElement
  open: boolean;
  handleClose: (type: string) => void;
  selectedIndex: number;
  handleMenuItemClick: (item: string, index: number, type: string) => void;
}

const DropDown: React.FC<DropDownProps> = ({
  type,
  menuitems,
  handleToggle,
  handleClick,
  selectedItem,
  anchorref,
  open,
  handleClose,
  selectedIndex,
  handleMenuItemClick,
}) => {
  return (
    <>
      <Box sx={{ display: { xs: 'none', sm: 'block' }, mx: 2 }}>
        <ButtonGroup variant="contained" aria-label="split button">
          <Button sx={{ background: 'darkcyan' }} onClick={() => handleClick(type)}>
            {selectedItem}
          </Button>
          <Button
            ref={anchorref} // Use the anchorref directly on the Button component
            sx={{ background: 'darkcyan' }}
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={() => handleToggle(type)}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          anchorEl={anchorref.current}
          open={open}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={() => handleClose(type)}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {menuitems.map((menuitem) => (
                      <MenuItem
                        key={menuitem.id}
                        selected={selectedIndex === menuitem.id}
                        onClick={() => handleMenuItemClick(menuitem.title, Number(menuitem.id), type)}
                        >
                        {menuitem.title}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </>
  );
};

export default DropDown;
