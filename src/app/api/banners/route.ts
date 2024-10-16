import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/dbConnect';
import Banner from '@/models/Banner';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    await clientPromise(); // Connect to the database

    const formData = await request.formData();
    const title = formData.get('title') as string;
    const link = formData.get('link') as string;
    const image = formData.get('image') as File;

    if (!title || !link || !image) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Handle file upload
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save the file
    const filename = `${Date.now()}-${image.name}`;
    const filepath = path.join(process.cwd(), 'public', 'uploads', filename);
    await writeFile(filepath, buffer);

    // Save banner to database
    const newBanner = new Banner({
      title,
      image: `/uploads/${filename}`, // Store the relative path
      link,
    });
    await newBanner.save();

    return NextResponse.json({ message: 'Banner added', bannerId: newBanner._id }, { status: 201 });
  } catch (error) {
    console.error('Error adding banner:', error);
    return NextResponse.json({ message: 'Failed to add banner' }, { status: 500 });
  }
}

//make get method and return latest one banner data
export async function GET(request: NextRequest) {
  try {
    await clientPromise(); // Connect to the database

    // Fetch the latest banner
    const latestBanner = await Banner.findOne().sort({ createdAt: -1 });

    if (!latestBanner) {
      return NextResponse.json({ message: 'No banners found' }, { status: 404 });
    }

    return NextResponse.json({ banner: latestBanner }, { status: 200 });
  } catch (error) {
    console.error('Error fetching banner:', error);
    return NextResponse.json({ message: 'Failed to fetch banner' }, { status: 500 });
  }
}