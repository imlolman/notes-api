const Note = require('../models/notes')
const AppError = require('../lib/error')

const createNote = async (title, desc, userId) => {
    const note = await Note.create({
        title,
        desc,
        userId
    })
    return note
}

const getNotes = async (userId) => {
    return await Note.find({userId})
}

const getNoteById = async (noteId, userId) => {
    const note = await Note.findOne({ _id: noteId, userId })
    if (!note) {
        throw new AppError('Note not found!', 404)
    }
    return note
}

const modifyNote = async (noteId, payload, userId) => {
    const note = await Note.findOne({ _id: noteId, userId })
    if (!note) {
        throw new AppError('Note not found!', 404)
    }
    const { title, desc } = payload
    const query = {
        $set: {}
    }
    if (title) {
        query.$set.title = title
    }
    if (desc) {
        query.$set.desc = desc
    }
    return await Note.findOneAndUpdate({ _id: noteId }, query, { new: true })
}

const deleteNote = async (noteId, userId) => {
    return await Note.deleteOne({ _id: noteId, userId })
}

module.exports = {
    createNote,
    getNoteById,
    getNotes,
    modifyNote,
    deleteNote
}
