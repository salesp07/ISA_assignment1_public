const express = require('express')
const router = express.Router()
const axios = require('axios')

// require model and load it with 'await'
const pokeFile = require('../models/pokemon.js')
let Pokemon = null;
(async () => {
    Pokemon = await pokeFile.getModel()
})();

// Middleware
function isIdDigit(req, res, next) {
    //Check if id passed contains only digits
    if (!(/^\d+$/.test(req.params.id))) {
        return res.status(400).json({
            errMsg: 'CastError: pokemon id must contain only digits'
        })
    }
    return next()
}

//Error handler function
function errorHandler(res, err) {
    if (err.name == "MongoServerError" && err.code == 11000) {
        return res.status(400).json({errMsg: "Duplicate pokemon"})
    } else if (err.name == "ValidationError"){
        return res.status(400).json({errMsg: "Invalid pokemon data. " + err})
    } else return res.status(400).json({errMsg: ""+err})

}

// Route to repopulate DB 
router.get('/repopulate', (req, res) => {
    axios.get(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/pokedex.json`)
    .then(async response => {
        await Pokemon.deleteMany({})
        await Pokemon.insertMany(response.data)
        res.status(201).json(response.data);
    }).catch(error => {
        res.status(400).json({
            errMsg: "Sorry, I couldn't find any information about that repo."
        });
    });
})

// Routes

router.get('/pokemons', async (req, res) => {
    const count = req.query.count || 10;
    const after = req.query.after;
    try {
        let pokemons = await Pokemon.find().skip(after).limit(count);
        if (pokemons && pokemons.length > 0) res.status(200).json(pokemons)
        else res.status(404).json({
            errMsg: "No Pokemons found"
        })
    } catch (err) {
        return errorHandler(res, err)
    }
})

router.get('/pokemon/:id', isIdDigit, async (req, res) => {
    try {
        let pokemon = await Pokemon.findOne({
            id: req.params.id
        });
        if (pokemon) res.status(200).json(pokemon)
        else res.status(404).json({
            errMsg: "Pokemon not found"
        })
    } catch (err) {
        return errorHandler(res, err)
    }
})

router.post('/pokemon', async (req, res) => {
    try {
        let pokemon = await Pokemon.create(req.body);
        if (pokemon) res.status(201).json({
            msg: "Added Successfully"
        })
        else res.status(404).json({
            errMsg: "Couldn't create pokemon"
        })
    } catch (err) {
        return errorHandler(res, err)
    }
})

router.put('/pokemon/:id', isIdDigit, async (req, res) => {
    try {
        let pokemon = await Pokemon.findOneAndUpdate({
            id: req.params.id
        }, req.body, {
            new: true,
            upsert: true
        });
        if (pokemon) {
            response = {
                msg: "Upserted Successfully",
                pokeInfo: pokemon
            }
            res.status(200).json(response)
        } else res.status(404).json({
            errMsg: "Couldn't upsert pokemon"
        })
    } catch (err) {
        return errorHandler(res, err)
    }
})

router.patch('/pokemon/:id', isIdDigit, async (req, res) => {
    try {
        let pokemon = await Pokemon.findOneAndUpdate({
            id: req.params.id
        }, req.body, {
            new: true
        });
        if (pokemon) {
            response = {
                msg: "Updated Successfully",
                pokeInfo: pokemon
            }
            res.status(200).json(response)
        } else res.status(404).json({
            errMsg: "Pokemon not found"
        })
    } catch (err) {
        return errorHandler(res, err)
    }
})

router.delete('/pokemon/:id', isIdDigit, async (req, res) => {
    try {
        let pokemon = await Pokemon.findOneAndDelete({
            id: req.params.id
        });
        if (pokemon) {
            response = {
                msg: "Deleted Successfully",
                pokeInfo: pokemon
            }
            res.status(200).json(response)
        } else res.status(404).json({
            errMsg: "Pokemon not found"
        })
    } catch (err) {
        return errorHandler(res, err)
    }
})

router.get('/pokemonImage/:id', isIdDigit, async (req, res) => {
    try {
        let pokemon = await Pokemon.findOne({
            id: req.params.id
        });
        if (pokemon) {
            newId = ("0".repeat(3 - req.params.id.length)) + req.params.id
            res.status(200).json({
                url: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${newId}.png`
            })
        } else res.status(404).json({
            errMsg: "Pokemon not found"
        })
    } catch (err) {
        return errorHandler(res, err)
    }
})

module.exports = router