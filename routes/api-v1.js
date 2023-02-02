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
        err.errMsg = "Duplicate pokemon"
        return res.status(400).json(err)
    } else if (err.name == "ValidationError"){
        err.errorMsg = "Invalid data"
        return res.status(400).json(err)
    } else return res.status(400).json(err)

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
            text: "Sorry, I couldn't find any information about that repo."
        });
    });
})

// Only uncomment next line if repopulating the DB is necessary
// populateDB()


// Routes

router.get('/pokemons', async (req, res) => {
    const count = req.query.count || 10;
    const after = req.query.after;
    try {
        let pokemons = await Pokemon.find().skip(after).limit(count);
        if (pokemons) res.status(200).json(pokemons)
        else res.status(404).json({
            errMsg: "Pokemon not found"
        })
    } catch (err) {
        res.status(400).json("Error while finding all pokemons: " + err)
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
        res.status(400).json("Error while getting Pokemon" + err)
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
        res.status(400).json(`Error while upserting pokemon: ${err}`)
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
        res.status(400).json(`Error while patching pokemon: ${err}`)
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
        res.status(400).json(`Error while deleting pokemon: ${err}`)
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
                url: `https://github.com/fanzeyi/pokemon.json/blob/master/images/${newId}.png`
            })
        } else res.status(404).json({
            errMsg: "Pokemon not found"
        })
    } catch (err) {
        res.status(400).json(`Error while finding pokemon with id ${req.params.id}: ${err}`)
    }
})

module.exports = router