
import dbConnect from "@/app/lib/dbConnect";
import rentedSite from "@/models/rentedSite";
import { NextResponse } from "next/server";


export async function GET(req) {
    const { tenantId } = req.params;
    dbConnect();
    try {
        const mySites = await rentedSite
          .find({ tenantId })
          .populate("siteId", "tenantId");
        return NextResponse.json(mySites);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}


export async function POST(req) {
    dbConnect();
    const newRentedSite = req.json();
    try {
        const rentedSite = await rentedSite.create(newRentedSite);
        return NextResponse.json(rentedSite);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function PUT(req) {
    dbConnect();
    const { id } = req.query;
    try {
        const rentedSite = await rentedSite.findByIdAndUpdate(id, req.body, { new: true });
        return NextResponse.json(rentedSite);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function DELETE(req) {
    dbConnect();
    const { id } = req.query;
    try {
        const rentedSite = await rentedSite.findByIdAndDelete(id);
        return NextResponse.json(rentedSite);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}



