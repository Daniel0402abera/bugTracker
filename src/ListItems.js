import React, { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import InventoryIcon from '@mui/icons-material/Inventory';
import StoreIcon from '@mui/icons-material/Store';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CategoryIcon from '@mui/icons-material/Category';
const menus = [
  {
    index: 0,
    link: "/dashboard/bug",
    title: "bug",
    icon: <StoreIcon />,
    roles: [],
  },
  {
    index: 1,
    link: "/dashboard/user",
    title: "User",
    icon: <CategoryIcon />,
    roles: [],
  }
];

function ListItems() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [role, setRole] = useState(localStorage.getItem("role"))
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      setRole(role)
      // setFilteredMenus(
      //   menus.filter((menu) => menu.roles.includes(role))
      // );

      

    }
  }, [role]);

  const handleClick = (event, index) => {
    setSelectedIndex(index);
  };

  return menus?.map((menu, key) => (
    <ListItemButton
      key={key}
      sx={{
        "&.Mui-selected": {
          color: "#488550",
          backgroundColor: "#FFF",
          borderRadius: "21.5px",
        },
      }}
      selected={selectedIndex === menu.index}
      onClick={(event) => {
        const index = menu.index;
        navigate(menu.link);
        handleClick(event, index);
      }}
    >
      <ListItemIcon sx={{ color: selectedIndex === menu.index && "#488550" }}>
        {menu.icon}
      </ListItemIcon>
      <ListItemText primary={menu.title} />
    </ListItemButton>
  ));
}

export default ListItems;
