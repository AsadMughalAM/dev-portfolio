# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## 🚀 Deployment

This project is configured for deployment on Netlify with the following features:

### EmailJS Integration
- **Contact Form**: Powered by EmailJS for reliable email delivery
- **No Backend Required**: Sends emails directly from the frontend
- **Spam Protection**: Built-in form validation and honeypot protection
- **Fallback Options**: Gmail compose link as backup option

### EmailJS Setup Instructions

1. **Create EmailJS Account**:
   - Go to [EmailJS](https://www.emailjs.com/)
   - Sign up for a free account
   - Create a new service (Gmail, Outlook, etc.)

2. **Configure Email Service**:
   - Add your email service (Gmail recommended)
   - Verify your email address
   - Note down your Service ID

3. **Create Email Template**:
   - Go to Email Templates
   - Create a new template with these variables:
     ```
     From: {{from_name}} <{{from_email}}>
     To: {{to_name}}
     Subject: New Portfolio Contact Message
     
     Message:
     {{message}}
     
     Reply to: {{from_email}}
     ```
   - Note down your Template ID

4. **Get Public Key**:
   - Go to Account settings
   - Copy your Public Key

5. **Update Configuration**:
   - Open `src/utils/emailConfig.ts`
   - Replace the placeholder values:
     ```typescript
     export const EMAILJS_CONFIG = {
       SERVICE_ID: 'your_actual_service_id',
       TEMPLATE_ID: 'your_actual_template_id', 
       PUBLIC_KEY: 'your_actual_public_key',
     };
     ```

6. **Update Contact Component**:
   - Open `src/components/Contact.tsx`
   - Replace the placeholder values in the `onSubmit` function

### Deployment Steps

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy!

### Environment Setup

The project includes:
- `netlify.toml` - Netlify configuration
- `public/_redirects` - SPA routing support
- EmailJS integration in Contact component

## 📧 Contact Form Features

- **EmailJS Integration**: Direct email sending from frontend
- **Form Validation**: Client-side validation with error messages
- **Loading States**: Visual feedback during form submission
- **Success Feedback**: Confirmation messages for users
- **Fallback Options**: Gmail compose link as backup
- **Spam Protection**: Form validation and honeypot fields
- **Responsive Design**: Works on all devices

## 🛠 Technologies Used

- React 18
- TypeScript
- Tailwind CSS
- Vite
- React Hook Form
- Zod Validation
- EmailJS
- Lucide Icons
- Custom Cursor Effects

## 📱 Features

- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Mode**: Toggle between themes
- **Smooth Scrolling**: Enhanced user experience
- **Contact Form**: EmailJS integration
- **Project Showcase**: Display your work with live demos
- **Skills Section**: Animated skill display
- **Performance Optimized**: Fast loading and smooth animations
- **Custom Cursor**: Minimal, elegant cursor effects

## 🎨 Design Features

- **Apple-level aesthetics**: Clean, sophisticated design
- **Gradient backgrounds**: Modern visual appeal
- **Micro-interactions**: Hover states and animations
- **Typography hierarchy**: Clear visual structure
- **Color system**: Consistent theme colors
- **Spacing system**: 8px grid system

## 📞 Contact Form Configuration

### EmailJS Setup (Recommended)
1. Create EmailJS account at https://www.emailjs.com/
2. Set up email service (Gmail, Outlook, etc.)
3. Create email template with required variables
4. Update configuration in `src/utils/emailConfig.ts`
5. Test the contact form

### Form Features
- Client-side validation
- Loading states
- Error handling
- Success notifications
- Gmail fallback option
- Spam protection

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Configure EmailJS credentials
4. Start development server: `npm run dev`
5. Build for production: `npm run build`

## 📦 Deployment

The site can be deployed to:
- **Netlify** (recommended)
- Vercel
- GitHub Pages
- Any static hosting service

## 🎯 EmailJS Benefits

✅ **No Backend Required**: Serverless email sending  
✅ **Easy Setup**: Simple configuration process  
✅ **Reliable Delivery**: High deliverability rates  
✅ **Spam Protection**: Built-in security features  
✅ **Free Tier**: 200 emails/month  
✅ **Multiple Services**: Gmail, Outlook, Yahoo, etc.  
✅ **Template System**: Customizable email templates  

## 📧 Contact

- **Email**: am127955@gmail.com
- **LinkedIn**: [Asad Ali](https://www.linkedin.com/in/asad-ali-161b82250)
- **GitHub**: [AsadMughalAM](https://github.com/AsadMughalAM)

## 📄 License

MIT License - feel free to use this template for your own portfolio!