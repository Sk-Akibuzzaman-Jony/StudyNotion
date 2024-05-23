const SubSection = require("../model/SubSection");
const Section = require("../model/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Course = require("../model/Course");
//create SubSection

exports.createSubSection = async (req, res) => {
    try {
      // Fetch data from Req body
      const { courseId, sectionId, title, timeDuration, description } = req.body;
      // Extract file/video
      const video = req.files.videoFile;
      // Validation
      if (!courseId || !sectionId || !title || !timeDuration || !description || !video) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required',
        });
      }
      // Upload video to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
      // Create a sub-section
      const subSectionDetails = await SubSection.create({
        title: title,
        timeDuration: timeDuration,
        description: description,
        videoUrl: uploadDetails.secure_url,
      });
      // Update section with this sub-section ObjectId
      const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $push: {
            subSection: subSectionDetails._id,
          },
        },
        { new: true }
      ).populate('subSection');
  
      // Find the course and populate sections and subsections
      const updatedCourse = await Course.findById(courseId)
        .populate({
          path: 'courseContent',
          populate: {
            path: 'subSection',
          },
        });
  
      // Return response
      return res.status(200).json({
        success: true,
        message: 'Sub Section Created Successfully',
        updatedCourse,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  

//HW: updateSubSection
exports.updateSubSection = async (req, res) => {
    try {
        //fetch details
        const {subSectionID, title, timeDuration, description, courseId} = req.body;

        //extract file/video
        const video  = req.files.videoFile;

        //validation
        if(!subSectionID || !courseId) {
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

        // Find the course and populate sections and subsections
      const updatedCourse = await Course.findById(courseId)
      .populate({
        path: 'courseContent',
        populate: {
          path: 'subSection',
        },
      });

        return res.status(200).json({
            success:true,
            message:"Successfully updated db",
            updatedCourse,
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
        const {subSectionID, courseId} = req.body;
    
        //validation
        if(!subSectionID || !courseId){
            return res.status(400).json({
                success:false,
                message:"Provide All the Fields",
            })
        }
    
        //delete the subsection
        await SubSection.findByIdAndDelete({_id:subSectionID});

        const updatedCourse = await Course.findById(courseId)
        .populate({
          path: 'courseContent',
          populate: {
            path: 'subSection',
          },
        });
    
        return res.status(200).json({
            success:true,
            message:"Successfully deleted subsection",
            updatedCourse
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }

}   