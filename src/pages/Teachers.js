import React from 'react';
import AddButton from '../components/AddButton';
import { Link } from 'react-router-dom';
import SimpleAppBar from '../components/AppBar';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle'
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

class Teachers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount = () => {
        try {
            axios.get("https://my-json-server.typicode.com/pdror/repositorio-projetos-react/teachers")
            //axios.get("http://localhost:8000/teachers")
            .then((response) => {
                console.log(response.data);
                this.setState({ teachers: response.data })
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
                        <Typography variant="h1" color="primary" style={{ fontWeight: 500 }}>Professores</Typography>
                    </Box>
                    <List>
                        {this.state.teachers.map((teacher) => (
                            <div key={teacher.id}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Avatar>
                                            <AccountCircle />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={teacher.nome} secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                            >
                                                Matrícula: {teacher.matricula}
                                                <br />
                                        Formação: {teacher.formacao}
                                                <br />
                                        Área: {teacher.area}
                                                <br />
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        ))}

                    </List>
                    <Link to="/new-teacher">
                        <AddButton />
                    </Link>
                </Container>
            </div>
        );
    }
};

export default withStyles(useStyles, { withTheme: true})(Teachers);