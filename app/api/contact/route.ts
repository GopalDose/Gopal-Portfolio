import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get SMTP configuration from environment variables
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;
    const smtpFromEmail = process.env.SMTP_FROM_EMAIL || smtpUser;
    const smtpToEmail = process.env.SMTP_TO_EMAIL || 'gopaldose12345@gmail.com';
    const smtpSecure = process.env.SMTP_SECURE === 'true';

    // Debug logging in development
    if (process.env.NODE_ENV === 'development') {
      console.log('SMTP Config Check:', {
        host: smtpHost ? '✓' : '✗',
        user: smtpUser ? '✓' : '✗',
        password: smtpPassword ? '✓' : '✗',
        port: smtpPort
      });
    }

    // Check if SMTP is configured
    if (!smtpHost || !smtpUser || !smtpPassword) {
      console.error('SMTP configuration is incomplete.');
      console.error('SMTP_HOST:', smtpHost || 'Missing');
      console.error('SMTP_USER:', smtpUser || 'Missing');
      console.error('SMTP_PASSWORD:', smtpPassword ? 'Set (hidden)' : 'Missing');
      // In development, log the form data instead
      if (process.env.NODE_ENV === 'development') {
        console.log('Form submission (development mode):', { name, email, message });
        return NextResponse.json(
          { 
            success: true, 
            message: 'Email service not configured. Form data logged to console.',
            development: true 
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { error: 'Email service is not configured' },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure, // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
      tls: {
        // Do not fail on invalid certs
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('SMTP server is ready to send emails');
    } catch (error) {
      console.error('SMTP verification failed:', error);
      return NextResponse.json(
        { error: 'SMTP server configuration is invalid. Please check your credentials.' },
        { status: 500 }
      );
    }

    // Email HTML template
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #000 0%, #333 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 8px 8px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 8px 8px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background: white;
              border-left: 4px solid #f97316;
              border-radius: 4px;
            }
            .label {
              font-weight: bold;
              color: #f97316;
              text-transform: uppercase;
              font-size: 12px;
              letter-spacing: 1px;
              margin-bottom: 8px;
            }
            .value {
              color: #333;
              font-size: 16px;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #ddd;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Portfolio Website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}" style="color: #f97316; text-decoration: none;">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="value" style="white-space: pre-wrap;">${message}</div>
            </div>
            <div class="footer">
              <p>This email was sent from your portfolio contact form.</p>
              <p>You can reply directly to this email to respond to ${name}.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Plain text version
    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Message: ${message}

---
This email was sent from your portfolio contact form.
You can reply directly to this email to respond to ${name}.
    `;

    // Send email using SMTP
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${smtpFromEmail}>`,
      to: smtpToEmail,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: htmlContent,
      text: textContent,
    });

    console.log('Email sent successfully:', info.messageId);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully', messageId: info.messageId },
      { status: 200 }
    );
  } catch (error) {
    console.error('SMTP error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    );
  }
}
