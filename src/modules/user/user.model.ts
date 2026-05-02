/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from './user.interface'
import config from '../../config'
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    frist: {
      type: String,
      required: [true, 'Please Enter your Frist Name'],
    },
    last: {
      type: String,
      required: [true, 'Please Enter your Last Name'],
    },
  },
  // age: {
  //   type: Number,
  //   required: [true, 'Please Enter your age'],
  // },
  age: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, 'Please Enter your email'],
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      },
      message: '{VALUE} is not a valid email',
    },
    immutable: true,
  },
  password: {
    type: String,
    required: true,
    // select: false,  dewa hole error dibe login er somoy:  "message": "data and hash arguments required",
  },
  photo: String,
  role: {
    type: String,
    enum: {
      values: ['user', 'admin'],
      message: '{VALUE}is not not a valid role',
    },
    default: 'user',
    required: true,
  },

  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    required: true,
  },
})

//Hook - pre, post
// userSchema.pre('find', function (this, next) {
//   this.find({
//     userStatus: { $eq: 'active' },
//   })
//   next()
// })

// userSchema.post('find', function (docs, next) {
//   docs.forEach((doc: IUser) => {
//     doc.name = doc.name.toUpperCase()
//   })
//   next()
// })

userSchema.pre('save', async function (next) {
  const user = this

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

const User = model<IUser>('User', userSchema)
export default User
