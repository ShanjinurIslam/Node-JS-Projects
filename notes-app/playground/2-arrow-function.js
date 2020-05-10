const square = (a) => a * a

console.log(square(16))

const event = {
    name: 'Birthday Party',
    guestList: ['Imtiaz', 'Shamita', 'Tusar'],
    printGuestList() {
        console.log(this.name)
        console.log('Guest List')
        this.guestList.forEach((guest) => console.log(guest))
    }
}

event.printGuestList()