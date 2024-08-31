"use client";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import the Input component
import { useForm } from "react-hook-form"; // Import useForm
import ConnectDb from "@/db/connect";

export default function UploadImage() {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Initialize form with react-hook-form
  const form = useForm({
    defaultValues: {
      artist_name: "",
      youtube_link: "",
      title: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", image);

      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUrl(data.imgUrl); // Assuming the response contains imgUrl
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };
  const connectDatabase = async () => {
    await ConnectDb();
  };
  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    try {
      connectDatabase();
      handleUpload(); // Upload the image on form submission
    } catch (error) {
      console.log("Error in form upload");
    }
  };

  return (
    <div className="p-4 bg-purple-100	 min-h-screen flex justify-center items-center relative ">
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-white opacity-75">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {url && (
            <div className="mt-4 flex flex-col items-center">
              <p className="pb-2 text-lg">Thumbnail Image</p>
              <div className="w-50 h-40  flex items-center justify-center overflow-hidden">
                <img
                  src={url}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          )}

          <FormField
            control={form.control}
            name="artist_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artist Name</FormLabel>
                <FormControl>
                  <Input placeholder="Artist Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title for audio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="youtube_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Youtube Link</FormLabel>
                <FormControl>
                  <Input placeholder="Youtube Link paste" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Section */}
          <FormItem className="flex gap-5 items-center">
            <FormLabel>Upload Image</FormLabel>
            <FormControl>
              <input type="file" onChange={handleImageChange} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
