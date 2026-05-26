"use client";

import React, { useState, useEffect } from "react";
import { Loader2, MessageSquare, User, Mail, Send, Image as ImageIcon } from "lucide-react";

interface Comment {
	id: number;
	full_name: string;
	email: string;
	content: string;
	image_url: string | null;
	created_at: string;
}

export const CommentSection = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [formData, setFormData] = useState({
		full_name: "",
		email: "",
		content: "",
	});
	const [file, setFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(true);

	const fetchComments = async () => {
		try {
			const response = await fetch("/api/comments");
			const data = await response.json();
			if (Array.isArray(data)) {
				setComments(data);
			}
		} catch (error) {
			console.error("Failed to fetch comments:", error);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchComments();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!formData.full_name || !formData.email || !formData.content || isLoading)
			return;

		setIsLoading(true);
		const form = new FormData();
		form.append("full_name", formData.full_name);
		form.append("email", formData.email);
		form.append("content", formData.content);
		if (file) form.append("image", file);

		try {
			const response = await fetch("/api/comments", {
				method: "POST",
				body: form,
			});

			if (response.ok) {
				setFormData({ full_name: "", email: "", content: "" });
				setFile(null);
				await fetchComments();
			} else {
				throw new Error("Failed to post comment");
			}
		} catch (error) {
			alert("Error posting comment. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="mt-16 space-y-12 max-w-2xl mx-auto px-6">
			<div className="space-y-4">
				<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
					Comments
				</h2>
				<p className="text-zinc-400">
					Leave a message or some feedback below.
				</p>
			</div>

			{/* Comment Form */}
			<form
				onSubmit={handleSubmit}
				className="space-y-6 bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl shadow-xl"
			>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="space-y-2">
						<label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
							<User size={14} /> Full Name
						</label>
						<input
							type="text"
							required
							value={formData.full_name}
							onChange={(e) =>
								setFormData({ ...formData, full_name: e.target.value })
							}
							placeholder="John Doe"
							className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all"
						/>
					</div>
					<div className="space-y-2">
						<label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
							<Mail size={14} /> Email
						</label>
						<input
							type="email"
							required
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							placeholder="john@example.com"
							className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all"
						/>
					</div>
				</div>
				<div className="space-y-2">
					<label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
						<MessageSquare size={14} /> Comment
					</label>
					<textarea
						required
						rows={4}
						value={formData.content}
						onChange={(e) =>
							setFormData({ ...formData, content: e.target.value })
						}
						placeholder="What's on your mind?"
						className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-2 px-4 text-sm text-zinc-100 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all resize-none"
					/>
				</div>
				<div className="space-y-2">
					<label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
						<ImageIcon size={14} /> Upload Image (Optional)
					</label>
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						className="text-sm text-zinc-300 w-full bg-zinc-800 p-2 rounded-xl"
					/>
				</div>
				<button
					type="submit"
					disabled={isLoading}
					className="w-full bg-zinc-100 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 disabled:opacity-50 transition-all active:scale-[0.98]"
				>
					{isLoading ? (
						<Loader2 className="w-5 h-5 animate-spin" />
					) : (
						<>
							<Send size={18} /> Post Comment
						</>
					)}
				</button>
			</form>

			{/* Comments List */}
			<div className="space-y-8">
				{isFetching ? (
					<div className="flex justify-center py-12">
						<Loader2 className="w-8 h-8 animate-spin text-zinc-500" />
					</div>
				) : comments.length > 0 ? (
					comments.map((comment) => (
						<div
							key={comment.id}
							className="bg-zinc-900/30 border border-zinc-800/50 p-6 rounded-2xl space-y-3 animate-in fade-in duration-500"
						>
							<div className="flex justify-between items-start">
								<div>
									<h4 className="font-bold text-zinc-100">
										{comment.full_name}
									</h4>
									<p className="text-xs text-zinc-500">
										{new Date(comment.created_at).toLocaleDateString("en-US", {
											month: "long",
											day: "numeric",
											year: "numeric",
										})}
									</p>
								</div>
							</div>
							<p className="text-zinc-300 text-sm leading-relaxed">
								{comment.content}
							</p>
							{comment.image_url && (
								<img
									src={comment.image_url}
									alt="Comment attachment"
									className="mt-4 rounded-xl max-h-60 w-auto"
								/>
							)}
						</div>
					))
				) : (
					<div className="text-center py-12 border-2 border-dashed border-zinc-800 rounded-2xl">
						<p className="text-zinc-500 italic">No comments yet. Be the first to say something!</p>
					</div>
				)}
			</div>
		</div>
	);
};
