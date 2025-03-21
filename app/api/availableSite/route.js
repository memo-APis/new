import AvailableSite from "@/models/availableSite";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";



export async function POST(req, res) {
    dbConnect();
    const { name, description, price, category } = await req.json();
    if (!name || !description || !price || !category  ) {
        return NextResponse.error(new Error("All fields are required"), 400);
    }
    try {
        const newSite = AvailableSite.create({ name, description, price, category });
        return NextResponse.json({ site: newSite }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req, res) {
    dbConnect();
    try {
        const sites = await AvailableSite.find().exec();
        return NextResponse.json(sites);
    } catch (error) {
        return NextResponse.error(error, 400);
    }

}

export async function PUT(req, res) {
    dbConnect();
    const { id } = req.query;
    const { name, description, price, category, url } = req.json();
    if (!id) {
        return NextResponse.error(new Error("Id is required"), 400);
    }
    try {
        const site = await AvailableSite.findByIdAndUpdate(id, { name, description, price, category, url }, { new: true }).exec();
        return NextResponse.json(site);
    } catch (error) {
        return NextResponse.error(error, 400);
    }
}


export async function DELETE(req, res) {
    dbConnect();
    const { id } = req.query;
    if (!id) {
        return NextResponse.error(new Error("Id is required"), 400);
    }
    try {
        const site = await AvailableSite.findByIdAndDelete(id).exec();
        return NextResponse.json(site);
    } catch (error) {
        return NextResponse.error(error, 400);
    }
}



