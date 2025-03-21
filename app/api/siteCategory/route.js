import dbConnect from "@/lib/dbConnect";
import SiteCategory from "@/models/siteCategory";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    dbConnect();
    try {
        const siteCategories = await SiteCategory.find();
        return NextResponse.json(siteCategories);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function POST(req, res) {
    try {
        await dbConnect();
        const { name, description } = await req.json();
        if (!name || !description) {
            return NextResponse.json({ error: "All fields are required" });
        }
        const siteCategory = await SiteCategory.create({ name, description });
        return NextResponse.json(siteCategory, { status: 201 });
   } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req, res) {
    dbConnect();
    const { id } = req.query;
    try {
        const siteCategory = await SiteCategory.findByIdAndUpdate(id, req.body, { new: true });
        return NextResponse.json(siteCategory);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}

export async function DELETE(req, res) {
    dbConnect();
    const { id } = req.query;
    try {
        const siteCategory = await SiteCategory.findByIdAndDelete(id);
        return NextResponse.json(siteCategory);
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}