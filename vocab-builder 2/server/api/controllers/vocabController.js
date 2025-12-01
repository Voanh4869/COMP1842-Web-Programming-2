const Vocab = require('../models/vocabModel');

// List all words
exports.list_all_words = async (req, res) => {
    try {
        const words = await Vocab.find({});
        return res.json(words);
    } catch (err) {
        return res.status(500).send(err);
    }
}

// Create a new word
exports.create_a_word = async (req, res) => {
    try {
        const newWord = new Vocab(req.body);
        const word = await newWord.save();
        return res.status(201).json(word);
    } catch (err) {
        return res.status(500).send(err);
    }
}

// Read a word by ID
exports.read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.wordId);
        if (!word) return res.status(404).json({ error: 'Word not found.' });
        return res.json(word);
    } catch (err) {
        return res.status(500).send(err);
    }
}

// Update a word by ID
exports.update_a_word = async (req, res) => {
    try {
        const word = await Vocab.findByIdAndUpdate(
            req.params.wordId,
            req.body,
            { new: true }
        );
        if (!word) return res.status(404).json({ error: 'Word not found.' });
        return res.json(word);
    } catch (err) {
        return res.status(500).send(err);
    }
}

// Delete a word by ID
exports.delete_a_word = async (req, res) => {
    try {
        console.log('DELETE request for wordId=', req.params.wordId);
        const word = await Vocab.findByIdAndDelete(req.params.wordId);
        if (!word) {
            console.warn('Word not found for id=', req.params.wordId);
            return res.status(404).json({ error: `Word not found for id ${req.params.wordId}` });
        }
        console.log('Deleted word:', word._id);
        return res.json({ message: 'Word successfully deleted.', id: word._id });
    } catch (err) {
        console.error('Error deleting word:', err);
        return res.status(500).json({ error: 'Server error deleting word', detail: err.message });
    }
}