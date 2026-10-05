import { WHATSAPP_NUMBER } from '../data/siteConfig';

export function buildConsultationURL(form: {
  name: string;
  phone: string;
  tattooIdea: string;
  preferredDate: string;
  message: string;
}): string {
  const text = encodeURIComponent(
    `Hi! I'd like to book a consultation at AN Tattoo Shop.\n` +
      `Name: ${form.name}\nPhone: ${form.phone}\n` +
      `Tattoo Idea: ${form.tattooIdea}\nPreferred Date: ${form.preferredDate}\n` +
      `Message: ${form.message}`,
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
