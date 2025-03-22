import { NextResponse } from "next/server";
import User from "@/models/user";
import dbConnect from "@/lib/dbConnect";


export default async function POST(req, res) {
    await dbConnect();
    const { email, password, fullName, phone, address, role } = req.json();
    if (!email || !password || !fullName || !phone || !address || !role) {
        return NextResponse.error(new Error("All fields are required"), 400);
    }
    const existing = await User
        .findOne({ email })
        .exec();
    if (existing) {
        return NextResponse.error(new Error("User already exists"), 400);
    }
    try {
        const user = await User.create({ email, password, fullName, phone, address, role });
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.error(error, 400);  

    }
}
//admin Only

export async function GET(req, res) {
    await dbConnect();
    try {
        const users = await User.find().exec();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.error(error, 400);
    }


}    
//admin Only


export async function DELETE(req, res) {
    await dbConnect();
    const { id } = req.query;
    if (!id) {
        return NextResponse.error(new Error("Id is required"), 400);
    }
    try {
        const user = await User.findByIdAndDelete(id).exec();
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.error(error, 400);
    }
}

//avry user
export async function PUT(req, res) {
    await dbConnect();
    const { id } = req.query;
    const { email, password, fullName, phone, address, role } = req.json();
    if (!id || !email || !password || !fullName || !phone || !address || !role) {
        return NextResponse.error(new Error("All fields are required"), 400);
    }
    try {
        const user = await User.findByIdAndUpdate(id, { email, password, fullName, phone, address, role }, { new: true }).exec();
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.error(error, 400);
    }
}
