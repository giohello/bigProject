import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  img_url: { type: String, default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/250px-Default_pfp.svg.png' },
  money: { type: Number, default: 0 },
});

export const User = mongoose.model('User', UserSchema);