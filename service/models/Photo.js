import {Schema, model} from 'mongoose'

const Photo =new Schema({
    title: String,
    description: String,
    imageURL: String,
    public_id: String
},
{
  timestamps: true,
  versionKey: false
})

export default model("Photo", Photo)