import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default async function ImageModal({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id: imgId } = await params;

  const idAsNumber = Number(imgId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid image id");

  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
