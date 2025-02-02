import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { EmailTemplate } from '@/components/EmailTemplate'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json()
    
    const data = await resend.emails.send({
      from: 'Green Detective <info@greendetective.earth>',
      to: ['nandangrover.5@gmail.com'],
      subject: `New Contact Form Submission: ${subject}`,
      react: EmailTemplate({
        firstName,
        lastName,
        email,
        message
      })
    })

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error })
  }
} 