import { SITE_CONFIG } from "../config/site";

/**
 * Builds a direct WhatsApp link with a URL-encoded message.
 */
export function buildWhatsAppLink(message: string, phone: string = SITE_CONFIG.whatsappNumber): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Builds WhatsApp message for a single product order.
 */
export function buildProductOrderLink(productTitle: string, quantity: number = 1): string {
  const qtyPrefix = quantity > 1 ? `${quantity} x ` : "";
  const msg = `Hello Pureliva, I want to order ${qtyPrefix}*${productTitle}*. Please share price and delivery details.`;
  return buildWhatsAppLink(msg);
}

/**
 * Builds WhatsApp message for multi-item customized order.
 */
export interface OrderItem {
  name: string;
  quantity: number;
}

export function buildMultiProductOrderLink(
  items: OrderItem[],
  customerInfo?: { name?: string; pincode?: string; city?: string }
): string {
  const lines: string[] = [
    "Hello Pureliva, I would like to place an order:",
    "",
    ...items.map((item) => `• ${item.quantity} x *${item.name}*`),
  ];

  if (customerInfo && (customerInfo.name || customerInfo.pincode || customerInfo.city)) {
    lines.push("");
    lines.push("Delivery Info:");
    if (customerInfo.name) lines.push(`Name: ${customerInfo.name}`);
    if (customerInfo.city) lines.push(`City: ${customerInfo.city}`);
    if (customerInfo.pincode) lines.push(`Pincode: ${customerInfo.pincode}`);
  }

  lines.push("");
  lines.push("Please share total pricing and delivery details.");

  return buildWhatsAppLink(lines.join("\n"));
}

/**
 * Builds WhatsApp message for Bulk / Export B2B enquiry.
 */
export interface BulkEnquiryData {
  name: string;
  company: string;
  country: string;
  product: string;
  quantity: string;
  message?: string;
}

export function buildBulkEnquiryLink(data?: BulkEnquiryData): string {
  if (!data || !data.name) {
    return buildWhatsAppLink("Hello, I want to enquire about bulk/export supply.");
  }

  const lines = [
    "Hello Pureliva, I want to enquire about bulk/export supply.",
    "",
    `*Name:* ${data.name}`,
    `*Company:* ${data.company}`,
    `*Country / Location:* ${data.country}`,
    `*Product of Interest:* ${data.product}`,
    `*Estimated Volume:* ${data.quantity}`,
  ];

  if (data.message && data.message.trim().length > 0) {
    lines.push(`*Notes/Requirement:* ${data.message.trim()}`);
  }

  lines.push("");
  lines.push("Please share specifications and quotation.");

  return buildWhatsAppLink(lines.join("\n"));
}

/**
 * Builds WhatsApp message for Contact form submission.
 */
export interface ContactFormData {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
}

export function buildContactFormLink(data: ContactFormData): string {
  const lines = [
    "Hello Pureliva, I have a message from your website contact form:",
    "",
    `*Name:* ${data.name}`,
  ];

  if (data.phone) lines.push(`*Phone:* ${data.phone}`);
  if (data.email) lines.push(`*Email:* ${data.email}`);
  if (data.subject) lines.push(`*Subject:* ${data.subject}`);
  lines.push(`*Message:* ${data.message}`);

  return buildWhatsAppLink(lines.join("\n"));
}

