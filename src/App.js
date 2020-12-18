import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import About from './pages/About';
import Homepage from './pages/Homepage';
import NovoAluno from './pages/NovoAluno';
import Project from './pages/Projects';
import NewProject from './pages/NewProject';
import Teachers from './pages/Teachers';
import NewTeacher from './pages/NewTeacher';

const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: purple,
      secondary: green,
    },
    typography: {
      fontFamily: "Rubik",
      h1: {
        fontSize: "2.8em",
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/new" component={NovoAluno} />
        <Route path="/about" component={About} />
        <Route path="/projects" component={Project} />
        <Route path="/new-project" component={NewProject} />
        <Route path="/teachers" component={Teachers} />
        <Route path="/login" component={LoginPage} />
        <Route path="/new-teacher" component={NewTeacher} />
        <Route component={Homepage} />
      </Switch>
    </ThemeProvider>
  );
}

export default App;
