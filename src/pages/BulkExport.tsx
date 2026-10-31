import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "../config/site";
import SectionHeading from "../components/SectionHeading";
import WhatsAppIcon from "../components/WhatsAppIcon";
import Marquee from "../components/Marquee";
import { buildBulkEnquiryLink, BulkEnquiryData } from "../lib/whatsapp";
import {
  Globe,
  Truck,
  ShieldCheck,
  Zap,
  Building2,
  FileCheck2,
  PackageCheck,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export const BulkExport: React.FC = () => {
  const [formData, setFormData] = useState<BulkEnquiryData>({
    name: "",
    company: "",
    country: "India",
    product: "Chia Seeds",
    quantity: "500 kg",
    message: "",
  });

  const [formError, setFormError] = useState("");

  const bulkCatalog = [
    {
      name: "Bulk Chia Seeds",
      spec: "Purity 99.9% min · Machine cleaned & Sortexed",
      packaging: "25 kg / 50 kg multi-wall paper bags / PP bags",
      icon: "🌱",
      type: "Superfood Seeds",
    },
    {
      name: "Bulk Flax Seeds",
      spec: "Brown & Golden variants · High oil content (>38%)",
      packaging: "25 kg / 50 kg PP bags / customized",
      icon: "🌾",
      type: "Oilseeds & Food",
    },
    {
      name: "Dehydrated Onion Flakes",
      spec: "White & Red Onion · Moisture < 6% · Premium pungent aroma",
      packaging: "14 kg / 20 kg poly-lined cartons",
      icon: "🧅",
      type: "Dehydrated Spices",
    },
    {
      name: "Garlic Powder",
      spec: "100 mesh · Free flowing · Pure aroma · No anti-caking additives",
      packaging: "20 kg / 25 kg fiber drums / cartons",
      icon: "🧄",
      type: "Seasoning Powder",
    },
    {
      name: "Dry Garlic (Whole Bulbs & Cloves)",
      spec: "Khandwa / MP Origin · Thick skin · Strong pungency",
      packaging: "20 kg / 40 kg mesh bags / ventilated boxes",
      icon: "🧄",
      type: "Whole Agricultural",
    },
  ];

  const whyChooseB2B = [
    {
      icon: Building2,
      title: "Direct Farm Aggregation",
      desc: "Aggregated straight from grower belts across Central India with rigorous traceability.",
    },
    {
      icon: ShieldCheck,
      title: "Certified Food Grade Handling",
      desc: "Processed in accordance with ISO 22000, HACCP, GMP and FSSAI sanitary norms.",
    },
    {
      icon: Globe,
      title: "Bulk Export Readiness",
      desc: "Phytosanitary certification, lab COA, export documentation, and container loading capability.",
    },
    {
      icon: Zap,
      title: "Fast Quotation & Sample Support",
      desc: "Immediate pricing sheets and prompt courier dispatch of test evaluation samples.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.company.trim()) {
      setFormError("Please fill in your Name and Company Name.");
      return;
    }
    setFormError("");

    const waLink = buildBulkEnquiryLink(formData);
    window.open(waLink, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>Bulk Agro Supply & Export | Pureliva Foods</title>
        <meta
          name="description"
          content="Wholesale and export supply of Chia Seeds, Flax Seeds, Onion Flakes, Garlic Powder and Dry Garlic by Patidar Enterprises, Khandwa, MP."
        />
        <link rel="canonical" href="https://purelivafoods.com/bulk-export" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            badge="B2B & Global Trade"
            title="Commercial Bulk Supply & Global Exports"
            subtitle="Supplying food processors, FMCG manufacturers, spice repackers, and international importers directly from Madhya Pradesh's rich agro belt."
            align="center"
          />

          {/* Catalog of Bulk Products (With Illustrated Cards for Dehydrated Items) */}
          <div className="mt-12 mb-20">
            <h3 className="font-heading text-2xl font-bold text-pureliva-heading text-center mb-8">
              Available Bulk Commodities
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bulkCatalog.map((prod, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 rounded-3xl bg-pureliva-cream border border-stone-200/80 shadow-soft flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-3xl">{prod.icon}</span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-pureliva-green/10 text-pureliva-green">
                        {prod.type}
                      </span>
                    </div>

                    <h4 className="font-heading text-xl font-bold text-pureliva-heading mb-2">
                      {prod.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-pureliva-body mb-3 font-medium">
                      {prod.spec}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-200/60 text-xs text-gray-500">
                    <span className="font-semibold text-pureliva-heading">Packaging:</span> {prod.packaging}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Why Buyers Choose Pureliva (4 Pillars) */}
          <div className="my-20 p-8 sm:p-12 rounded-3xl bg-pureliva-green text-white">
            <div className="max-w-3xl mb-12">
              <span className="font-script text-2xl text-pureliva-brown">
                Trusted Commercial Partner
              </span>
              <h3 className="font-heading text-3xl sm:text-4xl font-bold mt-1">
                Why Institutional Buyers Choose Pureliva
              </h3>
              <p className="text-sm sm:text-base text-emerald-100/80 mt-2">
                We bridge regional farm aggregation with international export compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyChooseB2B.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="p-6 rounded-2xl bg-emerald-900/60 border border-emerald-800">
                    <Icon size={24} className="text-pureliva-brown mb-4" />
                    <h4 className="font-heading text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-xs text-emerald-100/75 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* B2B Enquiry Form (Opens WhatsApp on submit) */}
          <div className="max-w-3xl mx-auto my-16 p-8 sm:p-12 rounded-3xl bg-white border border-stone-200 shadow-soft-lg">
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-bold tracking-widest text-pureliva-green">
                Direct WhatsApp Quotation
              </span>
              <h3 className="font-heading text-3xl font-bold text-pureliva-heading mt-1">
                Request a Bulk / Export Quotation
              </h3>
              <p className="text-sm text-pureliva-body mt-2">
                Submit this quick form to send your requirements straight to our trade desk on WhatsApp. We respond within 24 hours.
              </p>
            </div>

            {formError && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 text-xs font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Company / Entity *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. AgroCorp Global"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Country / State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. India, UAE, UK"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Commodity *
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green bg-white"
                  >
                    <option value="Chia Seeds">Bulk Chia Seeds</option>
                    <option value="Flax Seeds">Bulk Flax Seeds</option>
                    <option value="Onion Flakes">Dehydrated Onion Flakes</option>
                    <option value="Garlic Powder">Garlic Powder</option>
                    <option value="Dry Garlic">Dry Garlic (Whole / Cloves)</option>
                    <option value="Custom Mixed Load">Custom / Mixed Container</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Volume Requirement *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g. 500 kg, 5 MT, 1 FCL"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                  Specification Details or Message
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mention desired purity grades, delivery terms (FOB/CIF), port destination, packaging preference..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-pureliva-green"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover text-white font-semibold text-base shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-3 transition-all"
                >
                  <WhatsAppIcon size={22} fill="#FFFFFF" />
                  <span>Send Enquiry via WhatsApp</span>
                </button>
              </div>

              <p className="text-center text-[11px] text-gray-400">
                Opening WhatsApp will populate this query instantly into an editable draft to +91 97531 64155.
              </p>
            </form>
          </div>
        </div>

        {/* Marquee */}
        <Marquee />
      </div>
    </>
  );
};

export default BulkExport;

