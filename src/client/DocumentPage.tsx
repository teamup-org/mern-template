import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./DocumentPage.css"; // Import the CSS file

interface DocumentData {
	title: string;
	tags: string[];
	wordCount: number;
	createdAt: string;
}

const Document: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const [filename, setFilename] = useState("Choose File");
	const [uploadedFile, setUploadedFile] = useState<string>("");
	const [wordCount, setWordCount] = useState<number | null>(null);
	const [wordCount3char, setWordCount3char] = useState<number | null>(null);
	const [wordCount4char, setWordCount4char] = useState<number | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [documents, setDocuments] = useState<DocumentData[]>([]);

	useEffect(() => {
		const fetchDocuments = async () => {
			try {
				const res = await axios.get("http://localhost:3000/api/documents");
				setDocuments(res.data);
			} catch (error) {
				console.error("Failed to fetch documents:", error);
			}
		};

		fetchDocuments();
	}, []);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
			setFilename(e.target.files[0].name);
		}
	};

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		setLoading(true);

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
		} catch (err) {
			if (axios.isAxiosError(err) && err.response) {
				console.log(err.response.data.message);
			} else {
				console.log("There was a problem with the server");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container">
			<Link to="/teacher">Back to teacher dashboard</Link>
			<h1 className="heading-1">Document Page</h1>
			<form className="form-container" onSubmit={onSubmit}>
				<div>
					<input className="file-input" type="file" onChange={onChange} />
				</div>
				<input className="submit-button" type="submit" value="Upload" />
			</form>
			{loading ? (
				<p className="uploading">Uploading...</p>
			) : uploadedFile ? (
				<div>
					<h3>{uploadedFile}</h3>
					<p className="paragraph">Total Words: {wordCount}</p>
					<p className="paragraph">
						Words more than 3 characters: {wordCount3char}
					</p>
					<p className="paragraph">
						Words more than 4 characters: {wordCount4char}
					</p>
				</div>
			) : (
				<div>
					<h3>{filename} not uploaded</h3>
				</div>
			)}

			<h2 className="heading-2">Document List</h2>
			{documents.length > 0 ? (
				<ul className="list">
					{documents.map((doc, index) => (
						<li className="list-item" key={index}>
							<h3 className="list-item-heading">{doc.title}</h3>
							<p className="list-item-paragraph">Tags: {doc.tags.join(", ")}</p>
							<p className="list-item-paragraph">
								Total Words: {doc.wordCount}
							</p>
							<p className="list-item-paragraph">
								Created At: {new Date(doc.createdAt).toLocaleString()}
							</p>
						</li>
					))}
				</ul>
			) : (
				<p className="paragraph">No documents found</p>
			)}
		</div>
	);
};

export default Document;
