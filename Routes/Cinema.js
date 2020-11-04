const express = require('express');
const router = express.Router();
const Cinema = require('../Models/Cinema');
const multer = require('multer');
const uniqueFilename = require('unique-filename');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
const fs = require('fs').promises;
const dirName = 'assets/images/'
const {isValidId} = require('../Middleware/isValidId')


router.post('/create', upload.single('frame', 12), async (req, res) => {
    try {
        const ext =  req.file.mimetype.replace('image/', '');
        const filePath = `${uniqueFilename(dirName) + '.' + ext}`

        await fs.writeFile('public/' + filePath, req.file.buffer);
        const cinemaModel = await Cinema.create({
            frame: [filePath],
            title: [req.body.name]
        })
        res.json(cinemaModel);
    }
    catch (e) {
        res.status(500).send('Something was wrong')
        console.error(e)
    }
});


router.get('/get_last_remember',  async (req, res) => {
    try {
        const id = req.session.correctAnswer;
        console.log({id})
        let cinema;
        if (id && isValidId(id)) {
            cinema = await Cinema.getNext(id)
        }else {
            cinema = await Cinema.findOne({})
        }
        let randomTitles = await Cinema.randomTitle();
        randomTitles = randomTitles.filter(item => item !== cinema.title[0]);
        randomTitles = randomTitles.slice(0, 3);

        res.json({
            randomTitles,
            ...cinema._doc
        });
    }
    catch (e) {
        res.status(500).send('Something was wrong')
        console.error(e)
    }
});


router.get('/:id',  async (req, res) => {
    try {
        const id = req.params.id;
        const cinema = await Cinema.findById(id)
        let randomTitles = await Cinema.randomTitle();
        randomTitles = randomTitles.filter(item => item !== cinema.title[0]);
        randomTitles = randomTitles.slice(0, 3);

        res.json({
            randomTitles,
            ...cinema._doc
        });
    }
    catch (e) {
        res.status(500).send('Something was wrong')
        console.error(e)
    }
});


router.post('/answer',  async (req, res) => {
    try {
        const id = req.body._id;
        req.session.correctAnswer = id;
        res.send('')
        console.log(req.session.correctAnswer)
    }
    catch (e) {
        res.status(500).send('Something was wrong')
        console.error(e)
    }
});




module.exports = router;