import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { SITE_CONFIG } from "../config/site";
import SectionHeading from "../components/SectionHeading";
import WhatsAppIcon from "../components/WhatsAppIcon";
import { buildContactFormLink, ContactFormData } from "../lib/whatsapp";
import { MapPin, Mail, Phone, Instagram, Send, Clock, ShieldCheck } from "lucide-react";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "Product Order & Delivery Inquiry",
    message: "",
  });

  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      setFormError("Please fill in your Name and Message.");
      return;
    }
    setFormError("");

    const waUrl = buildContactFormLink(formData);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Pureliva Foods, Khandwa</title>
        <meta
          name="description"
          content="Get in touch with Pureliva Foods by Patidar Enterprises, Khandwa, Madhya Pradesh. Direct WhatsApp inquiries, order updates, and customer support."
        />
        <link rel="canonical" href="https://purelivafoods.com/contact" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Get in Touch"
            title="We'd Love to Hear From You"
            subtitle="Have a question about our roasted seeds, need pincode delivery confirmation, or want to discuss trade supply? Connect directly with our Khandwa team."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
            {/* Left: Contact Info & Operational Details */}
            <div className="lg:col-span-5 space-y-8">
              <div className="p-8 rounded-3xl bg-pureliva-cream border border-stone-200/80 shadow-soft space-y-6">
                <h3 className="font-heading text-2xl font-bold text-pureliva-heading">
                  Pureliva Headquarters
                </h3>

                <div className="space-y-4 text-sm text-pureliva-body">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-pureliva-brown shrink-0 mt-1" />
                    <div>
                      <strong className="text-pureliva-heading block">Registered Office:</strong>
                      <p>{SITE_CONFIG.address}</p>
                      <p className="text-xs text-pureliva-muted mt-0.5">Patidar Enterprises</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <WhatsAppIcon size={20} className="text-whatsapp shrink-0" fill="currentColor" />
                    <div>
                      <strong className="text-pureliva-heading block">WhatsApp & Voice:</strong>
                      <a
                        href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pureliva-green font-medium hover:underline"
                      >
                        {SITE_CONFIG.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={20} className="text-pureliva-brown shrink-0" />
                    <div>
                      <strong className="text-pureliva-heading block">Email:</strong>
                      <a
                        href={`mailto:${SITE_CONFIG.email}`}
                        className="hover:text-pureliva-green transition-colors"
                      >
                        {SITE_CONFIG.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Instagram size={20} className="text-pink-500 shrink-0" />
                    <div>
                      <strong className="text-pureliva-heading block">Instagram:</strong>
                      <a
                        href={SITE_CONFIG.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pureliva-heading font-medium hover:underline"
                      >
                        {SITE_CONFIG.instagramHandle}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200/60 flex items-center gap-3 text-xs text-pureliva-body">
                  <Clock size={16} className="text-pureliva-green shrink-0" />
                  <span>Support Hours: Mon – Sat, 9:00 AM – 7:00 PM IST</span>
                </div>
              </div>

              {/* FSSAI Registration Card */}
              <div className="p-6 rounded-3xl bg-white border border-stone-200 shadow-sm flex items-center gap-4">
                <img
                  src="/images/brand/fssai-logo.png"
                  alt="FSSAI"
                  className="h-10 w-auto object-contain"
                />
                <div className="text-xs text-pureliva-body">
                  <span className="font-semibold text-pureliva-heading block">Food Safety Authority of India</span>
                  <span className="font-mono text-pureliva-green font-bold">Lic. No. {SITE_CONFIG.fssaiNumber}</span>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-soft-lg">
              <h3 className="font-heading text-2xl font-bold text-pureliva-heading mb-2">
                Send Us a Message
              </h3>
              <p className="text-sm text-pureliva-body mb-6">
                Fill in the details below and click send. It will immediately open WhatsApp with your pre-formatted query.
              </p>

              {formError && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ananya@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                  >
                    <option value="Product Order & Delivery Inquiry">Product Order & Delivery Inquiry</option>
                    <option value="Pincode Serviceability Check">Pincode Serviceability Check</option>
                    <option value="Bulk / B2B Supply Inquiry">Bulk / B2B Supply Inquiry</option>
                    <option value="Product Feedback or Suggestions">Product Feedback or Suggestions</option>
                    <option value="Other Inquiries">Other Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you need, your delivery pincode, or specific questions..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-3 transition-all"
                  >
                    <WhatsAppIcon size={22} fill="#FFFFFF" />
                    <span>Send via WhatsApp (+91 97531 64155)</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Embedded Google Maps Section */}
          <div className="mt-20">
            <h3 className="font-heading text-2xl font-bold text-pureliva-heading mb-4 text-center">
              Our Location in Khandwa, Madhya Pradesh
            </h3>
            <p className="text-xs sm:text-sm text-pureliva-body text-center mb-8 max-w-xl mx-auto">
              Patidar Enterprises, 31, Vaikunth Nagar, Khandwa – 450001
            </p>

            <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-stone-200 shadow-soft">
              <iframe
                title="Pureliva Foods Khandwa Map Location"
                src={SITE_CONFIG.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

