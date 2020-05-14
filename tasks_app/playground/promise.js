const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve([1, 3, 5, 7])
        reject('This is error')
    }, 2000)
})

doWorkPromise.then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})