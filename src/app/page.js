import Image from 'next/image';

export default function Home() {
	return (
		<div className='font-sans grid items-center justify-items-center min-h-screen p-8 gap-16 sm:p-20'>
			<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				<h1 className='text-3xl text-purple-500'>VOLUME UP</h1>
				<section>
					<h2 className='text-2xl'>About</h2>
					<p>
						We love music as much as you do and we want it to be available any time at your
						fingertips.{' '}
						<a href='about' className='hover:underline text-purple-500'>
							Read more...
						</a>
					</p>
				</section>
				<section>
					<h2 className='text-2xl'>Player</h2>
					<p>
						Check out our new{' '}
						<a href='player' className='hover:underline text-purple-500'>
							player
						</a>
						.
					</p>
				</section>
				<section>
					<h2 className='text-2xl'>Trending</h2>
					<p>
						Have a quick look at the{' '}
						<a href='trending' className='hover:underline text-purple-500'>
							trending
						</a>{' '}
						music .
					</p>
				</section>
				<section>
					<h2 className='text-2xl'>Manage</h2>
					<p>
						<a href='manage' className='hover:underline text-purple-500'>
							Manage
						</a>{' '}
						your songs. Add or edit your favorite music. .
					</p>
				</section>
			</main>
			<footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
				<a
					href='https://www.apple.com/app-store/'
					className='hover:underline text-purple-500'>
					App Store
				</a>
				<a
					href='https://play.google.com/store/'
					className='hover:underline text-purple-500'>
					Play Market
				</a>
			</footer>
		</div>
	);
}
