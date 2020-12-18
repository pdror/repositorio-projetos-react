import React, { Component } from 'react';
import ButtonAppBar from '../components/AppBar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import { TextField, Button, makeStyles, FormControl, Container } from '@material-ui/core';
import { Formik, Form, useField } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
        marginTop: theme.spacing(7),
        textAlign: 'center',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

const schema = Yup.object().shape({
    email: Yup.string().required("Campo obrigatório").min(5, "Muito curto"),
    password: Yup.string().required("Campo obrigatório").min(5, "Muito curto"),
});

const LoginPage = () => {
    const history = useHistory();
    const classes = useStyles();

    const MyTextField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        const errorText = meta.error && meta.touched ? meta.error : "";

        return (
            <TextField
                fullWidth
                className={classes.field}
                variant="outlined"
                label={label}
                {...field}
                helperText={errorText}
                error={!!errorText}
            />
        );
    }

    const handleSubmit = ( values, { setSubmitting }) => {
        try {
            axios.post("http://localhost:5000/api/login", {
                email: values.email,
                password: values.password
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    if(res.status === 200) {
                        localStorage.setItem('token', res.data.token)
                        history.push("/");
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        } catch (e) {
            console.log(e);
            alert("Erro ao logar");
        }
    }

    return (
        <>
            <ButtonAppBar />
            <Container>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography variant="h4" color="primary">Login</Typography>
                        <Formik initialValues={{ email: '', password: '' }} validationSchema={schema} onSubmit={handleSubmit}>
                            {({ values, isSubmitting }) => (
                                <Form>
                                    <FormControl>
                                        <MyTextField label="Email" name="email" />
                                        <MyTextField label="Senha" name="password" />
                                        <Button type="submit" disabled={isSubmitting} color="primary" variant="outlined">
                                            Entrar
                                        </Button>
                                    </FormControl>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;