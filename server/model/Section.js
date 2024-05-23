const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    
    sectionName: {
        type:String,
    },
    subSection: [
        {
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"SubSection",    
        }
    ],


});


sectionSchema.pre('remove', async function (next) {
    try {
        const sectionId = this._id;

        await Course.updateMany(
            { courseContent: sectionId },
            { $pull: { courseContent: sectionId } }
        );

        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model("Section", sectionSchema);