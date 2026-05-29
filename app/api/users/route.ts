import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'users.json');

export async function GET() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return NextResponse.json([]);
    }
    const fileData = fs.readFileSync(dataFilePath, 'utf8');
    return NextResponse.json(JSON.parse(fileData));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let users = [];
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      users = JSON.parse(fileData);
    } else {
      fs.mkdirSync(path.dirname(dataFilePath), { recursive: true });
    }

    const newUser = {
      id: Date.now().toString(),
      email: body.email || 'N/A',
      name: body.name || 'N/A',
      percentile: body.percentile ?? null,
      rank: body.rank ?? null,
      type: body.type || 'demo',
      createdAt: new Date().toISOString()
    };

    users.unshift(newUser);
    fs.writeFileSync(dataFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
