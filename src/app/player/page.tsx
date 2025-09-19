'use client';
import React, { useEffect, useRef, useState } from 'react';
import PageLayout from '../components/pageLayout';
import { Howl } from 'howler';

type Song = {
	id: number;
	title: string;
	artist: string;
	filePath: string;
};

const Player = () => {
	const [songs, setSongs] = useState<Song[]>([]);
	const [currentSound, setCurrentSound] = useState<Howl | null>(null);
	const [playingId, setPlayingId] = useState<number | null>(null);
	const [progress, setProgress] = useState(0); // 0 to 100
	const [duration, setDuration] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [isStopped, setIsStopped] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		const fetchSongs = async () => {
			const res = await fetch('/api/songs');
			const data = await res.json();
			setSongs(data);
		};

		fetchSongs();
	}, []);

	const playSong = (song: Song) => {
		setIsPaused(false);
		setIsStopped(false);
		// Stop any currently playing sound
		currentSound?.stop();
		if (intervalRef.current) clearInterval(intervalRef.current);

		const sound = new Howl({
			src: [song.filePath],
			html5: true,

			onload: () => {
				setDuration(sound.duration());
			},

			onend: () => {
				setProgress(0);
				setPlayingId(null);
				if (intervalRef.current) clearInterval(intervalRef.current);
			},
		});

		sound.play();
		setCurrentSound(sound);
		setPlayingId(song.id);

		setDuration(sound.duration());

		intervalRef.current = setInterval(() => {
			const current = sound.seek() as number;
			if (!sound.playing()) {
				sound.play();
				setPlayingId(song.id);
			}

			const total = sound.duration();
			if (total > 0) {
				setProgress((current / total) * 100);
			}
		}, 500);
	};

	const stopSong = () => {
		setIsStopped(true);
		currentSound?.stop();
		setProgress(0);
		if (intervalRef.current) clearInterval(intervalRef.current);
	};

	const pauseSong = () => {
		currentSound?.pause();
		if (intervalRef.current) clearInterval(intervalRef.current);
		setIsPaused(true);
	};

	const resumeSong = () => {
		if (!currentSound || playingId === null) return;

		setIsPaused(false);
		setIsStopped(false);
		currentSound.play();

		intervalRef.current = setInterval(() => {
			const current = currentSound.seek() as number;
			const total = currentSound.duration();
			if (total > 0) {
				setProgress((current / total) * 100);
			}
		}, 500);
	};

	const formatTime = (sec: number) =>
		`${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;

	const getButtonLabel = (songId: number) => {
		if (playingId !== songId || isStopped) return 'Play';
		if (isPaused) return 'Paused';
		return 'Playing...';
	};

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
							<div className='flex gap-4 mt-2'>
								<button
									onClick={() => {
										if (playingId === song.id && currentSound && !currentSound.playing()) {
											resumeSong();
										} else {
											playSong(song);
										}
									}}
									className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600'>
									{getButtonLabel(song.id)}
								</button>
								<button
									onClick={pauseSong}
									className='bg-gray-300 px-4 py-2 rounded hover:bg-gray-400'>
									Pause
								</button>
								<button
									onClick={stopSong}
									className='bg-gray-400 px-4 py-2 rounded hover:bg-gray-400'>
									Stop
								</button>
							</div>

							<div
								className='w-full bg-gray-200 h-2 rounded mt-2 cursor-pointer'
								onClick={e => {
									if (!currentSound || duration === 0) return;

									const rect = (e.target as HTMLDivElement).getBoundingClientRect();
									const clickX = e.clientX - rect.left;
									const percent = clickX / rect.width;
									const newTime = percent * duration;

									currentSound.seek(newTime);
									setProgress(percent * 100);
								}}>
								<div
									className='bg-purple-500 h-2 rounded'
									style={{ width: `${playingId === song.id ? progress : 0}%` }}
								/>
							</div>

							<p className='text-sm mt-1'>
								{formatTime((progress / 100) * duration)} / {formatTime(duration)}
							</p>
						</li>
					))}
				</ul>
			</section>
		</PageLayout>
	);
};

export default Player;
