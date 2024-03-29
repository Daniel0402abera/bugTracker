import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItems from "../ListItems";
import CustomAppBar from "../components/Appbar/index";
import { Outlet } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";




const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const defaultTheme = createTheme();
const drawerStyle = {
  ".MuiDrawer-paper": {
    backgroundColor: "#D5D7DF",
    marginTop: "5px",
    paddingX: 2,
  },
};
export default function Dashboard() {

 

  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logoutIconStyle = {
    backgroundColor: "#FFF",
    color: "#CA0F0D",
    borderRadius: "44px",
    textTransform: "capitalize",
    "&:hover": {
      color: "#CA0F0D",
      backgroundColor: "#FFF",
    },
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CustomAppBar />
      <Box sx={{ display: "flex", background: '#D5D7DF' }}>
        <CssBaseline />

        <Drawer variant="permanent" open={open} sx={drawerStyle}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [0],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon
                sx={{
                  rotate: open ? "180deg" : "0deg",
                  transition: "0.4s ease-in-out",
                }}
              />
            </IconButton>
          </Toolbar>
          <Divider sx={{ border: "2px solid #FFF" }} />
          <List component="nav" sx={{ height: "50%" }}>
            <Stack
              sx={{ height: "100%", paddingBottom: "24px" }}
              direction="column"
              justifyContent="space-between"
              alignItems="stretch"
            >
              <Box>
                <ListItems />
              </Box>
              <Button variant="contained" onClick={()=> {
                localStorage.removeItem("user");
                 navigate('/');
              }} sx={logoutIconStyle}>
                {/* <LogoutIcon /> */}
                logout
              </Button>
            </Stack>
          </List>
        </Drawer>

        <Box
          sx={{
            backgroundColor: "#FFF",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="100" sx={{ mt: 2, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Outlet />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
