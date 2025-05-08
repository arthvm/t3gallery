import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getCurrentUserImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
	const images = await getCurrentUserImages();

	return (
		<div className="flex flex-wrap justify-center gap-4">
			{images.map((image) => (
				<Link key={image.id} href={`/img/${image.id}`}>
					<div key={image.id} className="flex h-48 w-48 flex-col">
						<Image alt={image.name} src={image.url} width={192} height={192} />
						<div>{image.name}</div>
					</div>
				</Link>
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
