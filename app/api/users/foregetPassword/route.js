import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { NextResponse } from "next/server";


export default async function POST(req, res) {
    await dbConnect();
    const { email } = req.json();
    if (!email) {
        return NextResponse.error(new Error("Email is required"), 400);
    }
    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return NextResponse.error(new Error("User not found"), 400);
        }
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.error(error, 400);
    }
}