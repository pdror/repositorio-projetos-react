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
    idade: Yup.number().required("Campo obrigatório").min(16, "Idade mínima de 16 anos"),
    cpf: Yup.number().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório").min(9, "Formato inválido").max(9, "Formato inválido"),
    curso: Yup.string().required("Campo obrigatório"),
    endereco: Yup.string().required("Campo obrigatório"),
    numero: Yup.number().optional(),
    complemento: Yup.string().optional(),
    bairro: Yup.string().required("Campo obrigatório"),
    cidade: Yup.string().required("Campo obrigatório"),
    cep: Yup.string().required("Campo obrigatório").min(8, "Formato inválido").max(8, "Formato inválido")
});

const Formulario = () => {
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

        axios.post("https://my-json-server.typicode.com/pdror/repositorio-projetos-react/students", {
        //axios.post("http://localhost:8000/students", {
            nome: values.nome,
            idade: values.idade,
            cidade: values.cidade,
            cpf: values.cpf,
            complemento: values.complemento,
            curso: values.curso,
            matricula: values.matricula,
            bairro: values.bairro,
            cep: values.cep,
            endereco: values.endereco,
            numero: values.numero
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
            idade: '',
            cpf: '',
            matricula: '',
            curso: '',
            endereco: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            cep: ''
        }}
            validationSchema={schema}
            onSubmit={handleSubmit}
        >
            {({ values, isSubmitting }) => (
                <Form>
                    <MyTextField label="Nome Completo*" name="nome" />
                    <MyTextField label="Idade*" name="idade" />
                    <MyTextField label="CPF*" name="cpf" />
                    <MyTextField label="Matrícula*" name="matricula" />
                    <MyTextField label="Curso*" name="curso" />
                    <MyTextField label="Endereço*" name="endereco" />
                    <MyTextField label="Número" name="numero" />
                    <MyTextField label="Complemento" name="complemento" />
                    <MyTextField label="Bairro*" name="bairro" />
                    <MyTextField label="Cidade*" name="cidade" />
                    {/* <FormControl fullWidth>
                                <InputLabel className={classes.inputLabel}>Estado</InputLabel>
                                <Select fullWidth className={classes.select} variant="outlined" label="Estado" name="estado">
                                    <MenuItem value="default" disabled>
                                        Estado
                                    </MenuItem>
                                    {estadosArray.map(estado => (
                                        <MenuItem key={estado.ID} value={estado.Sigla}>{estado.Nome}</MenuItem>
                                    ))}
                                </Select>
                                </FormControl> */}
                    <MyTextField label="CEP*" name="cep" />
                    <Button type="submit" disabled={isSubmitting} color="primary">
                        Cadastrar
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default Formulario;