import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNav() {
	return (
		<nav className="flex w-full items-center justify-between border-b p-4 font-semibold text-xl">
			<div>Gallery</div>

			<div>
				<SignedOut>
					<SignInButton />
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</nav>
	);
}
