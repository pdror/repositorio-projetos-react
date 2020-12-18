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

class Homepage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            alunos: [],
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount = () => {
         try {
            //axios.get("https://my-json-server.typicode.com/pdror/atv8-router/alunos")
            //axios.get("https://my-json-server.typicode.com/pdror/atv8-router/alunos")
            axios.get("http://localhost:8000/students")
            .then((response) => {
                console.log(response.data);
                this.setState({ alunos: response.data })
            })
        } catch (err) {
            console.log(err);
        }
        /* fetch("http://localhost:5000/api/students", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
            .then((res) => {
                return res.json();
            }).then((users) => {
                this.setState({ alunos: users });
                console.log(users);
            })
            .catch((err) => {
              console.log(err);
            }); */
    }

    render() {
        const classes = this.props;
        return (
            <div className="Homepage">
                <SimpleAppBar />
                <Container className={classes.root}>
                    <Box style={{ textAlign: 'center', paddingBottom: '1em', paddingTop: '1em', fontSize: 14 }}>
                        <Typography variant="h1" color="primary" style={{ fontWeight: 500 }}>Lista de Alunos</Typography>
                    </Box>
                    <List>
                        {this.state.alunos.map((aluno) => (
                            <div key={aluno.id}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Avatar>
                                            <AccountCircle />
                                        </Avatar>
                                    </ListItemIcon>
                                    <ListItemText primary={aluno.nome} secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                            >
                                                Matrícula: {aluno.matricula}, CPF: {aluno.cpf}
                                                <br />
                                        Curso: {aluno.curso}
                                                <br />
                                        Idade: {aluno.idade}
                                                <br />
                                        Localização: {aluno.cidade} - {aluno.estado}, {aluno.cep}
                                            </Typography>
                                        </React.Fragment>
                                    } />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        ))}

                    </List>
                    <Link to="/new">
                        <AddButton />
                    </Link>
                </Container>
            </div>
        );
    }
};

export default withStyles(useStyles, { withTheme: true})(Homepage);