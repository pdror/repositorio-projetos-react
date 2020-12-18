import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, makeStyles, FormControl } from '@material-ui/core';
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
    nome: Yup.string().required("Campo obrigatório").min(5, "Muito curto"),
    descricao: Yup.string().required("Campo obrigatório").min(10, "Muito curto"),
});

const ProjectForm = () => {
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
        try {
            axios.post("http://localhost:8000/projects", {
                nome: values.nome,
                descricao: values.descricao
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    console.log("Projeto salvo");
                })
                .catch(err => console.log(err));
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Formik initialValues={{ nome: '', descricao: '' }} validationSchema={schema} onSubmit={handleSubmit}>
            {({ values, isSubmitting }) => (
                <Form>
                    <FormControl>
                        <MyTextField label="Nome*" name="nome" />
                        <MyTextField label="Descrição*" name="descricao" />
                        <Button type="submit" disabled={isSubmitting} color="primary" variant="outlined">
                            Salvar Projeto
                        </Button>
                    </FormControl>
                </Form>
            )}
        </Formik>
    );
}

export default ProjectForm;
