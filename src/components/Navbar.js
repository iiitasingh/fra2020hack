import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DailyScrum from './Daily_Scrum';
import PageOne from './PageOne';
import TaskAllocation from './Task_allocation';
import NotFound from '../NotFound';
import TaskIcon from '@material-ui/icons/EventNote';
import ScrumIcon from '@material-ui/icons/People';
import ReviewIcon from '@material-ui/icons/FindInPage';
import RetroIcon from '@material-ui/icons/Forum';

const drawerWidth = 220;

const useStyles1 = makeStyles(theme => ({
  root: {
    width: '100%',
  },
}));

const useStyles = makeStyles(theme => ({
  root: {
    background: 'white',
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 2px 5px 2px rgba(224, 224, 224, .2)',

  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },

  grow: {
    display: 'flex',
    flexGrow: 1,
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  imageLogo: {
    marginRight: theme.spacing(2),
    width : 140,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: '#343A40'
  },
  total: {
    display: 'flex',
    flex_direction: 'row',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#eeeeee',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
    color: '#eeeeee',
  },
  inputRoot: {
    color: '#343A40',
  },
  inputInput: {
    color: '#343A40',
    position: 'relative',
    padding: theme.spacing(1, 1, 1, 1),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

}));

function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const classes1 = useStyles1();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  function handleProfileMenuOpen(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    handleMobileMenuClose();
  }

  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }
  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      
    >
      <MenuItem>
        <IconButton aria-label="Show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="Show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="Account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [pageName, setPage] = React.useState('Page 1');

  const changePage = (e) => {

    if (e.currentTarget.dataset.id === '1') {
      setPage('Page 1');
    } else if (e.currentTarget.dataset.id === '2') {
      setPage('Page 2');
    } else if (e.currentTarget.dataset.id === '3') {
      setPage('Support');
    } else {
      setPage('Github');
    }
  }

  return (
    <Router>
      <div className={classes.grow}>
        <CssBaseline />
        <AppBar position="fixed" classes={{
          root: classes.root,
        }} className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}>
          <Toolbar>
            <IconButton
              edge="start"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.hide)}
              color="#343A40"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <img className={classes.imageLogo} src={process.env.PUBLIC_URL + '/images/ubs-logo.png'} />
            <Typography className={classes.title} variant="h6" noWrap>
              {pageName}
            </Typography>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'Search' }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="Show 4 new mails" >
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="Show 17 new notifications" >
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="Account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="Show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <Link to="/">
              <ListItem button onClick={changePage} data-id="1">
                <ListItemIcon ><TaskIcon /></ListItemIcon>
                <ListItemText >Page 1</ListItemText>
              </ListItem>
            </Link>
            <Link to="/DailyScrum">
              <ListItem button onClick={changePage} data-id="2">
                <ListItemIcon ><ScrumIcon /></ListItemIcon>
                <ListItemText >Page 2</ListItemText>
              </ListItem>
            </Link>
          </List>

          <Divider />
          <List>
            {['Support', 'Github'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}>
          <div className={classes.drawerHeader} />
          <div>
            <Switch>
              <Route exact path="/" component={TaskAllocation} />
              <Route path="/DailyScrum" component={PageOne} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>
      </div>
    </Router>
  );
}
export default PrimarySearchAppBar;
