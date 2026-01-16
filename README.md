# Portfolio Website - Gopal Vijay Dose

A modern, responsive portfolio website built with Next.js, showcasing professional experience, projects, skills, and achievements. Features smooth animations, interactive components, and a contact form with email integration.

## 🚀 Features

- **Responsive Design**: Fully responsive layout optimized for all devices
- **Smooth Animations**: GSAP-powered animations and Lenis smooth scrolling
- **Interactive Components**: 
  - Animated skills showcase with circular carousel
  - Project gallery with detailed descriptions
  - Experience timeline
  - Awards showcase
- **Contact Form**: Integrated contact form with Nodemailer for email submissions
- **Modern UI/UX**: Clean, professional design with Tailwind CSS
- **Performance Optimized**: Built with Next.js 16 for optimal performance
- **SEO Friendly**: Proper metadata and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first CSS framework
- **GSAP 3.14.2** - Animation library
- **Lenis 1.3.17** - Smooth scrolling
- **React Icons 5.5.0** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Nodemailer 7.0.12** - Email service integration

### Development Tools
- **ESLint** - Code linting
- **TypeScript** - Static type checking

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # Contact form API endpoint
│   ├── awards/
│   │   └── page.tsx              # Awards page
│   ├── components/
│   │   ├── About.tsx             # About section
│   │   ├── Contact.tsx           # Contact form component
│   │   ├── Experience.tsx        # Experience timeline
│   │   ├── Footer.tsx            # Footer component
│   │   ├── Header.tsx            # Navigation header
│   │   ├── Hero.tsx              # Hero section
│   │   ├── MarqueeBanner.tsx     # Scrolling banner
│   │   ├── Preloader.tsx         # Loading animation
│   │   ├── Projects.tsx          # Projects showcase
│   │   └── Skills.tsx            # Skills carousel
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── data/
│   │   ├── awards.ts             # Awards data
│   │   ├── experience.ts         # Experience data
│   │   └── projects.ts           # Projects data
│   ├── experience/
│   │   └── page.tsx              # Experience page
│   ├── projects/
│   │   └── page.tsx              # Projects page
│   ├── favicon.ico               # Site favicon
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── public/
│   └── assets/                   # Static assets (images, PDFs)
└── package.json
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory for email configuration:
```env
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASSWORD=your-email-password
SMTP_FROM_EMAIL=your-email@example.com
SMTP_TO_EMAIL=recipient@example.com
SMTP_SECURE=false
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Email Configuration

The contact form requires SMTP configuration. Add the following environment variables to `.env.local`:

- `SMTP_HOST` - Your SMTP server hostname
- `SMTP_PORT` - SMTP port (usually 587 for TLS, 465 for SSL)
- `SMTP_USER` - Your SMTP username/email
- `SMTP_PASSWORD` - Your SMTP password
- `SMTP_FROM_EMAIL` - Email address to send from
- `SMTP_TO_EMAIL` - Email address to receive submissions
- `SMTP_SECURE` - Set to "true" for SSL (port 465), "false" for TLS (port 587)

### Customization

- Update personal information in `app/data/` files:
  - `experience.ts` - Work experience
  - `projects.ts` - Project portfolio
  - `awards.ts` - Awards and achievements
- Modify metadata in `app/layout.tsx` for SEO
- Update contact email in `app/components/Header.tsx` and `app/api/contact/route.ts`

## 🎨 Pages

- **Home** (`/`) - Main landing page with all sections
- **Experience** (`/experience`) - Detailed experience page
- **Projects** (`/projects`) - Projects showcase page
- **Awards** (`/awards`) - Awards and achievements
- **Contact** (`/contact`) - Contact page with form

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This Next.js app can be deployed on any platform that supports Node.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

Make sure to:
- Set all environment variables in your hosting platform
- Run `npm run build` to verify the build works locally
- Configure your domain and SSL certificate

## 📝 License

This project is private and proprietary.

## 👤 Author

**Gopal Vijay Dose**
- Full Stack Developer & Problem Solver
- Based in Pune, Maharashtra, India
- Email: gopaldose12345@gmail.com

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animations powered by [GSAP](https://greensock.com/gsap/)
- Smooth scrolling by [Lenis](https://lenis.studiofreight.com/)
