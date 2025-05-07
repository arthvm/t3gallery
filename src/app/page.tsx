export const dynamic = "force-dynamic";

const mockUrls = [
	"https://a4oemft7ta.ufs.sh/f/XJVOzB73MbGZo03CfXh3YVXrElnz5MT6uKmLyASfk7Nc4G8H",
	"https://a4oemft7ta.ufs.sh/f/XJVOzB73MbGZVq8sfqTzb0pwZY5M6jUNv7esyRSKlHAPgBf3",
	"https://a4oemft7ta.ufs.sh/f/XJVOzB73MbGZ5tPM2qwBuiAQpZHtSVNo7WkxhMnE2Y39TfjI",
	"https://a4oemft7ta.ufs.sh/f/XJVOzB73MbGZCmwEOXkt1IGQxvAJcNuRLHoBT5iCqmFlXazw",
];

const mockImages = mockUrls.map((url, index) => ({
	id: index + 1,
	url,
}));

export default function HomePage() {
	return (
		<main>
			<div className="flex flex-wrap gap-4">
				{[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
					<div key={`${image.id}-${index}`} className="w-48">
						<img alt="" src={image.url} />
					</div>
				))}
			</div>
		</main>
	);
}
