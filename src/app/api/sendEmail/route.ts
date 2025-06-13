import { NextRequest } from "next/server";
import nodemailer from "nodemailer";


export const POST = async(req: NextRequest): Promise<Response | void> => {

    try {
        
        if(req.method === "POST"){

            const {userEmail, otp} = await req.json();

            if(!userEmail || !otp){

                return Response.json({

                    status: "failed",
                    success: false,
                    message: "Please Provide All Information"

                })

            }

            const transporter =  nodemailer.createTransport({

                service: "gmail",
                port: 465,
                secure: true,
                auth: {

                    user: "",
                    pass: ""

                }

            })

            const mailOptions = {

                from: "yashjain07.yj@gmail.com",
                to: userEmail,
                subject: "Email Verification With OTP",
                text: `Here is your OTP ${otp}`,
            }

            transporter?.sendMail(mailOptions, (err, messageInfo) => {

                if(err){

                    return Response.json({

                        status: "failed",
                        success: false,
                        message: err,

                    })

                }else{

                        console.log(messageInfo);
                }

            })

            return Response.json({

                status: "success",
                success: true,
                message: "OTP Has Been Sent Successfully",

            })


        }

    } catch (error) {

        console.log(error);
        
    }


}