const Section = require("../model/Section");
const Course = require("../model/Course");

exports.createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
              $push: {
                courseContent: newSection._id,
              },
            },
            { new: true }
          ).populate('courseContent');
        //return response
        return res.status(200).json({
            success:true,
            message:'Section created successfully',
            updatedCourseDetails,
        })
    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to create Section, please try again",
            error:error.message,
        });
    }
}

exports.updateSection = async (req,res) => {
    try {

        //data input
        const {sectionName, sectionId, courseId} = req.body;
        //data validation
        if(!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});
        const updatedCourse = await Course.findById(courseId)
        .populate({
          path: 'courseContent',
          populate: {
            path: 'subSection',
          },
        });
        //return res
        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully',
            updatedCourse
        });

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        });
    }
};


exports.deleteSection = async (req,res) => {
    try {
        //get ID - assuming that we are sending ID in params
        const {sectionId, courseId} = req.body;
        //use findByIdandDelete
        await Section.findByIdAndDelete(sectionId);

        const updatedCourse = await Course.findById(courseId)
        .populate({
          path: 'courseContent',
          populate: {
            path: 'subSection',
          },
        });

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
            updatedCourse,
        })

    }
    catch(error) {
        return res.status(500).json({
            success:false,
            message:"Unable to delete Section, please try again",
            error:error.message,
        });
    }
}