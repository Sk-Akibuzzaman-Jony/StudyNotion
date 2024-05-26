const mongoose = require("mongoose");


// Define the Courses schema
const coursesSchema = new mongoose.Schema({
    courseName: { type: String },
    courseDescription: { type: String },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    
    },
    whatYouWillLearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        
        },
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        
        },
    ],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: "Category",
    
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",  // Corrected the ref to "User" to match the User model
        
        },
    ],
    instructions: {
        type: [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"],
    },
    sold: { type: Number, default: 0 }
}, {
    timestamps: true // Enabling timestamps to automatically add createdAt and updatedAt fields
});


// Export the Courses model
module.exports = mongoose.model("Course", coursesSchema);
