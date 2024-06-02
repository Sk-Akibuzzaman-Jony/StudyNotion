const Profile = require("../model/Profile");
const User = require("../model/Users");
const Course = require("../model/Course");
const CourseProgress = require("../model/CourseProgress");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { default: mongoose } = require("mongoose");

exports.updateProfile = async (req, res) => {
    try {
        //get data
        const { dateOfBirth, about, contactNumber, gender } = req.body;
        //get userId
        const id = req.user.id;

        console.log(id);

        //validation
        if (!dateOfBirth || !about || !contactNumber || !gender) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        //find profile
        const userDetails = await User.findById(id);

        console.log(userDetails.additionalDetails);

        const profileDetails = await Profile.findById(userDetails.additionalDetails);
        if (!profileDetails) {
            return res.status(400).json({
                success: false,
                message: 'profileDetails not found',
            });
        }


        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        const user = await User.findOne({ _id: id })
            .populate({
                path: 'courses',
                populate: {
                    path: 'courseContent',
                    populate: {
                        path: 'subSection',
                    },
                },
            })
            .populate('courseProgress');

        //return response
        return res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            user,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
};


//deleteAccount
exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;

        // Validate user
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (userDetails.accountType === "Student") {
            // Unenroll the student from all courses
            await Course.updateMany(
                { studentsEnrolled: id },
                { $pull: { studentsEnrolled: id } }
            );
        } else if (userDetails.accountType === "Instructor") {
            // Delete instructor's courses and handle unenrollment and section/subsection deletion
            const instructorCourses = await Course.find({ instructor: id });

            for (const course of instructorCourses) {
                // Unenroll students from this course
                for (const studentId of course.studentsEnrolled) {
                    await User.findByIdAndUpdate(studentId, {
                        $pull: { courses: course._id },
                    });
                }

                // Delete sections and subsections
                for (const sectionId of course.courseContent) {
                    const section = await Section.findById(sectionId);
                    if (section) {
                        for (const subSectionId of section.subSection) {
                            await SubSection.findByIdAndDelete(subSectionId);
                        }
                        await Section.findByIdAndDelete(sectionId);
                    }
                }

                // Delete the course itself
                await Course.findByIdAndDelete(course._id);
            }
        }

        // Delete the user profile
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // Delete the user
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'User Deleted Successfully',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


exports.getAllUserDetails = async (req, res) => {

    try {
        //get id
        const id = req.user.id;

        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success: true,
            message: 'User Data Fetched Successfully',
            userDetails,
        });

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const uid = new mongoose.Types.ObjectId(userId);

        // Find the user and populate their enrolled courses and course progress
        const user = await User.findById(uid).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            },
        }).populate("courseProgress");

        // Calculate progress percentage for each course
        const coursesWithProgress = user.courses.map(course => {
            const totalSubsections = course.courseContent.reduce((total, section) => total + section.subSection.length, 0);
            const completedSubsections = user.courseProgress.filter(progress => progress.courseID.toString() === course._id.toString())
            const completedSubsectionsLength = completedSubsections.reduce((total, progress) => total + progress.completedVideos.length, 0)
            const progressPercentage = totalSubsections > 0 ? (completedSubsectionsLength / totalSubsections) * 100 : 0;

            return {
                ...course.toObject(),
                progressPercentage: parseInt(progressPercentage) //only taking the integer value
            };
        });

        // console.log("User enrolled courses with progress:", coursesWithProgress);

        return res.status(200).json({
            success: true,
            message: "Fetched all enrolled Courses",
            courses: coursesWithProgress,
        });
    } catch (error) {
        //console.error("Error fetching enrolled courses:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch enrolled courses",
            error: error.message,
        });
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        //console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user?.id;

        if (!courseId || !userId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);
        const cid = new mongoose.Types.ObjectId(courseId);

        const user = await User.findByIdAndUpdate(
            uid,
            { $push: { cart: cid } },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course added to cart",
            user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { courseId } = req.body;

        if (!userId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Please provide all the fields",
            });
        }

        const uid = new mongoose.Types.ObjectId(userId);
        const cid = new mongoose.Types.ObjectId(courseId);

        const user = await User.findByIdAndUpdate(
            uid,
            { $pull: { cart: cid } },
            { new: true }
        );

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course removed from cart",
            user,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.getInstructorDetails = async (req, res) => {
    try {
        const userId = req?.user?.id;

        // Get all the courses of the instructor
        const instructor = await User.findById(userId)
            .populate({
                path: 'courses',
                populate: {
                    path: 'ratingAndReviews',
                },
            })
            .lean();


        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        const coursesWithDetails = instructor.courses.map((course) => {
            const totalStudents = course.studentsEnrolled.length;
            const totalIncome = totalStudents * course.price;
            return {
                ...course,
                totalStudents,
                totalIncome,
            };
        });

        return res.status(200).json({
            success: true,
            coursesWithDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

//controller for updating firstName, lastName, email
exports.editProfile = async (req, res) => {
    try {
        const { firstName, lastName, email } = req?.body;
        const id = req?.user?.id;

        if (!firstName || !lastName || !email) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const user = await User.findOneAndUpdate(
            { _id: id },
            { firstName, lastName, email },
            { new: true }
        ).populate({
            path: 'courses',
            populate: {
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        } else {
            return res.status(200).json({
                success: true,
                user,
            });
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


