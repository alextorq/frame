const express = require('express');
const router = express.Router();
const Cinema = require('../Models/Cinema');
const UserStat = require('../Models/UserStat')
const multer = require('multer');
const uniqueFilename = require('unique-filename');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
const fs = require('fs').promises;
const dirName = 'assets/images/'
const {isValidId} = require('../Middleware/isValidId')


router.post('/create', upload.single('frame', 1), async (req, res) => {
    //TODO Валидация файла
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
    // TODO обработка последего кадра
    try {
        const id = req.session.correctAnswer;
        let cinema;
        if (id && isValidId(id)) {
            cinema = await Cinema.getNext(id)
        }else {
            cinema = await Cinema.findOne({})
        }

       if (cinema === null) {
           return res.status(404).send();
       }

        let randomTitles = await Cinema.randomTitle();
        randomTitles = randomTitles.filter(item => item !== cinema.title[0]);
        randomTitles = randomTitles.slice(0, 3);
        const title = [].concat(randomTitles, cinema._doc.title).sort(() => Math.random() - 0.5)

        res.json({
            ...cinema._doc,
            title
        });
    }
    catch (e) {
        res.status(500).send('Something was wrong')
        console.error(e)
    }
});


// router.get('/:id',  async (req, res) => {
//     try {
//         const id = req.params.id;
//         const cinema = await Cinema.findById(id)
//         let randomTitles = await Cinema.randomTitle();
//         randomTitles = randomTitles.filter(item => item !== cinema.title[0]);
//         randomTitles = randomTitles.slice(0, 3);
//
//         res.json({
//             randomTitles,
//             ...cinema._doc
//         });
//     }
//     catch (e) {
//         res.status(500).send('Something was wrong')
//         console.error(e)
//     }
// });

router.post('/answer',  async (req, res) => {
    try {
        // TODO перенос статистики при регистрации
        const {id, answer} = req.body;
        req.session.correctAnswer = id;
        const cinema = await Cinema.findById(id);
        const status = cinema.title.some(item => item.toLowerCase() === answer.toLowerCase());
        const sessionID = req.session.id;

        await UserStat.create({
            sessionID,
            cinema: cinema._id,
            answer: status
        });

        res.json({answer: status})
    }
    catch (e) {
        res.status(500).send('Something was wrong')
        console.error(e)
    }
});



module.exports = router;