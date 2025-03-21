import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { NextResponse } from "next/server";



export default async function GET(req, res) {
    await dbConnect();
    try {
        const getMe = await User.findById(req.user.id).exec();
        return NextResponse.json(getMe);
       
    } catch (error) {
        return NextResponse.error(error, 400);
    }
}