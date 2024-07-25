import axios from "axios";
import React, { useState } from "react";

const FileUpload: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [filename, setFilename] = useState("Choose File");
	const [uploadedFile, setUploadedFile] = useState<string>("");
	const [wordCount, setWordCount] = useState<number | null>(null);
	const [wordCount3char, setWordCount3char] = useState<number | null>(null);
	const [wordCount4char, setWordCount4char] = useState<number | null>(null);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
			setFilename(e.target.files[0].name);
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file, file.name);

		try {
			const res = await axios.post(
				"http://localhost:3000/api/teacher/upload",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const { file: uploadedFilePath, document } = res.data;

			setUploadedFile(uploadedFilePath);
			setWordCount(document.wordCount);
			setWordCount3char(document.wordCount3Plus);
			setWordCount4char(document.wordCount4Plus);
		} catch (err: any) {
			if (axios.isAxiosError(err) && err.response) {
				console.log(err.response.data.message);
			} else {
				console.log("There was a problem with the server");
			}
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div>
					<input type="file" onChange={onChange} />
				</div>
				<input type="submit" value="Upload" />
			</form>
			{uploadedFile ? (
				<div>
					<h3>{uploadedFile}</h3>
					<p>Total Words: {wordCount}</p>
					<p>Words more than 3 characters: {wordCount3char}</p>
					<p>Words more than 4 characters: {wordCount4char}</p>
				</div>
			) : (
				<div>
					<h3>{filename} not uploaded</h3>
				</div>
			)}
		</div>
	);
};

export default FileUpload;
