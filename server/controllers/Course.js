const Course = require("../model/Course");
const Category = require("../model/Category");
const User = require("../model/Users");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Users = require("../model/Users");
const Section = require("../model/Section");
const SubSection = require("../model/SubSection");
const CourseProgress = require("../model/CourseProgress");
const { default: mongoose } = require("mongoose");

// Function to create a new course
exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;

    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;

    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage;

    // Check if any of the required fields are missing
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }
    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    console.log(thumbnailImage);
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data: newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnroled: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    });
  }
};

// Edit Course Details
exports.editCourse = async (req, res) => {
  console.log("In edit course controller");
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//getCourseDetails authenticated (for viewing the course by student)
exports.getCourseDetailsAuth = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    const id = req.user?.id;
    console.log("courseId from getCourseDetails -> ", courseId);

    //check if student is enrolled in this course
    const isCoursePresent = User.courses.some(course => course._id.toString() === courseId);

    if (!isCoursePresent) {
      return res.status(400).json({
        success: false,
        message: `User is not enrolled in the course with ID ${courseId}`,
      });
    }

    //find course details
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    console.log(courseDetails);
    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get course details for only over-viewing the course
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    const { courseId } = req.body;
    const id = req.user?.id;
    console.log("courseId from getCourseDetails -> ", courseId);
    //find course details
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: '-videoUrl',
        },
      })
      .exec();
    console.log(courseDetails);
    //validation
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

exports.getInstructorCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const instructorCourses = await Course.find({
      instructor: userId,
    })
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      });

    res.status(200).json({
      success: true,
      message: "Fetched Instructor Courses",
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const instrucId = req?.user?.id;
    //unenroll the students from this course
    const course = await Course.findById(courseId);
    for (const studentsId of course.studentsEnrolled) {
      await Users.findByIdAndUpdate(studentsId, {
        $pull: { courses: courseId },
      });
    }

    //deleting sections and subsections
    for (const sectionId of course.courseContent) {
      const section = await Section.findById(sectionId);
      if (section) {
        for (const subSection of section.subSection) {
          await SubSection.findByIdAndDelete(subSection);
        }
        await Section.findByIdAndDelete(section);
      }
    }

    //also pull the course from the instructor account
    const instructorId = new mongoose.Types.ObjectId(instrucId);
    await Course.findByIdAndUpdate( instructorId , { $pull: { courses: courseId } })

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.markLectureAsComplete = async (req, res) => {
  try {
    const { courseId, subSectionId } = req.body;
    const userId = req?.user?.id;
    if (!userId || !courseId || !subSectionId) {
      return res.status(400).json({
        success: false,
        message: "Provide all the fields",
      });
    }

    const cid = new mongoose.Types.ObjectId(courseId);
    const sid = new mongoose.Types.ObjectId(subSectionId);
    const uid = new mongoose.Types.ObjectId(userId);

    let progress = await CourseProgress.findOne({ courseID: cid, userID: userId });
    if (progress) {
      if (!progress.completedVideos.includes(sid)) {
        progress = await CourseProgress.findOneAndUpdate(
          { courseID: cid, userID: uid },
          { $push: { completedVideos: sid } },
          { new: true }
        );
      }
    } else {
      progress = new CourseProgress({
        userID: uid,
        courseID: cid,
        completedVideos: [sid],
      });
      await progress.save();
      // push the newly created progress into user
      const pid = new mongoose.Types.ObjectId(progress._id);
      await User.findOneAndUpdate({ _id: userId }, { $push: { courseProgress: pid } });
    }

    return res.status(200).json({
      success: true,
      progress,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req?.user?.id;
    if (!userId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Provide all the fields",
      });
    }

    //if course progress is present
    const cid = new mongoose.Types.ObjectId(courseId);
    const uid = new mongoose.Types.ObjectId(userId);
    let progress = await CourseProgress.findOne({ courseID: courseId, userID: userId });

    if (progress) {
      return res.status(200).json({
        success: true,
        progress,
      })
    } else {
      return res.status(200).json({
        success: true,
        progress: {},
      })
    }


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}