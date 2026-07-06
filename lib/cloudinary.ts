import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type CloudinaryResourceType = "image" | "raw";

export async function uploadToCloudinary(
  buffer: Buffer,
  opts: { folder: string; resourceType: CloudinaryResourceType; filename?: string },
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `cair/${opts.folder}`,
        resource_type: opts.resourceType,
        public_id: opts.filename?.replace(/\.[^/.]+$/, ""),
        use_filename: Boolean(opts.filename),
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    uploadStream.end(buffer);
  });
}

export async function deleteFromCloudinary(publicId: string, resourceType: CloudinaryResourceType) {
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}
