import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

interface FullPageImageViewProps {
  id: number;
}

export default async function FullPageImageView({
  id,
}: FullPageImageViewProps) {
  const image = await getImage(id);

  const authClient = await clerkClient();
  const uploaderInfo = await authClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center">
      <img
        alt={image.name}
        src={image.url}
        className="w-[960] object-contain"
      />

      <div className="flex w-48 flex-col">
        <div className="border-b border-l p-2 text-center text-lg">
          {image.name}
        </div>

        <div className="flex flex-col p-2">
          <span>Uploaded by:</span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="flex flex-col p-2">
          <span>Created at:</span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
