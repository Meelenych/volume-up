'use client';
import React, { useEffect, useState } from 'react';

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
		<div>
			<h1 className='text-3xl'>Player</h1>
			<section>
				<ul>
					{songs.map(song => (
						<li key={song.id}>
							<p className='font-semibold'>
								{song.title} — {song.artist}
							</p>
							<audio controls src={song.filePath} className='w-full' />
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default Player;
