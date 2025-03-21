// lib/middleware/validate.js
import { NextResponse } from "next/server";

export const validate = (schema) => async (req) => {
  try {
    const body = await req.json();
    await schema.parseAsync(body); // Validate the request body
    return NextResponse.next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Return a 400 response with validation errors
    return NextResponse.json(
      { error: "Validation failed", details: error.errors },
      { status: 400 }
    );
  }
};
