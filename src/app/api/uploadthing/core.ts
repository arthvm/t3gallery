import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();

export const ourFileRouter = {
	imageUploader: f({
		image: {
			maxFileSize: "4MB",
			maxFileCount: 10,
		},
	})
		.middleware(async () => {
			const user = await auth();

			if (!user.userId) throw new UploadThingError("Unauthorized");

			return { userId: user.userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			console.log("Upload complete for userId:", metadata.userId);

			await db.insert(images).values({
				name: file.name,
				url: file.ufsUrl,
				userId: metadata.userId,
			});

			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
