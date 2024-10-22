import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Make sure to use the correct path based on your folder structure
import About from '@/models/About';

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Parse the incoming request body
    const body = await req.json();
    const { name, image, description } = body;

    // Create a new About entry in the database
    const about = await About.create({ name, image, description });

    // Return a successful response
    return NextResponse.json({ success: true, data: about }, { status: 201 });
  } catch (error) {
    console.error('Error submitting About form:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit about data' }, { status: 400 });
  }
}
