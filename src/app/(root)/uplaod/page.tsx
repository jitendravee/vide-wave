// "use client";
// import axios from "axios";
// import { useState } from "react";

// export default function UploadImage() {
//   const [image, setImage] = useState<string | ArrayBuffer | null>(null);
//   const [url, setUrl] = useState("");

//   const handleImageChange = (e: any) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setImage(reader.result);
//     };
//   };

//   const handleUpload = async () => {
//     if (!image) return;

//     try {
//       const response = await axios.post(
//         "/api/uploadimage",
//         { data: image },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await response.data;
//       setUrl(data.url);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={handleUpload}>Upload Image</button>
//       {url && (
//         <div>
//           <p>Image URL: {url}</p>
//           <img src={url} alt="Uploaded" />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";

export default function UploadImage() {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;

    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUrl(data.imgUrl); // Assuming the response contains imgUrl
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
      {url && (
        <div>
          <p>Image URL: {url}</p>
          <img
            src={url}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}
