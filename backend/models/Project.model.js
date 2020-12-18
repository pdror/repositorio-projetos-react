const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId;

const ProjectSchema = new Schema({
  nome       : { type: String, required: true  },
  descricao : { type: String, required: true  },
  slug        : { type: String, unique: true, required: true  },
  enrolledStudents : [{
    type: ObjectId,
    ref: "users"
  }],
  professor  : {
    type: ObjectId,
    ref: "users"
  }
});

var Project = mongoose.model('projects', ProjectSchema);