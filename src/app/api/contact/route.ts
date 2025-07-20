import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);
const myEmail = process.env.MY_EMAIL; // Simpan email Anda di .env

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // 1. Validasi input
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        if (!myEmail) {
            console.error("MY_EMAIL environment variable is not set.");
            return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
        }

        // 2. Simpan pesan ke database menggunakan Prisma
        await prisma.message.create({
            data: {
                name,
                email,
                message,
            },
        });

        // 3. Kirim email menggunakan Resend
        const { data, error } = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: [myEmail],
            subject: `New Message from Portfolio: ${name}`,
            html: `
                <h3>New message from your portfolio contact form!</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: 'Message sent and saved successfully!' }, { status: 200 });

    } catch (error) {
        console.error('Error in /api/contact:', error);
        return NextResponse.json({ error: 'An error occurred on the server.' }, { status: 500 });
    }
}
