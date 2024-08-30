// import { cloudinary } from '@/cloudinary';
// import type { NextApiRequest, NextApiResponse } from 'next';

// import { NextResponse } from 'next/server';

// export const POST = async (req: NextApiRequest) => {
//   const apiKey = process.env.CLOUDINARY_API_KEY;

  
//   try {
//     const { data } = await req.body;

//     // Upload the data to Cloudinary
//     const uploadResponse = await cloudinary.uploader.upload(data, {
//       upload_preset: 'ml_default',
//     });

//     // Return the secure URL from Cloudinary
//     return NextResponse.json(
//       { message: "success in upload", url: uploadResponse.secure_url },
//       { status: 200 }
//     );
//   } catch (error: any) {
//     console.error('Error uploading image:', error);
//     return NextResponse.json(
//       { error: 'Failed to upload image: ' + error.message },
//       { status: 500 }
//     );
//   }
// };

import { cloudinary } from '@/cloudinary';
import { NextRequest, NextResponse } from 'next/server';


// Function to upload the file to Cloudinary
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
