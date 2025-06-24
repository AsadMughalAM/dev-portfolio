// EmailJS Configuration
// Replace these values with your actual EmailJS credentials

export const EMAILJS_CONFIG = {
  // Get these from your EmailJS dashboard: https://www.emailjs.com/
  SERVICE_ID: 'service_your_service_id', // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_your_template_id', // Replace with your EmailJS template ID
  PUBLIC_KEY: 'your_public_key', // Replace with your EmailJS public key
};

// Email template variables that will be sent to EmailJS
export interface EmailTemplateParams {
  from_name: string;
  from_email: string;
  message: string;
  to_name: string;
}