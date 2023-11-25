import React, { useState, useEffect } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import BugReportIcon from '@mui/icons-material/BugReport';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
const menus = [
  {
    index: 0,
    link: "/dashboard/bug",
    title: "Bug",
    icon: <BugReportIcon />,
    roles: ['ADMIN','DEVELOPER','TESTER'],
  },
  {
    index: 1,
    link: "/dashboard/assign_bug",
    title: "Assign User",
    icon: <AssignmentIndIcon />,
    roles: ['ADMIN'],
  },
  {
    index: 2,
    link: "/dashboard/user",
    title: "User",
    icon: <PeopleIcon />,
    roles: ['ADMIN'],
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
      setFilteredMenus(
        menus.filter((menu) => menu.roles.includes(role))
      );

      

    }
  }, [role]);

  const handleClick = (event, index) => {
    setSelectedIndex(index);
  };

  return filteredMenus?.map((menu, key) => (
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
