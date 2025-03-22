import RentedSite from "@/models/rentedSite";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";                                            


export async function POST(req, res) {
    const { siteId, userId } = req.body;
    dbConnect();
    try {
        const rentedSite = await RentedSite.create({ siteId, userId });
        return NextResponse.json(rentedSite, { status: 201 });
    } catch (error) {
        return NextResponse.error(error, 400);
    }
}

export async function GET(req, res) {
    dbConnect();
    try {
        const rentedSites = await RentedSite.find().exec();
        return NextResponse.json(rentedSites);
    } catch (error) {
        return NextResponse.error(error, 400);
    }

}

export async function PUT(req, res) {
    dbConnect();
    const { id } = req.query;
    const { siteId, userId } = req.body;
    if (!id) {
        return NextResponse.error(new Error("Id is required"), 400);
    }
    try {
        const rentedSite = await RentedSite.findByIdAndUpdate(id, { siteId, userId }, { new: true }).exec();
        return NextResponse.json(rentedSite);
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
        const rentedSite = await RentedSite.findByIdAndDelete(id).exec();
        return NextResponse.json(rentedSite);
    } catch (error) {
        return NextResponse.error(error, 400);
    }
}
