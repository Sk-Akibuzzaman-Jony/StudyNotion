const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//create SubSection

exports.createSubSection = async (req, res) => {
    try{
            //fecth data from Req body
            const {sectionId, title, timeDuration, description} = req.body;
            //extract file/video
            const video  = req.files.videoFile;
            //validation
            if(!sectionId || !title || !timeDuration || !description || !video) {
                return res.status(400).json({
                    success:false,
                    message:'All fields are required',
                });
            }
            //upload video to cloudinary
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            //create a sub-section
            const subSectionDetails = await SubSection.create({
                title:title,
                timeDuration:timeDuration,
                description:description,
                videoUrl:uploadDetails.secure_url,
            })
            //update section with this sub section ObjectId
            const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                        {$push:{
                                                            subSection:subSectionDetails._id,
                                                        }},
                                                        {new:true});
            //HW: log updated section here, after adding populate query
            //return response
            return res.status(200).json({
                succcess:true,
                message:'Sub Section Created Successfully',
                updatedSection,
            });
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
};

//HW: updateSubSection
exports.updateSubSection = async (req, res) => {
    try {
        //fetch details
        const {subSectionID, title, timeDuration, description} = req.body;

        //extract file/video
        const video  = req.files.videoFile;

        //validation
        if(!subSectionID) {
            return res.status(400).json({
                success:false,
                message:'subsectionID is required',
            });
        }

        //get the subsection details
        const subSectionDetails = await SubSection.findById(subSectionID);
        
        //check if subsection details is found
        if (!subSectionDetails) {
            return res.status(404).json({
                success: false,
                message: 'Subsection not found',
            });
        }

        //update
        if(title){
            subSectionDetails.title = title;
        }
        if (timeDuration) {
            subSectionDetails.timeDuration = timeDuration;
        }
        if(description){
            subSectionDetails.description = description;
        }
        //if video is given then upload to cloudinary and update the db
        if(video){
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSectionDetails.videoUrl = uploadDetails.secure_url;
        }
        await subSectionDetails.save();

        return res.status(200).json({
            success:true,
            message:"Successfully updated db",
            subSectionDetails,
        })


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}

//HW:deleteSubSection
exports.deleteSubSection = async (req, res) => {

    try {
        //fetch details
        const {subSectionID} = req.body;
    
        //validation
        if(!subSectionID){
            return res.status(400).json({
                success:false,
                message:"Provide SubSection ID",
            })
        }
    
        //delete the subsection
        await SubSection.findByIdAndDelete({_id:subSectionID});
    
        return res.status(200).json({
            success:true,
            message:"Successfully deleted subsection",
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }

}   