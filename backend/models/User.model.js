const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  nome: { type: String },
  email: { type: String },
  password: { type: String },
  isTeacher: { type: Boolean, default: false },
  idade: { type: String },
  cpf: { type: String },
  matricula: { type: String },
  curso: { type: String },
  endereco: { type: String },
  numero: { type: String },
  complemento: { type: String },
  bairro: { type: String },
  cidade: { type: String },
  estado: { type: String },
  cep: { type: String },
  enrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects'
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'projects'
  }]
});

mongoose.model('users', UserSchema);