import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        }
    },
    { timestamps: true }
);


// Hash passworrd before saving user

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next(); //only hash if pass is new or updated
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// compare plain pass with hashed pass

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// create model
const User = mongoose.model("User", userSchema);

export default User;