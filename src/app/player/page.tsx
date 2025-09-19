'use client';
import React, { useEffect, useState } from 'react';
import PageLayout from '../components/pageLayout';

type Song = {
	id: number;
	title: string;
	artist: string;
	filePath: string;
};

const Player = () => {
	const [songs, setSongs] = useState<Song[]>([]);

	useEffect(() => {
		const fetchSongs = async () => {
			const res = await fetch('/api/songs');
			const data = await res.json();
			setSongs(data);
		};

		fetchSongs();
	}, []);

	return (
		<PageLayout>
			<h1 className='text-3xl'>Player</h1>
			<section>
				<ul className='p-5'>
					{songs.map(song => (
						<li key={song.id} className='border border-purple-500 p-4 w-full sm:w-100 m-2'>
							<p className='font-semibold'>
								{song.title} — {song.artist}
							</p>
							<audio
								controls
								src={song.filePath}
								className='w-full appearance-none bg-purple-500 p-3 rounded-none'
							/>
						</li>
					))}
				</ul>
			</section>
		</PageLayout>
	);
};

export default Player;
