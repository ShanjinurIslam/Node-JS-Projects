const doWorkCallback = (callback) => {
    setTimeout(() => {
            //callback('Error')
            return callback(undefined, [1, 3, 5, 7])
        }, 2000)
        //callback(undefined, 'Result')
}

doWorkCallback((error, result) => {
    if (error) {
        console.log(error)
    } else {
        console.log(result)
    }
})