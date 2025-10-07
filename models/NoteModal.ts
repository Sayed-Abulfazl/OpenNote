const { mongoose } = require('mongoose');

const NoteSchema = new mongoose.Schema({
    author : {
        type : String,
        required : true,
    },
    body : {
        type : String,
        required : true,
    },
    gender: {
        type : String,
        required : true,
    },
}, { timestamps : true } )

const NoteModal = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default NoteModal;