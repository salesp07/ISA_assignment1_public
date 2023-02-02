const mongoose = require('mongoose');
const axios = require('axios')


function setupModel() {
    return new Promise(async function (resolve, reject) {
        try {
            response = await axios.get(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/types.json`)
            pokemonTypes = response.data.map(e => e.english)
            const pokemonSchema = new mongoose.Schema({
                id: {
                    type: Number,
                    unique: true,
                    required: true
                },
                name: {
                    english: {
                        type: String,
                        required: true,
                    },
                    japanese: String,
                    chinese: String,
                    french: String
                },
                type: {
                    type: [String],
                    enum: pokemonTypes,
                    required: true
                },
                base: {
                    HP: Number,
                    Attack: Number,
                    Defense: Number,
                    'Speed Attack': Number,
                    'Speed Defense': Number,
                    'Speed': Number
                }
            });
            const Pokemon = mongoose.model('pokemons', pokemonSchema);
            resolve(Pokemon)
        } catch (err) {
            console.log(`Error while creating pokemon model: ${err}`)
        }
    })

}


module.exports.getModel = setupModel