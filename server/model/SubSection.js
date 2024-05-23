const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    
    title:{
        type:String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type:String,
    },
    videoUrl:{
        type:String,
    },


});


subSectionSchema.pre('remove', async function (next) {
    try {
        const subSectionId = this._id;

        // Find all sections containing this subsection and remove the reference
        await Section.updateMany(
            { subSection: subSectionId },
            { $pull: { subSection: subSectionId } }
        );

        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model("SubSection", subSectionSchema);