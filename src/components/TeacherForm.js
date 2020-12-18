import React from 'react';
import { Formik, Form, useField } from 'formik';
import { TextField, Button, makeStyles, FormControl } from '@material-ui/core';
import * as Yup from 'yup';
//import estadosArray from '../helpers/estados';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: 'center',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    navigation: {
        paddingRight: 20,
    },
    grid: {
        marginTop: theme.spacing(2),
    },
    field: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    button: {
        left: '45%'
    },
    select: {
        marginBottom: theme.spacing(2),
        marginRight: theme.spacing(2),
    },
    inputLabel: {
        marginLeft: theme.spacing(2),
    }
}));

const schema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório").min(10, "Muito curto"),
    matricula: Yup.string().required("Campo obrigatório").min(9, "Formato inválido").max(9, "Formato inválido"),
    formacao: Yup.string().required("Campo obrigatório"),
    area: Yup.string().required("Campo obrigatório"),
    numero: Yup.number().optional()
});

const TeacherForm = () => {
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

    const handleSubmit = (values, { setSubmitting }) => {

        //axios.post("https://my-json-server.typicode.com/pdror/atv8-router/alunos", {
        axios.post("http://localhost:8000/teachers", {
            nome: values.nome,
            area: values.area,
            matricula: values.matricula,
            formacao: values.formacao
        }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res);
                console.log("====== CADASTRADO =======")
            })
            .catch(err => console.log(err));
    }

    return (
        <Formik initialValues={{
            nome: '',
            matricula: '',
            formacao: '',
            area: '',
        }}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting }) => (
                <Form>
                    <MyTextField label="Nome Completo*" name="nome" />
                    <MyTextField label="Matrícula*" name="matricula" />
                    <MyTextField label="Formação*" name="formacao" />
                    <MyTextField label="Área de atuação*" name="area" />
                    <Button type="submit" disabled={isSubmitting} color="primary">
                        Cadastrar
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default TeacherForm;