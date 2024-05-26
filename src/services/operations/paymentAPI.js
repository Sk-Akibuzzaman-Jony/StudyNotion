import { apiConnector } from "../apiconnector";
import { paymentEndpoints } from "../api";
import rzplogo from "../../assets/Logo/Logo-Full-Light.png"
import toast from "react-hot-toast";
import {setPaymentLoading} from "../../slices/courseSlice"
import {resetCart} from "../../slices/cartSlice"
const {CAPTURE_PAYMENT, SEND_PAYMENT_SUCCESS_EMAIL, VERIFY_SIGNATURE} = paymentEndpoints;

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function displayRazorpay(courses, userDetails, token, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    let orderResponse = [];
    try {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
    
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
    
        // creating a new order
        orderResponse = await apiConnector("POST", CAPTURE_PAYMENT, {courses}, {Authorization:
        `Bearer ${token}`
        });
    
        if (!orderResponse) {
            alert("Server error. Are you online?");
            return;
        }

        //console.log("Order Resonse from payment API - ", orderResponse.data.paymentResponse);
    
        // Getting the order details back
        //const { amount, id: order_id, currency } = orderResponse.data;
    
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            amount: `${orderResponse?.data?.paymentResponse?.amount}`,
            currency: orderResponse?.data?.paymentResponse?.currency,
            name: "StudyNotion",
            description: "Test Transaction",
            order_id: orderResponse.data.paymentResponse.id,
            handler: async function (response) {
                console.log("Response from display razorpay ",response);
                //handler consists what to be done next
                //send payment success email
                sendPaymentSuccessEmail(response, orderResponse?.data?.paymentResponse?.amount, token);
                //verify payment
                
                verifyPayment({...response, courses}, token, navigate, dispatch);
            },
            prefill: {
                name:`${userDetails.firstName}`,
                email: `${userDetails.email}`,  
            },
            theme: {
                color: "#61dafb",
            },
        };
    
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            console.log("order Response", orderResponse);
            toast.error("oops, payment failed");
            console.log(response?.error);
        })
    } catch (error) {
        console.log("PAYMENT ERROR...", error);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}


async function sendPaymentSuccessEmail(response, amount, token){
    try {
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL, {
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount
        }, {
            Authorization:`Bearer ${token}`,
        } )
    } catch (error) {
        console.log("SENDING PAYMENT SUCCESS EMAIL ERROR...", error);
    }
}


async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", VERIFY_SIGNATURE, bodyData, {Authorization:`Bearer ${token}`})
        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast.success("payment successfull, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR...", error);
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}