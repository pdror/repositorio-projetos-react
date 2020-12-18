import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import { MenuIcon, MailIcon } from '@material-ui/icons';
import { 
  makeStyles,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  List,
  IconButton,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  navigation: {
    paddingRight: 20,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Repositório de Projetos
          </Typography>
          <Link to="/homepage" style={{color: 'white'}} activeStyle={{color: 'yellow'}}>
          <h3 className={classes.navigation}>Página Inicial</h3>
          </Link>
          <Link to="/projects" style={{color: 'white'}}>
          <h3 className={classes.navigation}>Projetos</h3>
          </Link>
          <Link to="/teachers" style={{color: 'white'}}>
          <h3 className={classes.navigation}>Professores</h3>
          </Link>
          <Link to="/about" style={{color: 'white'}}>
          <h3 className={classes.navigation}>Sobre</h3>
          </Link>
          {/* <Button color="inherit">Login</Button>
          <Button color="inherit" to="/new">Cadastro</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="temporary"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
{/*                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
 */}                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
{/*                 <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
 */}                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}