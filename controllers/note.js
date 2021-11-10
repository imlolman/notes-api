const NoteService = require('../services/note')

exports.getNotes = async (req, res, next) => {
    const notes = await NoteService.getNotes(req.userId)
    return res.status(200).json({ notes })
}

exports.createNote = async (req, res, next) => {
    const { title, desc } = req.body
    const note = await NoteService.createNote(title, desc, req.userId)
    return res.status(200).json({ note })
}

exports.getById = async (req, res, next) => {
    const { noteId } = req.params
    const note = await NoteService.getNoteById(noteId, req.userId)
    return res.status(200).json({ note })
}

exports.modifyNote = async (req, res, next) => {
    const { noteId } = req.params
    const { title, desc } = req.body
    const note = await NoteService.modifyNote(noteId, { title, desc }, req.userId)
    return res.status(200).json({ note })
}

exports.deleteNote = async (req, res, next) => {
    const { noteId } = req.params
    await NoteService.deleteNote(noteId, req.userId)
    return res.status(200).json({ message: 'Note deleted!' })
}