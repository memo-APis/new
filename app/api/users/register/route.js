import { NextResponse } from "next/server";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";



export async function POST(req, res) {
    try {
    await dbConnect();
    const { email, password, fullName, phone } = await req.json();
    // if (!email || !password || !fullName || !phone) {
    //     return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    // }
    console.log(req.json());
    const existing = await User
        .findOne({ email })
        .exec();
    if (existing) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }
 
        const user = await User.create({ email, password, fullName, phone });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message } , { status: 500 });
    }
}
    



  

