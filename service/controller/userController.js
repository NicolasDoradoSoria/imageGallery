import User from '../models/User'
import bcryptjs from "bcryptjs"

// registar Usuario
export const registerUser = async (req, res) => {

    try {
        // devuelve el body limpio o sea solo los datos
        const { password, confirmPassword, firstName, lastName, email } = req.body

        // compara las dos contraseñas 
        if (password !== confirmPassword) return res.status(400).json({ msg: "las contraseñas no coinciden!" })
    
        // reviso si el email ya a sido registrado
        const userFound = await User.findOne({ email: req.body.email })
        if (userFound) return res.status(400).json({ msg: "el email ya existe" })

        // creamos un nuevo usuario
        let newUser = new User({ confirmPassword, firstName, lastName, email })

        // hashea el password
        const salt = await bcryptjs.genSalt(10);
        newUser.password = await bcryptjs.hash(password, salt);

        // guardamos un usuario en mongo
        await newUser.save()

        return res.status(200).json({ msg: "se registro con existo!" })

    } catch (error) {
        console.log(error)
        res.status(500).send("hubo un error");
    }
}