import React from 'react';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';
import SimpleAppBar from '../components/AppBar';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import { Typography, Box, Container, makeStyles, withStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginTop: theme.spacing(4),
        textAlign: 'center',
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        paddingBottom: '1em',
        paddingTop: '1em',
    },
    pos: {
        marginBottom: 12,
    },
}));

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount = () => {
        try {
            axios.get("https://my-json-server.typicode.com/pdror/repositorio-projetos-react/projects")
            //axios.get("http://localhost:8000/projects")
            .then((response) => {
                this.setState({ projects: response.data })
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const classes = this.props;
        return (
            <div className="Homepage">
                <SimpleAppBar />
                <Container className={classes.root}>
                    <Box style={{ textAlign: 'center', paddingBottom: '1em', paddingTop: '1em', fontSize: 14 }}>
                        <Typography variant="h1" color="primary" style={{ fontWeight: 500 }}>Projetos</Typography>
                    </Box>
                    <List>
                        {this.state.projects.map((project) => (
                            <div key={project.id}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Avatar>
                                            <LibraryBooks />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={project.nome} secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                            >
                                                Descrição: {project.descricao}
                                                <br />
                                        Coordenador: {project.professor}
                                                <br />
                                        Integrantes: {project.enrolledStudents}
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        ))}

                    </List>
                    <Link to="/new-project">
                        <AddButton />
                    </Link>
                </Container>
            </div>
        );
    }
};

export default withStyles(useStyles, { withTheme: true})(Homepage);