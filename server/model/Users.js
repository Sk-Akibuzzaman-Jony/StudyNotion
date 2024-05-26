const mongoose = require("mongoose");
const autopopulate = require('mongoose-autopopulate');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required: true,
    },
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
        //autopopulate: true, // this is causing to not log in, for some reason
    },
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],
    image: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
    }],
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        autopopulate: true,
    }]
}, {
    timestamps: true // Enabling timestamps to automatically add createdAt and updatedAt fields
});

// This pre middleware with the remove hook will unenroll the user from the course once they are deleted
userSchema.pre('remove', async function(next) {
    console.log("Removing courses");
    const userId = this._id;

    // Remove the user from the `studentsEnrolled` array in all courses
    await mongoose.model('Course').updateMany(
        { studentsEnrolled: userId },
        { $pull: { studentsEnrolled: userId } }
    );

    next();
});
userSchema.plugin(autopopulate);
module.exports = mongoose.model("User", userSchema);