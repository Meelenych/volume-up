'use client';
import React, { useState } from 'react';
import PageLayout from '../components/pageLayout';

const Manage = () => {
	const [file, setFile] = useState<File | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!file) return;

		const formData = new FormData();
		formData.append('file', file);
		formData.append('title', file.name.replace('.mp3', '')); // crude title
		formData.append('artist', 'Unknown'); // placeholder

		const res = await fetch('/api/songs', {
			method: 'POST',
			body: formData,
		});

		const result = await res.json();
		console.log(result);
	};

	return (
		<PageLayout>
			<h1 className='text-3xl'>Manage your music</h1>
			<section className='mt-3'>
				<h2 className='text-2xl'>Add your songs</h2>
				<form className='flex flex-col' onSubmit={handleSubmit}>
					<label htmlFor='song' className='m-2'>
						Upload an MP3 file
					</label>
					<input
						id='song'
						type='file'
						name='file'
						accept='.mp3'
						className='border border-purple-500 p-4 w-full sm:w-100 m-2'
						onChange={e => setFile(e.target.files?.[0] || null)}
					/>
					<button
						type='submit'
						className='border border-purple-500 p-4 w-full sm:w-100 m-2 active:scale-[0.98]'>
						Upload
					</button>
				</form>
			</section>
		</PageLayout>
	);
};

export default Manage;
