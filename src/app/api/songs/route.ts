import db from '@/lib/db';
import {NextResponse} from 'next/server';

export async function GET() {
  const stmt = db.prepare('SELECT * FROM songs');
  const songs = stmt.all();
  return NextResponse.json(songs);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const title = formData.get('title') as string;
  const artist = formData.get('artist') as string;
  // Store the file locally or just its metadata for now
  const filePath = `/uploads/${file.name}`; // Placeholder path

  const stmt = db.prepare('INSERT INTO songs (title, artist, filePath) VALUES (?, ?, ?)');
  stmt.run(title, artist, filePath);
  return NextResponse.json({success: true});
}
