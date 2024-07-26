import React from 'react';
import { Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  employeeName: string;
  onLogout: () => void;
  anchorEl: null | HTMLElement;
  handleMenuOpen: (event: React.MouseEvent<HTMLElement>) => void;
  handleMenuClose: () => void;
}

const Header: React.FC<HeaderProps> = ({ employeeName, onLogout, anchorEl, handleMenuOpen, handleMenuClose }) => {
  return (
    <Box sx={{
      bgcolor: '#105f82', color: 'white', p: 2, display: 'flex',
      alignItems: 'center', justifyContent: 'space-between', mb: 2,
      position: 'sticky',
      top: 0,
      zIndex: 1,
      borderRadius: 3,
    }}>
      <Typography variant="h6" sx={{ ml: 2, color: '#ffffff', textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
        Hey {employeeName}!
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              mt: 1,
              bgcolor: '#ffffff',
              borderRadius: 2,
              boxShadow: 3,
              minWidth: 120,
              '& .MuiMenuItem-root': {
                color: '#333333',
                bgcolor: '#f4f4f4',
                '&:hover': {
                  bgcolor: '#ff3b30',
                  color: '#ffffff',
                },
                width: '100%',
              },
            },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;