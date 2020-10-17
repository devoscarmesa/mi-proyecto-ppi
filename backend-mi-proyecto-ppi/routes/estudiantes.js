const { Router } = require("express")
const router = Router()
const fs = require("fs")
var app = require("express")()

let FileEstudiantes = null
let JSONEstudiantes = null

const loadFile = (req) => {
  FileEstudiantes = fs.readFileSync(`${req.app.get('ABSOLUTE_PATH')}estudiantes.json`, 'utf-8')
  JSONEstudiantes = JSON.parse(FileEstudiantes)
}

router.get("/", (req, res) => {
  res.send("API REST Estudianetes")
})

router.get("/estudiantes", (req, res) => {
  loadFile(req)
  res.json(JSONEstudiantes)
})

router.get("/estudiantes/:id", (req, res) => {
  let id = req.params.id
  loadFile(req)
  let estudiante_encontrado = JSONEstudiantes.find(estudiante => estudiante.id == id)

  if (estudiante_encontrado != undefined)
    res.status(200).json(estudiante_encontrado)
  else
    res.status(200).json({})
})

router.post("/estudiantes", (req, res) => {
  let id = JSONEstudiantes.length + 1
  loadFile(req)
  /** Captura de información por Destructuring */
  let {
    nombre,
    apellido,
    correo,
    html
  } = req.body

  /** Creación de un nuevo estudiante */
  let nuevoEstudiante = {
    id: id,
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    html: html
  }

  /** Insertamos nuevo estudiante en el arreglo */
  JSONEstudiantes.push(nuevoEstudiante)

  /** Escribimos archivo */
  fs.writeFileSync('./estudiantes.json', JSON.stringify(JSONEstudiantes), 'utf-8')

  res.status(200).json(nuevoEstudiante)
})

router.put("/estudiantes/:id", (req, res) => {
  let id = req.params.id
  let {
    nombre,
    apellido,
    correo,
    html
  } = req.body
  loadFile(req)
  let estudiante_encontrado = JSONEstudiantes.find(estudiante => {
    if (estudiante.id == id) {
      estudiante.nombre = nombre
      estudiante.apellido = apellido
      estudiante.correo = correo
      estudiante.html = html
      return estudiante
    }
  })

  if (estudiante_encontrado != undefined) {
    /** Escribimos archivo */
    fs.writeFileSync('./estudiantes.json', JSON.stringify(JSONEstudiantes), 'utf-8')
    res.status(200).json(estudiante_encontrado)
  } else
    res.status(200).json('Estudiante no existe')
})

router.delete("/estudiantes/:id", (req, res) => {
  let id = req.params.id
  loadFile(req)
  let indiceEstudiante = JSONEstudiantes.findIndex(estudiante => estudiante.id == id)
  
  if(indiceEstudiante != -1){
    JSONEstudiantes.splice(indiceEstudiante, 1)
    fs.writeFileSync('./estudiantes.json', JSON.stringify(JSONEstudiantes), 'utf-8')
    res.status(200).json(indiceEstudiante + 1)
  }else{
    res.status(200).json('Estudiante no existe')
  }
})

module.exports = router