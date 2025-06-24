// EmailJS Configuration
// Your EmailJS credentials

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_fvas55f',
  TEMPLATE_ID: 'template_3wwrv0i', 
  PUBLIC_KEY: 'pCiSuEt2X942cmhDV',
};

// Email template variables that will be sent to EmailJS
export interface EmailTemplateParams {
  from_name: string;
  from_email: string;
  message: string;
  to_name: string;
}