// pages/api/banners/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/dbConnect';
import Banner from '@/models/Banner'; // Import your Banner model

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, image, link } = req.body;

    try {
      await clientPromise(); // Connect to the database
      
      // Use the Mongoose model to insert a new banner
      const newBanner = new Banner({
        title,
        image,
        link,
      });

      await newBanner.save(); // Save the banner to the database
      res.status(201).json({ message: 'Banner added', bannerId: newBanner._id });
    } catch (error) {
      console.error('Error adding banner:', error);
      res.status(500).json({ message: 'Failed to add banner' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
