"use client";

import { useUploadThing } from "~/utils/uploadthing";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "@uploadthing/react";
import {
	generateClientDropzoneAccept,
	generatePermittedFileTypes,
} from "uploadthing/client";
import { useRouter } from "next/navigation";

function UploadSVG() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="h-6 w-6"
		>
			<title>Upload button</title>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
			/>
		</svg>
	);
}

export function SimpleUploadButton() {
	const router = useRouter();

	const [files, setFiles] = useState<File[]>([]);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		setFiles(acceptedFiles);
	}, []);

	const { startUpload, routeConfig } = useUploadThing("imageUploader", {
		onClientUploadComplete: () => {
			toast.dismiss("upload-begin");

			setFiles([]);

			toast.success("Upload complete!");

			router.refresh();
		},
		onUploadError: () => {
			toast.dismiss("upload-begin");

			setFiles([]);

			toast.error("Upload failed!");
		},
		onUploadBegin: () => {
			toast.loading("Uploading files", {
				id: "upload-begin",
			});
		},
	});

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: generateClientDropzoneAccept(
			generatePermittedFileTypes(routeConfig).fileTypes,
		),
	});

	useEffect(() => {
		if (!files.length) return;

		startUpload(files);
	}, [files, startUpload]);

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} />
			<UploadSVG />
		</div>
	);
}
