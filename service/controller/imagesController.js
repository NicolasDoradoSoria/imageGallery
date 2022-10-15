import Photo from '../models/Photo'
import cloudinary from 'cloudinary'
import fs from 'fs-extra'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// muestra imagenes
export const getImages = async (req, res) => {
    try {
        const photos = await Photo.find()
        res.status(200).json({ photos });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "hubo un error" });
    }
}

// sube una imagen
export const postImage = async (req, res) => {
    const { title, descripcion } = req.body
    const result = await cloudinary.v2.uploader.upload(req.file.path)
    const newPhoto = new Photo({ title, descripcion, imageURL: result.url, public_id: result.public_id })

    try {
        await newPhoto.save()
        await fs.unlink(req.file.path)
        res.status(200).json({ msg: "received" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "hubo un error" });
    }
}

// elimina una imagen
export const deleteImage = async (req, res) => {
    const { idImage } = req.params;

    try {
        // busca la imagen en el BD
        const photo = await Photo.findById(idImage);

        // comprobamos que exista la imagen
        if (!photo) return res.status(404).json({ msg: "no existe esa imagen" });
        // eliminados de bd la imagen
        await Photo.findByIdAndDelete(idImage)
        // eliminados de claudinary la imagen
        await cloudinary.v2.uploader.destroy(photo.public_id)
        res.status(200).json({ msg: "se a eliminado correctamente" });

    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: "hubo un error" });
    }
}

// filtrado de imagen  por id
export const getImageById = async (req, res) => {

    try {
        // buscamos la imagen
        const image = await Photo.findById(req.params.imageId)
        
        // verificamos que exista la iamgen
        if(image) return res.status(404).json({msg: "la imagen no existe"})
        
        res.status(200).json(image);
    } catch (error) {
        res.status(500).send("hubo un error");
    }
};