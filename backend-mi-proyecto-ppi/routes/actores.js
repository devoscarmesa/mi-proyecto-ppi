const { Router } = require("express")
const router = Router()
const {connection} = require('../db/mysql')
    
router.get("/actores", (req, res) => {
    connection.connect()
    connection.query('SELECT * FROM actores',  (error, rows, fields) => {
        if(!error){
          connection.end()
          res.json(rows)
        }else{
            res.json({error: "Error ejecutando la consulta"})
        }
    })
})

  
module.exports = router