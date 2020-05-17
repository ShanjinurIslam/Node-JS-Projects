require('../db/mangoose')
const User = require('../models/user')
const Task = require('../models/task')

const updateAgeAndCount = async(id, age) => {
    const user = await User.findByIdAndUpdate(id, { age: age })
    const count = await User.countDocuments({ age: age })
    return count
}

// const count = updateAgeAndCount('5ebe9d092676c04408f7ef0a', 23)
// count.then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteAndCount = async(id, completed) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: completed })
    return count
}

deleteAndCount('5ebec0b034d7df4e652d8684', false).then((result) => {
    console.log(result)
}).then((e) => {
    console.log(e)
})