const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/Person")
const app = express()
app.use(cors())
app.use(express.json())
require('dotenv').config()

//define body field to show what data we are posting
morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))

const generateId = () => {
  //const maxId = Math.max(...persons.map(persons => persons.id))
  const randNum = Math.floor(Math.random() * 100000)
  return randNum;
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.get("/info", (request, response) => {
  const currDate = new Date();

  Person.count({}, (err, count) => {
    const msg = `Phonebook has info for ${count} people. </br></br>
    ${currDate}`;
    response.send(msg)
  })
})

app.get("/", (request, response) => {
  response.send("<h1 style='color:red'>Say hello</h1>")
})

app.get("/api/persons", (request, response) => {

  Person.find({}).then(person => {
    response.json(person)
  })
})

app.get("/api/persons/:id", (request, response) => {
  console.log(Person)
  console.log("Request Parameters", request.params)
  Person.findById(request.params.id).then(personobj => {
    if (personobj) {
      response.json(personobj)
    } else {

      response.status(404).end("404 yok boyle bisi")
    }
  })
    .catch(error => {
      console.log(error)
      response.status(500).send({ error: "malformatted id" })
    })
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post("/api/persons", (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "Bad request, missing info" })
  }
  // const nameChecker = Person.find(person => person.name.toLowerCase() === body.name.toLowerCase() ? true : false)

  // if (nameChecker) {
  //   return response.status(400).json({ error: "Name must be unique" })
  // }

  const personObj = new Person({
    "_id": generateId(),
    "name": body.name,
    "number": body.number
  })
  console.log("My Person Obj", personObj)

  personObj.save().then(savedPerson => {
    console.log("New person added to MongoDB")
    response.json(savedPerson)
  })

})

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    }).catch(error => {
      next(error)
    })
})


// get single person w/out mongo setup
// app.get("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find(person => person.id === id)

//   if (person) {
//     response.json(person)

//   } else {
//     response.status(404).end()
//   }
// })

//delete w/out mongo setup
// app.delete("/api/persons/:id", (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find(person => person.id === id)
//   if (person) {
//     persons = persons.filter(person => person.id !== id)
//     response.status(200).end()
//   }
//   else {
//     response.status(400).json({ error: "Invalid user" })
//   }
// })