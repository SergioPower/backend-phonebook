const mongoose = require('mongoose')

// Validación de argumentos
if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

// Obtener argumentos
const password = process.argv[2]
const $name = process.argv[3]
const $number = process.argv[4]

// Conexión a la base de datos MongoDB
const url =
  `mongodb+srv://serguzdev99:${password}@cluster0.7w0u8.mongodb.net/AgendaDB?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery', false)
mongoose.connect(url)

// Definir un esquema
const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true }
})

const Person = mongoose.model('Person', personSchema)

// Si no se proporcionan nombre y número, listar todas las entradas
if (!$name || !$number) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    // Si se proporcionan nombre y número, agregar una nueva entrada
    const person = new Person({
        name: $name,
        number: $number
    })

    person.save().then(() => {
        console.log(`added ${$name} number ${$number} to phonebook`)
        mongoose.connection.close()
    })
}
