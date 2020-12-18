import React from 'react';
import axios from 'axios';
import SimpleAppBar from '../components/AppBar';
import { Typography, Box, Container, makeStyles, withStyles } from '@material-ui/core'

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

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            about: ''
        }
    }

    componentDidMount() {
        try {
            //axios.get("https://my-json-server.typicode.com/pdror/atv8-router/about")
            axios.get("http://localhost:8000/about")
                .then((response) => {
                    this.setState({ about: response.data })
                })
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const classes = this.props;
        return (
            <div className="About">
                <SimpleAppBar />
                <Container>
                    <Box style={{ textAlign: 'center', paddingBottom: '1em', paddingTop: '1em', fontSize: 14 }}>
                        <Typography variant="h1" color="primary" style={{ fontWeight: 500 }}>Sobre</Typography>
                    </Box>
                    <Typography variant="body1">
                        {this.state.about.descricao}
                    </Typography>
                    <Typography variant="h6">
                        Equipe: {this.state.about.integrante1}, {this.state.about.integrante2}, {this.state.about.integrante3} e {this.state.about.integrante4} 
                    </Typography>
                    <Typography variant="h6">
                        Links úteis:
                    </Typography>
                    <p><a href={this.state.about.github} target="_blank" rel="noreferrer">Github</a></p>
                    <p><a href={this.state.about.server} target="_blank" rel="noreferrer">JSON Server</a></p>
                </Container>
            </div>
        );
    }
};

export default withStyles(useStyles, { withTheme: true})(About);