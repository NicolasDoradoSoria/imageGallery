import User from '../models/User'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

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

export const loginUser = async (req, res) => {
    // extraedr el email y passowrd
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email: email })
        // rrevisamos que sea un usuario regustrado
        if (!user) return res.status(400).json({ msg: "el usuario no existe" })

        // comparamos la contraseña con la ya guardada
        const correctPass = await bcryptjs.compare(password, user.password);

        if (!correctPass) return res.status(401).json({ msg: "password incorrecto" });

        // si todo es correcto crea y firma el JWT
        const payload = { user: { id: user.id } };
        //firmar el JWT
        jwt.sign(
            payload, process.env.SECRETA,
            { expiresIn: 36000, },
            (error, token) => {
                if (error) throw error;

                //mensaje de confirmacion
                res.json({ token });
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send("hubo un error");
    }
}