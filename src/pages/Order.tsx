import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { PRODUCTS, Product } from "../data/products";
import Img from "../components/Img";
import QuantityStepper from "../components/QuantityStepper";
import WhatsAppIcon from "../components/WhatsAppIcon";
import SectionHeading from "../components/SectionHeading";
import { buildMultiProductOrderLink, OrderItem } from "../lib/whatsapp";
import { ShoppingBag, Check, Sparkles, AlertCircle, ArrowRight } from "lucide-react";

export const Order: React.FC = () => {
  // State for selected product items and their quantities
  const [selectedItems, setSelectedItems] = useState<{ [slug: string]: { selected: boolean; quantity: number } }>(
    PRODUCTS.reduce((acc, p, idx) => {
      // Default first product selected with qty 1
      acc[p.slug] = { selected: idx === 0, quantity: 1 };
      return acc;
    }, {} as { [slug: string]: { selected: boolean; quantity: number } })
  );

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    city: "",
    pincode: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const toggleSelect = (slug: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        selected: !prev[slug].selected,
      },
    }));
  };

  const updateQuantity = (slug: string, qty: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [slug]: {
        ...prev[slug],
        quantity: qty,
      },
    }));
  };

  const getActiveOrders = (): OrderItem[] => {
    const list: OrderItem[] = [];
    PRODUCTS.forEach((p) => {
      const state = selectedItems[p.slug];
      if (state && state.selected && state.quantity > 0) {
        list.push({
          name: p.titleWithVariant,
          quantity: state.quantity,
        });
      }
    });
    return list;
  };

  const activeOrders = getActiveOrders();
  const totalPacks = activeOrders.reduce((sum, item) => sum + item.quantity, 0);

  const handleSendOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeOrders.length === 0) {
      setErrorMessage("Please select at least one product for your order.");
      return;
    }
    setErrorMessage("");

    const waUrl = buildMultiProductOrderLink(activeOrders, customerInfo);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Helmet>
        <title>Build Your Order | Pureliva Foods</title>
        <meta
          name="description"
          content="Select multiple natural seed varieties, set custom quantities, and send your combined order directly to Pureliva on WhatsApp."
        />
        <link rel="canonical" href="https://purelivafoods.com/order" />
      </Helmet>

      <div className="pt-32 pb-24 bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeading
            badge="Custom Seed Box"
            title="Build Your Custom Pureliva Order"
            subtitle="Choose your favorite seed varieties, customize pouch quantities, and order your fresh bundle directly on WhatsApp in one click."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mt-8">
            {/* Left: Product Selection List */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-heading text-xl font-bold text-pureliva-heading mb-4 flex items-center justify-between">
                <span>Select Products (100g Pouches)</span>
                <span className="text-xs font-normal text-gray-500 font-body">
                  Tap to add or remove
                </span>
              </h3>

              {PRODUCTS.map((prod) => {
                const isSelected = selectedItems[prod.slug]?.selected;
                const qty = selectedItems[prod.slug]?.quantity || 1;

                return (
                  <motion.div
                    key={prod.slug}
                    layout
                    className={`p-4 sm:p-5 rounded-3xl border transition-all duration-300 flex items-center gap-4 ${
                      isSelected
                        ? "bg-white border-pureliva-green shadow-soft"
                        : "bg-gray-50/70 border-gray-200/80 hover:bg-white"
                    }`}
                  >
                    {/* Checkbox button */}
                    <button
                      type="button"
                      onClick={() => toggleSelect(prod.slug)}
                      aria-label={`Toggle ${prod.name}`}
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isSelected
                          ? "bg-pureliva-green text-white"
                          : "border-2 border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check size={16} strokeWidth={3} />}
                    </button>

                    {/* Small Bowl Image */}
                    <div
                      onClick={() => toggleSelect(prod.slug)}
                      className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 cursor-pointer flex items-center justify-center"
                    >
                      <Img
                        src={prod.images.bowl}
                        alt={`${prod.name} bowl`}
                        transparent
                        className="w-full h-full object-contain filter drop-shadow-sm"
                      />
                    </div>

                    {/* Product Info */}
                    <div
                      onClick={() => toggleSelect(prod.slug)}
                      className="flex-1 cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: prod.accent }}
                        />
                        <span className="text-xs text-gray-400 uppercase font-semibold">
                          {prod.type}
                        </span>
                      </div>
                      <h4 className="font-heading text-base sm:text-lg font-bold text-pureliva-heading">
                        {prod.name}
                      </h4>
                      <p className="text-xs text-pureliva-body line-clamp-1">
                        {prod.ingredients}
                      </p>
                    </div>

                    {/* Quantity Stepper (Active when selected) */}
                    <div className="shrink-0 flex flex-col items-end">
                      {isSelected ? (
                        <QuantityStepper
                          value={qty}
                          onChange={(val) => updateQuantity(prod.slug, val)}
                          size="sm"
                          min={1}
                          max={10}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => toggleSelect(prod.slug)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold text-pureliva-green bg-pureliva-green/10 hover:bg-pureliva-green/20 transition-colors"
                        >
                          + Add
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Right: Live Order Summary & Delivery Details */}
            <div className="lg:col-span-5 sticky top-28 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-pureliva-cream border border-stone-200/80 shadow-soft">
                <div className="flex items-center justify-between pb-4 border-b border-stone-200/70">
                  <h3 className="font-heading text-xl font-bold text-pureliva-heading flex items-center gap-2">
                    <ShoppingBag size={20} className="text-pureliva-green" />
                    <span>Order Summary</span>
                  </h3>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pureliva-green/10 text-pureliva-green">
                    {totalPacks} {totalPacks === 1 ? "Pack" : "Packs"} Total
                  </span>
                </div>

                {/* Selected Items Breakdown */}
                <div className="py-4 space-y-2.5 max-h-60 overflow-y-auto no-scrollbar">
                  {activeOrders.length === 0 ? (
                    <div className="py-6 text-center text-xs text-gray-400">
                      No products selected yet. Tick products from the list to build your order.
                    </div>
                  ) : (
                    activeOrders.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs sm:text-sm py-1.5 border-b border-stone-200/40"
                      >
                        <span className="font-medium text-pureliva-heading truncate max-w-[200px]">
                          {item.name}
                        </span>
                        <span className="font-mono font-bold text-pureliva-green">
                          {item.quantity} × 100g
                        </span>
                      </div>
                    ))
                  )}
                </div>

                {/* Optional Delivery Fields */}
                <div className="pt-4 border-t border-stone-200/70 space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                    Optional Delivery Details (speeds up dispatch)
                  </span>

                  <input
                    type="text"
                    placeholder="Your Name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={customerInfo.city}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                    />
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={customerInfo.pincode}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, pincode: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 bg-white focus:outline-none focus:border-pureliva-green"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Submit Order via WhatsApp */}
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={handleSendOrder}
                    disabled={activeOrders.length === 0}
                    className="w-full py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-hover disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm sm:text-base shadow-soft hover:shadow-soft-lg flex items-center justify-center gap-2.5 transition-all"
                  >
                    <WhatsAppIcon size={22} fill="#FFFFFF" />
                    <span>Send Order on WhatsApp ({totalPacks} Packs)</span>
                  </button>
                </div>

                <div className="mt-4 text-[11px] text-gray-400 text-center leading-relaxed">
                  We reply promptly with batch pricing, payment links (UPI / NetBanking) and dispatch tracking.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;

