import React from 'react';
import SimpleAppBar from '../components/AppBar';
import ProjectForm from '../components/ProjectForm';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginTop: theme.spacing(4),
        textAlign: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
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

const NewProject = () => {
    const classes = useStyles();

    return(
    <div className="NewProject">
        <SimpleAppBar />
        <Container>
            <Box className={classes.title}>
                <Typography variant="h1"  color="primary" style={{ fontWeight: 500 }}>Novo Projeto</Typography>
            </Box>
                <ProjectForm />
        </Container>
    </div>
    );
};

export default NewProject;