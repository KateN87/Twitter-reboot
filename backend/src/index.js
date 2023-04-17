import {app} from './main.js'
import {users} from './database.js'

const PORT = 3001;

app.listen(PORT, ()=> {
    console.log("Server is listening...")
})

app.get('/users', (req, res) => {
    res.send(users)
})