import { getImage } from "~/server/queries";

interface FullPageImageViewProps {
  id: number;
}

export default async function FullPageImageView({
  id,
}: FullPageImageViewProps) {
  const image = await getImage(id);

  return (
    <div className="flex h-full w-full min-w-0 items-center justify-center gap-4">
      <img
        alt={image.name}
        src={image.url}
        className="w-[960] object-contain"
      />

      <div className="flex w-48 flex-col">
        <div className="font-bold text-xl">{image.name}</div>
      </div>
    </div>
  );
}
