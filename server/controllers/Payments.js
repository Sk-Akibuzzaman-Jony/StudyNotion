const {instance} = require("../config/razorpay");
const crypto = require('crypto');
const Razorpay = require("razorpay");
const Course = require("../model/Course");
const User = require("../model/Users");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const {paymentSuccessEmail} = require("../mail/templates/paymentSuccessEmail");

//Payment capture and order creation
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    let totalAmount = 0;

    for (const course_id of courses) {
        try {
            const cid = new mongoose.Types.ObjectId(course_id);
            const course = await Course.findById(cid);
            if (!course) {
                console.error(`Course not found: ${course_id}`);
                return res.status(404).json({
                    success: false,
                    message: "Cannot get course details",
                });
            }

            totalAmount += course.price;
        } catch (error) {
            console.error(`Error fetching course details for ${course_id}: ${error.message}`);
            return res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    }

    try {
        var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY, key_secret: process.env.RAZORPAY_SECRET });
        const paymentResponse = await instance.orders.create({
            amount: totalAmount * 100,
            currency: "INR",
            receipt: (Math.random() * Date.now()).toString(),
            notes: {
                courseId: courses,
                userId,
            },
        });

        if (paymentResponse) {
            console.log("Payment response:", paymentResponse);
            return res.status(200).json({
                success: true,
                paymentResponse,
            });
        } else {
            console.error("Failed to create payment order");
            return res.status(500).json({
                success: false,
                message: "Failed to create payment order",
            });
        }
    } catch (error) {
        console.error("Error creating payment order:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//verification of payment signature
exports.verifySignature = async (req, res) => {
    try {
        const { razorpay_signature, razorpay_order_id, razorpay_payment_id, courses } = req.body;
        const userId = req.user.id;

        if (!razorpay_signature || !razorpay_order_id || !razorpay_payment_id) {
            return res.status(400).json({
                success: false,
                message: "Not found signature or razorpay_order_id or razorpay_payment_id",
            });
        }

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Enroll process
            for (const course_id of courses) {
                try {
                    const enrolledCourse = await Course.findByIdAndUpdate(
                        { _id: course_id },
                        { $push: { studentsEnrolled: userId } },
                        { new: true }
                    );

                    if (!enrolledCourse) {
                        console.error(`Enrolled Course Not found: ${course_id}`);
                        return res.status(404).json({
                            success: false,
                            message: "Enrolled Course Not found",
                        });
                    }

                    const student = await User.findByIdAndUpdate(
                        { _id: userId },
                        { $push: { courses: course_id } },
                        { new: true }
                    );

                    await mailSender(
                        student.email,
                        `Successfully Enrolled into ${enrolledCourse.courseName}`,
                        courseEnrollmentEmail(enrolledCourse.courseName, student.firstName)
                    );
                } catch (error) {
                    console.error(`Error during enrollment process for course ${course_id}: ${error.message}`);
                    return res.status(500).json({
                        success: false,
                        message: `Enrollment failed for course ${course_id}`,
                    });
                }
            }
            
            return res.status(200).json({
                success: true,
                message: "Successfully enrolled",
            });
        } else {
            console.error("Invalid signature");
            return res.status(400).json({
                success: false,
                message: "Invalid signature",
            });
        }
    } catch (error) {
        console.error("Error verifying signature:", error.message);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//payment confirmation mail

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the details",
        });
    }

    try {
        const uid = new mongoose.Types.ObjectId(userId);
        const enrolledStudent = await User.findById(uid);
        if (!enrolledStudent) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        await mailSender(
            enrolledStudent.email,
            "Payment Received",
            paymentSuccessEmail(enrolledStudent.firstName, amount / 100, orderId, paymentId)
        );
        res.status(200).json({
            success: true,
            message: "Payment success email sent",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


//capture the payment and initiate the Razorpay order
// exports.capturePayment = async (req, res) => {
//     //get courseId and UserID
//     const {course_id} = req.body;
//     const userId = req.user.id;
//     //validation
//     //valid courseID
//     if(!course_id) {
//         return res.json({
//             success:false,
//             message:'Please provide valid course ID',
//         })
//     };
//     //valid courseDetail
//     let course;
//     try{
//         course = await Course.findById(course_id);
//         if(!course) {
//             return res.json({
//                 success:false,
//                 message:'Could not find the course',
//             });
//         }

//         //user already pay for the same course
//         const uid = new mongoose.Types.ObjectId(userId);
//         if(course.studentsEnrolled.includes(uid)) {
//             return res.status(200).json({
//                 success:false,
//                 message:'Student is already enrolled',
//             });
//         }
//     }
//     catch(error) {
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }
    
//     //order create
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//         amount: amount * 100,
//         currency,
//         receipt: Math.random(Date.now()).toString(),
//         notes:{
//             courseId: course_id,
//             userId,
//         }
//     };

//     try{
//         //initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         //return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });
//     }
//     catch(error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }
    

// };

// //verify Signature of Razorpay and Server

// exports.verifySignature = async (req, res) => {
//     const webhookSecret = "12345678";

//     const signature = req.headers["x-razorpay-signature"];

//     const shasum =  crypto.createHmac("sha256", webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest) {
//         console.log("Payment is Authorised");

//         const {courseId, userId} = req.body.payload.payment.entity.notes;

//         try{
//                 //fulfil the action

//                 //find the course and enroll the student in it
//                 const enrolledCourse = await Course.findOneAndUpdate(
//                                                 {_id: courseId},
//                                                 {$push:{studentsEnrolled: userId}},
//                                                 {new:true},
//                 );

//                 if(!enrolledCourse) {
//                     return res.status(500).json({
//                         success:false,
//                         message:'Course not Found',
//                     });
//                 }

//                 console.log(enrolledCourse);

//                 //find the student andadd the course to their list enrolled courses me 
//                 const enrolledStudent = await User.findOneAndUpdate(
//                                                 {_id:userId},
//                                                 {$push:{courses:courseId}},
//                                                 {new:true},
//                 );

//                 console.log(enrolledStudent);

//                 //mail send krdo confirmation wala 
//                 const emailResponse = await mailSender(
//                                         enrolledStudent.email,
//                                         "Congratulations from CodeHelp",
//                                         "Congratulations, you are onboarded into new CodeHelp Course",
//                 );

//                 console.log(emailResponse);
//                 return res.status(200).json({
//                     success:true,
//                     message:"Signature Verified and COurse Added",
//                 });


//         }       
//         catch(error) {
//             console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }


// };