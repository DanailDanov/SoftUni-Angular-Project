const { themeModel } = require('../models');
const { newPost } = require('./postController')

function getThemes(req, res, next) {

    // const { category } = req.body;

    // if (category === 'chair') {
    //     return themeModel.find({ category: category }).then(themes => res.json(themes)).catch(next);
    // } else if (category === 'table') {
    //     return themeModel.find({ category: category }).then(themes => res.json(themes)).catch(next);
    // }

    return themeModel.find()
        .populate('userId')
        .then(themes => res.json(themes))
        .catch(next);
}

//My route
function getThemesCategory(req, res, next) {
    const { category } = req.params;

    themeModel.find({category: category}).then(themes => console.log( res.json(themes)))
}

function getLatestsThemes(req, res, next) {
    const limit = Number(req.query.limit) || 0;

    themeModel.find()
        .sort({ created_at: -1 })
        .limit(limit)
        .populate('userId')
        .then(themes => {
            res.status(200).json(themes)
        })
        .catch(next);
}

function getTheme(req, res, next) {
    const { themeId } = req.params;

    themeModel.findById(themeId)
        .populate({
            path: 'posts',
            populate: {
                path: 'userId'
            }
        })
        .then(theme => res.json(theme))
        .catch(next);
}

function createTheme(req, res, next) {
    const { title, price, category, image, description } = req.body;
    const { _id: userId } = req.user;

    themeModel.create({ title, price, category, image, description })
        .then(theme => {
            // newPost(postText, userId, theme._id)
            //     .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
            res.json(theme)
        })
        .catch(next);
}

function subscribe(req, res, next) {
    const themeId = req.params.themeId;
    const { _id: userId } = req.user;
    themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}

module.exports = {
    getThemes,
    getLatestsThemes,
    createTheme,
    getTheme,
    subscribe,
    getThemesCategory,
}
