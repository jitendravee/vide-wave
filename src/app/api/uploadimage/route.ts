

import { cloudinary } from '@/cloudinary';
import { NextRequest, NextResponse } from 'next/server';



const uploadToCloudinary = async (fileUri: string, fileName: string) => {
  try {
    const result = await cloudinary.uploader.upload(fileUri, {
      public_id: fileName, // Optional: You can set a custom public ID
      folder: 'your-folder-name', // Optional: Specify the folder in Cloudinary
    });
    return { success: true, result };
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return { success: false, error };
  }
};

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming FormData
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // Convert the file to a base64 URI
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = `data:${mimeType};base64,${base64Data}`;

    // Upload the file to Cloudinary
    const res = await uploadToCloudinary(fileUri, file.name);

    if (res.success && res.result) {
      return NextResponse.json({
        message: "success",
        imgUrl: res.result.secure_url,
      });
    } else {
      return NextResponse.json({ message: "failure" }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
