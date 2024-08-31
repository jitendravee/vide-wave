"use client";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Import the Input component
import { useForm } from "react-hook-form"; // Import useForm

export default function UploadImage() {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>("");

  // Initialize form with react-hook-form
  const form = useForm({
    defaultValues: {
      username: "",
    },
  });

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

      const response = await fetch("/api/uploadimage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setUrl(data.imgUrl); // Assuming the response contains imgUrl
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    handleUpload(); // Upload the image on form submission
  };

  return (
    <div className="p-4 bg-slate-100 min-h-screen flex justify-center items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload Section */}
          <FormItem>
            <FormLabel>Upload Image</FormLabel>
            <FormControl>
              <input type="file" onChange={handleImageChange} />
            </FormControl>
            <FormMessage />
          </FormItem>

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      {url && (
        <div className="mt-4">
          <p>Image URL: {url}</p>
          <img
            src={url}
            alt="Uploaded"
            style={{ maxWidth: "20%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
}
