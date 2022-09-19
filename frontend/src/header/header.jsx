import React from "react";
import AppBar from "@mui/material/AppBar";
import WallpaperOutlinedIcon from "@mui/icons-material/WallpaperOutlined";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ThemeSwitcher from "./themeSwitcher";
import LayoutSelect from "../album/layoutSelect";
import Divider from "@mui/material/Divider";

export function WMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Settings
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem>
          <ThemeSwitcher />
        </MenuItem>
        <Divider />
        <LayoutSelect />
        <Divider />
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default function WHeader() {
  return (
    <React.Fragment>
      <AppBar position="relative" color="inherit">
        <Toolbar>
          <WallpaperOutlinedIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
            WallpaperApp
          </Typography>
          <WMenu />
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
