import React, { useState, useRef } from 'react';
import { Box, Toolbar, AppBar, Switch } from '@mui/material';
import logo from '../../assets/images/Imgur-logo.png';
import { useDispatch } from 'react-redux';
import { getGallery } from '../../store/gallerySlice';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import DropDown from './Dropdown';

interface HeaderProps {
  setRefresh: (refresh: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setRefresh }) => {
  const [openSection, setOpenSection] = useState(false);
  const [selectedIndexSection, setSelectedIndexSection] = useState(0);
  const [selectedSection, setSelectedSection] = useState('hot');
  const anchorrefSection = useRef<HTMLButtonElement>(null);

  const SectionMenu = [
    {
      id: 0,
      title: 'Hot',
    },
    {
      id: 1,
      title: 'Top',
    },
    {
      id: 2,
      title: 'User',
    },
  ];

  const [viralSwitch, setViralSwitch] = useState(true);

  const dispatch = useDispatch();

  const viralSwitchToggle = (item: boolean) => {
    setViralSwitch(item);
    dispatch(
      getGallery({
        section: selectedSection,
        viral: item,
        window: selectedWindow,
        sort: selectedSort,

      }) as any
    );
  }

  const [openWindow, setOpenWindow] = useState(false);
  const [selectedIndexWindow, setSelectedIndexWindow] = useState(0);
  const [selectedWindow, setSelectedWindow] = useState('day');
  const anchorrefWindow = useRef<HTMLButtonElement>(null);

  const windowOptions = [
    {
      id: '0',
      title: 'day',
    },
    {
      id: '1',
      title: 'week',
    },
    {
      id: '2',
      title: 'month',
    },
    {
      id: '3',
      title: 'year',
    },
    {
      id: '4',
      title: 'all',
    },
  ];

  const [openSort, setOpenSort] = useState(false);
  const [selectedIndexSort, setSelectedIndexSort] = useState(0);
  const [selectedSort, setSelectedSort] = useState('viral');
  const anchorrefSort = useRef<HTMLButtonElement>(null);

  const sortOptions = [
    {
      id: 0,
      title: 'Viral',
    },
    {
      id: 1,
      title: 'Top',
    },
    {
      id: 2,
      title: 'Time',
    },
    {
      id: 3,
      title: 'Rising',
    },
  ];

  const handleToggle = (type: string) => {
    if (type === 'section') {
      setOpenSection(!openSection);
    }

    if (type === 'window') {
      setOpenWindow(!openWindow);
    }

    if (type === 'sort') {
      setOpenSort(!openSort);
    }
  };

  const handleMenuItemClick = (item: string, index: number, type: string) => {
    if (type === 'section') {
      setOpenSection(!openSection);
      setSelectedSection(item);
      setSelectedIndexSection(index);
    }

    if (type === 'sort') {
      setOpenSort(!openSort);
      setSelectedSort(item);
      setSelectedIndexSort(index);
    }

    if (type === 'window') {
      setOpenWindow(!openWindow);
      setSelectedWindow(item);
      setSelectedIndexWindow(index);
    }

    setRefresh(true);
    dispatch(
      getGallery({
        section: type === 'section' ? item : selectedSection,
        viral: viralSwitch,
        window: type === 'window' ? item : selectedWindow,
        sort: type === 'sort' ? item : selectedSort,
      }) as any
    );
  }

  const handleClose = (type: string) => {
    if (type === 'section') {
      setOpenSection(!openSection);
    }

    if (type === 'window') {
      setOpenWindow(!openWindow);
    }

    if (type === 'sort') {
      setOpenSort(!openSort);
    }
  }

  const handleClick = (type: string) => {
    if (type === 'section') {
      setOpenSection(!openSection);
    }

    if (type === 'window') {
      setOpenWindow(!openWindow);
    }

    if (type === 'sort') {
      setOpenSort(!openSort);
    }
  }

  return (
    <>
      <AppBar component="nav">
        <Toolbar className="header-background">
          <img style={{ padding: '10px' }} src={logo} height={'40'} alt={'logo'} />

          <Box sx={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
            {selectedSection === 'User' && (
              <>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        onChange={(e) => {
                          viralSwitchToggle(e.target.checked);
                        }}
                        defaultChecked
                      />
                    }
                    label="Viral"
                  />
                </FormGroup>
              </>
            )}

            {selectedSection === 'User' && (
              <DropDown
                type={'sort'}
                menuitems={sortOptions}
                handleClick={handleClick}
                handleClose={handleClose}
                handleToggle={handleToggle}
                selectedIndex={selectedIndexSort}
                handleMenuItemClick={handleMenuItemClick}
                selectedItem={selectedSort}
                open={openSort}
                anchorref={anchorrefSort}
              />
            )}

            {selectedSection === 'top' && (
              <>
                <DropDown
                  type={'window'}
                  menuitems={windowOptions}
                  handleClick={handleClick}
                  handleClose={handleClose}
                  handleToggle={handleToggle}
                  selectedIndex={selectedIndexWindow}
                  handleMenuItemClick={handleMenuItemClick}
                  selectedItem={selectedWindow}
                  open={openWindow}
                  anchorref={anchorrefWindow}
                />
              </>
            )}

            <DropDown
              type={'section'}
              menuitems={SectionMenu}
              handleClick={handleClick}
              handleClose={handleClose}
              handleToggle={handleToggle}
              selectedIndex={selectedIndexSection}
              handleMenuItemClick={handleMenuItemClick}
              selectedItem={selectedSection}
              open={openSection}
              anchorref={anchorrefSection}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
