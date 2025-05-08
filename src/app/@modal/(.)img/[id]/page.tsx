import Image from "next/image";
import { getImage } from "~/server/queries";

export default async function ImageModal({
  params: { id: imgId },
}: { params: { id: string } }) {
  const idAsNumber = Number(imgId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");

  const image = await getImage(idAsNumber);

  return (
    <div>
      <Image alt={image.name} src={image.url} width={480} height={480} />
    </div>
  );
}
