import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getCurrentUserImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
	const images = await getCurrentUserImages();

	return (
		<div className="flex flex-wrap gap-4">
			{images.map((image) => (
				<div key={image.id} className="flex w-48 flex-col">
					<img alt={image.name} src={image.url} />
					<div>{image.name}</div>
				</div>
			))}
		</div>
	);
}

export default async function HomePage() {
	return (
		<main>
			<SignedOut>
				<div className="h-full w-full text-center text-2xl">
					Please sign in above
				</div>
			</SignedOut>

			<SignedIn>
				<Images />
			</SignedIn>
		</main>
	);
}
