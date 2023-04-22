const axios = require("axios")
const { Dogs } = require("../db")
const process = require("dotenv").config()

const endpoint = process.parsed.ENDPOINT

async function getDogs(req, res) {
    try {
        const { data } = await axios.get(endpoint)
        
        res.status(200).json(data.map((r)=>{
            return {id:r.id,
            name:r.name,
            image:r.image.url,
            weight:r.weight.imperial,
            height:r.height.imperial,
            age:r.life_span}
        }))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = getDogs