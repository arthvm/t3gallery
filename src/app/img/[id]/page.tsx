import FullPageImageView from "~/components/full-image-page";

export default async function ImagePage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id: imgId } = await params;

  const idAsNumber = Number(imgId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");

  return <FullPageImageView id={idAsNumber} />;
}
