import {Link} from 'react-router-dom'

export const RegisterLoginDialogue = () => {
    return(
        <div id="registerlogindialogue">
            <h2>Är du ny på twitter?</h2>
            <p id="registerp">Registrera dig nu och få en personlig tidslinje!</p>
            <Link to="/signup"> <button id="skapakonto">Skapa ett konto</button></Link>
        </div>
    )
}