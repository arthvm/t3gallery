import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function Images() {
	const user = await auth();

	const images = user.userId
		? await db.query.images.findMany({
			where: (model, { eq }) => eq(model.userId, user.userId),
			orderBy: (model, { desc }) => desc(model.id),
		})
		: [];

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
