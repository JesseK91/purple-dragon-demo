"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { resolveActiveMenuUrl, siteConfig } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import { Sparkles, Calendar, Check, X, ShieldAlert, AlertCircle } from "lucide-react";

export type Category = "flower" | "pre_rolls" | "concentrates" | "edibles" | "vapes" | "accessories";

export interface Product {
  id: string;
  category: Category;
  name: string;
  type: string;
  thc: string;
  image: string;
  batch: string;
  inStock: boolean;
  nextDrop?: string;
  lineage: string;
  spec1Label: string;
  spec1Value: string;
  spec2Label: string;
  spec2Value: string;
  spec3Label: string;
  spec3Value: string;
}

const categories: { key: Category; label: string; subLabel: string }[] = [
  { key: "flower", label: "Flower", subLabel: "/ Fresh Cuts & House Deals" },
  { key: "pre_rolls", label: "Pre-Rolls", subLabel: "/ Quick Grabs & Patient Specials" },
  { key: "concentrates", label: "Concentrates", subLabel: "/ Wax, Badder, Resin & Rosin" },
  { key: "edibles", label: "Edibles", subLabel: "/ Smoke-Free Options" },
  { key: "vapes", label: "Vapes", subLabel: "/ Carts, Pods & Disposables" },
  { key: "accessories", label: "Head Shop Glass", subLabel: "/ Bongs, Dab Rigs & Custom Glass" },
];

const products: Product[] = [
  {
    id: "01",
    category: "flower",
    name: "Purple Platinum",
    type: "FLOWER",
    thc: "Varies",
    image: "/hero-bud.webp",
    batch: "3.5g eighth",
    inStock: true,
    lineage: "Platinum OG x Purple Urkle",
    spec1Label: "Profile",
    spec1Value: "Indica-leaning",
    spec2Label: "Format",
    spec2Value: "Flower",
    spec3Label: "Confirm",
    spec3Value: "Current batch",
  },
  {
    id: "02",
    category: "flower",
    name: "Lime Silver",
    type: "VALUE",
    thc: "Varies",
    image: "/strain-purple.webp",
    batch: "3.5g eighth",
    inStock: true,
    lineage: "Super Silver Haze x Key Lime Pie",
    spec1Label: "Profile",
    spec1Value: "Sativa-leaning",
    spec2Label: "Format",
    spec2Value: "Flower",
    spec3Label: "Ask about",
    spec3Value: "Current price",
  },
  {
    id: "03",
    category: "flower",
    name: "Gelato Serpent",
    type: "PREMIUM",
    thc: "Varies",
    image: "/strain-lime.webp",
    batch: "3.5g eighth",
    inStock: false,
    nextDrop: "Call ahead for the current batch.",
    lineage: "Gelato 33 x Venom OG",
    spec1Label: "Profile",
    spec1Value: "Hybrid",
    spec2Label: "Format",
    spec2Value: "Flower",
    spec3Label: "Confirm",
    spec3Value: "Availability",
  },
  {
    id: "04",
    category: "pre_rolls",
    name: "Slapz 1g Pre-Roll",
    type: "PRE-ROLL",
    thc: "24.3%",
    image: "/preroll_product.png",
    batch: "Fast curbside",
    inStock: true,
    lineage: "Sweet profile",
    spec1Label: "Format",
    spec1Value: "Ready-to-smoke",
    spec2Label: "Good for",
    spec2Value: "Curbside pickup",
    spec3Label: "Seen on",
    spec3Value: "Weedmaps",
  },
  {
    id: "05",
    category: "pre_rolls",
    name: "Bubble Bath 1g Pre-Roll",
    type: "PRE-ROLL",
    thc: "21.4%",
    image: "/preroll_product.png",
    batch: "Fast curbside",
    inStock: true,
    lineage: "Sweet profile",
    spec1Label: "Format",
    spec1Value: "Ready-to-smoke",
    spec2Label: "Good for",
    spec2Value: "Everyday option",
    spec3Label: "Seen on",
    spec3Value: "Weedmaps",
  },
  {
    id: "06",
    category: "pre_rolls",
    name: "Mochi 1g Pre-Roll",
    type: "PRE-ROLL",
    thc: "22.6%",
    image: "/preroll_product.png",
    batch: "Fast curbside",
    inStock: true,
    lineage: "Mochi Gelato profile",
    spec1Label: "Format",
    spec1Value: "Ready-to-smoke",
    spec2Label: "Good for",
    spec2Value: "Sweet strains",
    spec3Label: "Seen on",
    spec3Value: "Weedmaps",
  },
  {
    id: "07",
    category: "concentrates",
    name: "Lemon Cake",
    type: "CONCENTRATE",
    thc: "74.4%",
    image: "/concentrates_product.webp",
    batch: "1g concentrate",
    inStock: true,
    lineage: "Premium concentrate",
    spec1Label: "Format",
    spec1Value: "Gram",
    spec2Label: "Good for",
    spec2Value: "Dab-ready",
    spec3Label: "Confirm",
    spec3Value: "Current stock",
  },
  {
    id: "08",
    category: "concentrates",
    name: "Apricot Badder",
    type: "LIVE RESIN",
    thc: "80.1%",
    image: "/apricot_badder.webp",
    batch: "1g concentrate",
    inStock: true,
    lineage: "Apricot Helix x Jelly Breath",
    spec1Label: "Format",
    spec1Value: "Gram",
    spec2Label: "Good for",
    spec2Value: "Live resin",
    spec3Label: "Ask about",
    spec3Value: "Current price",
  },
  {
    id: "09",
    category: "concentrates",
    name: "Pineapple Melt",
    type: "SOLVENTLESS",
    thc: "Varies",
    image: "/pineapple_melt.webp",
    batch: "1g concentrate",
    inStock: false,
    nextDrop: "Solventless options rotate by batch.",
    lineage: "Pineapple Express profile",
    spec1Label: "Format",
    spec1Value: "Gram",
    spec2Label: "Good for",
    spec2Value: "Flavor profile",
    spec3Label: "Confirm",
    spec3Value: "Same-day stock",
  },
  {
    id: "10",
    category: "edibles",
    name: "Blackberry Gummies",
    type: "EDIBLE",
    thc: "Varies",
    image: "/edibles_product.webp",
    batch: "Easy dosing",
    inStock: true,
    lineage: "Fruit profile",
    spec1Label: "Format",
    spec1Value: "Gummy Pack",
    spec2Label: "Good for",
    spec2Value: "Curbside pickup",
    spec3Label: "Confirm",
    spec3Value: "Current batch",
  },
  {
    id: "11",
    category: "edibles",
    name: "Cacao Bar",
    type: "EDIBLE",
    thc: "Varies",
    image: "/cacao_bar.webp",
    batch: "Chocolate format",
    inStock: true,
    lineage: "Chocolate profile",
    spec1Label: "Format",
    spec1Value: "Bar",
    spec2Label: "Good for",
    spec2Value: "Curbside pickup",
    spec3Label: "Ask about",
    spec3Value: "Current price",
  },
  {
    id: "12",
    category: "edibles",
    name: "Cherry Bites",
    type: "PREMIUM",
    thc: "Varies",
    image: "/cherry_bites.webp",
    batch: "Rotating options",
    inStock: false,
    nextDrop: "Edible flavors rotate by batch.",
    lineage: "Cherry profile",
    spec1Label: "Format",
    spec1Value: "Gummy Pack",
    spec2Label: "Good for",
    spec2Value: "Smoke-free options",
    spec3Label: "Confirm",
    spec3Value: "Same-day stock",
  },
  {
    id: "13",
    category: "vapes",
    name: "Purple Dragon Pod 1g",
    type: "VAPE POD",
    thc: "82.4%",
    image: "/vape_product.webp",
    batch: "1g cartridge",
    inStock: true,
    lineage: "Pure distillate",
    spec1Label: "Format",
    spec1Value: "Cartridge",
    spec2Label: "Hardware",
    spec2Value: "Proprietary",
    spec3Label: "Confirm",
    spec3Value: "Current stock",
  },
  {
    id: "14",
    category: "vapes",
    name: "Gold Crown Pod 1g",
    type: "SOLVENTLESS",
    thc: "78.2%",
    image: "/vape_product.webp",
    batch: "1g cartridge",
    inStock: true,
    lineage: "Pure solventless live rosin",
    spec1Label: "Format",
    spec1Value: "Cartridge",
    spec2Label: "Hardware",
    spec2Value: "Universal 510",
    spec3Label: "Ask about",
    spec3Value: "Current price",
  },
  {
    id: "15",
    category: "vapes",
    name: "Venom Cart 1g",
    type: "DISTILLATE",
    thc: "Varies",
    image: "/venom_cart.webp",
    batch: "1g cartridge",
    inStock: false,
    nextDrop: "Vape cartridges rotate by batch.",
    lineage: "Distillate profile",
    spec1Label: "Format",
    spec1Value: "Cartridge",
    spec2Label: "Hardware",
    spec2Value: "Universal 510",
    spec3Label: "Confirm",
    spec3Value: "Same-day stock",
  },
  {
    id: "16",
    category: "accessories",
    name: "Dragon Claw Recycler Rig",
    type: "GLASS",
    thc: "None",
    image: "/glass_recycler.png",
    batch: "Vibrant yellow accents",
    inStock: true,
    lineage: "Dual-chamber recycling glass",
    spec1Label: "Height",
    spec1Value: "8.5 inches",
    spec2Label: "Joint Size",
    spec2Value: "14mm Female",
    spec3Label: "Source",
    spec3Value: "Local glassblower",
  },
  {
    id: "17",
    category: "accessories",
    name: "Purple Dragon Ceramic Bong",
    type: "GLASS",
    thc: "None",
    image: "/ceramic_bong.png",
    batch: "Custom glaze finish",
    inStock: true,
    lineage: "Heavy-duty custom ceramic",
    spec1Label: "Height",
    spec1Value: "11 inches",
    spec2Label: "Includes",
    spec2Value: "14mm glass bowl",
    spec3Label: "Design",
    spec3Value: "Handcrafted emblem",
  },
  {
    id: "18",
    category: "accessories",
    name: "Chamber Shredder Grinder",
    type: "METAL",
    thc: "None",
    image: "/metal_grinder.png",
    batch: "Matt black anodized",
    inStock: true,
    lineage: "Aircraft-grade aluminum",
    spec1Label: "Diameter",
    spec1Value: "2.5 inches",
    spec2Label: "Features",
    spec2Value: "Magnetic lid / 4-piece",
    spec3Label: "Includes",
    spec3Value: "Pollen scraper",
  },
];

interface FeaturedMenuProps {
  onAddToPreOrder?: (product: Product) => void;
  openRestocksTrigger?: boolean;
  onResetRestocksTrigger?: () => void;
}

export default function FeaturedMenu({
  onAddToPreOrder,
  openRestocksTrigger,
  onResetRestocksTrigger,
}: FeaturedMenuProps) {
  const [activeCategory, setActiveCategory] = useState<Category>("flower");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Restock form states
  const [firstName, setFirstName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [categoriesPref, setCategoriesPref] = useState<string[]>([]);
  const [smsConsent, setSmsConsent] = useState(false);
  const [formError, setFormError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Track initial category view and subsequent switches
  useEffect(() => {
    track("featured_product_view", { category: activeCategory });
  }, [activeCategory]);

  useEffect(() => {
    if (openRestocksTrigger) {
      setSelectedProduct(null);
      // Trigger general waitlist modal by creating custom placeholder product
      const genericRestockProduct: Product = {
        id: "all",
        category: activeCategory,
        name: "Restocks & New Drops",
        type: "TEXT ALERTS",
        thc: "Varies",
        image: "/hero-bud.webp",
        batch: "Fresh menu options",
        inStock: false,
        lineage: "Stay notified",
        spec1Label: "Channel",
        spec1Value: "SMS & Email",
        spec2Label: "Service",
        spec2Value: "Real-time alerts",
        spec3Label: "Compliance",
        spec3Value: "OMMA required",
      };
      setSelectedProduct(genericRestockProduct);
      if (onResetRestocksTrigger) onResetRestocksTrigger();
    }
  }, [openRestocksTrigger, activeCategory, onResetRestocksTrigger]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("modal-visibility-change", {
        detail: { open: selectedProduct !== null },
      }),
    );
  }, [selectedProduct]);

  const handleCurbsideClick = (product: Product) => {
    track("featured_product_curbside_click", { productId: product.id, name: product.name });
    if (onAddToPreOrder) onAddToPreOrder(product);
  };

  const handleAvailabilityClick = (product: Product) => {
    track("featured_product_availability_click", { productId: product.id, name: product.name });
    setSelectedProduct(product);
    setSubmitSuccess(false);
    setFormError("");
  };

  const handleFullMenuClick = () => {
    const url = resolveActiveMenuUrl(siteConfig);
    if (!url) {
      track("menu_route_unavailable", { source: "featured_menu", provider: siteConfig.activeMenuProvider });
      return;
    }
    track("featured_product_full_menu_click", { provider: siteConfig.activeMenuProvider, url });
    window.open(url, "_blank");
  };

  const toggleCategoryPref = (catLabel: string) => {
    if (categoriesPref.includes(catLabel)) {
      setCategoriesPref(categoriesPref.filter((c) => c !== catLabel));
    } else {
      setCategoriesPref([...categoriesPref, catLabel]);
    }
  };

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!firstName.trim()) {
      setFormError("Please enter your name.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone && !email.trim()) {
      setFormError("Please provide either a mobile number or an email address.");
      return;
    }

    if (cleanPhone && cleanPhone.length < 10) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (cleanPhone && !smsConsent && !email.trim()) {
      setFormError("Enter an email address or check the text-message consent box.");
      return;
    }

    const productName = selectedProduct?.name || "Restocks & New Drops";

    try {
      const response = await fetch("/api/lead-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firstName,
          phone: cleanPhone || null,
          email: email.trim() || null,
          service_type: `Availability: ${productName}`,
          property_type: "retail",
          urgency: "NORMAL",
          message: `Availability request for ${productName}. Interests: ${categoriesPref.join(", ") || "Not selected"}.`,
          source: "featured_menu_availability_modal",
          metadata: {
            product_id: selectedProduct?.id,
            product_name: productName,
            categories: categoriesPref,
            sms_opt_in: Boolean(cleanPhone && smsConsent),
            email_opt_in: Boolean(email.trim()),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Lead Guard availability intake failed");
      }

      track("featured_product_waitlist_submit", {
        productId: selectedProduct?.id,
        productName,
        firstName,
        phone: cleanPhone || undefined,
        email: email.trim() || undefined,
        categoriesPref,
        smsConsent,
      });

      const existingLeads = JSON.parse(localStorage.getItem("purple_dragon_leads_list") || "[]");
      const newLead = {
        id: Math.random().toString(36).substring(2, 9),
        name: firstName,
        phone: cleanPhone || null,
        email: email.trim() || null,
        license: smsConsent ? "SMS-OPT-IN" : "EMAIL-OPT-IN",
        message: `Availability request for ${productName}`,
        categories: categoriesPref,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("purple_dragon_leads_list", JSON.stringify([newLead, ...existingLeads]));

      setSubmitSuccess(true);
      setTimeout(() => {
        setSelectedProduct(null);
        setFirstName("");
        setPhone("");
        setEmail("");
        setSmsConsent(false);
        setCategoriesPref([]);
        setSubmitSuccess(false);
      }, 4000);
    } catch (error) {
      console.error(error);
      setFormError("Availability request failed. Please try again.");
    }
  };

  const filteredProducts = products.filter((p) => p.category === activeCategory);

  return (
    <section id="menu" className="py-24 px-8 bg-black relative scroll-mt-20">
      <div className="max-w-[1800px] mx-auto flex flex-col gap-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <Sparkles size={16} className="text-white/40" />
              <span className="mono-label text-white/50 tracking-[0.3em] uppercase">Featured Menu Preview</span>
            </div>
            <h2 className="boutique-title text-4xl sm:text-5xl md:text-6xl xl:text-7xl uppercase font-black text-white">
              Fresh Drops
            </h2>
          </div>
          <p className="max-w-md text-white/80 text-xs font-light leading-relaxed">
            A premium selection of curated medical flower, concentrates, vapes, and essentials. View today&apos;s drop availability or tap curbside order to lock in your items.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-6 overflow-x-auto whitespace-nowrap scrollbar-none">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              className={`mono-label px-5 py-3 text-[10px] tracking-widest font-black uppercase cursor-pointer transition-all border ${
                activeCategory === category.key
                  ? "bg-white text-black border-white"
                  : "border-white/10 text-white hover:border-white/30"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1px bg-white/5 border border-white/5">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-background p-8 flex flex-col justify-between gap-8 hover:bg-white/1 transition-colors duration-500 overflow-hidden"
              >
                {/* Photo Containment with corner tag */}
                <div className="relative aspect-square w-full filter md:grayscale md:group-hover:grayscale-0 transition-all duration-700">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover scale-110 group-hover:scale-120 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors" />

                  {!product.inStock && (
                    <div className="absolute top-4 left-4 z-20">
                      <span className="mono-label bg-yellow-500/10 backdrop-blur-md text-yellow-400 border border-yellow-500/20 px-3 py-1.5 font-bold text-[8px] tracking-widest uppercase font-mono">
                        Limited Availability
                      </span>
                    </div>
                  )}
                </div>

                {/* Specs and details */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-purple-400/50 text-[9px] font-mono">{product.batch}</span>
                    <span className="mono-label text-purple-200 px-2 py-0.5 border border-purple-800/30 bg-purple-950/40 !text-[8px] font-mono">
                      {product.type}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="boutique-title text-2xl font-black text-white">{product.name}</h3>
                    <span className="mono-label text-purple-200/80 !text-[8px] font-mono tracking-wide uppercase">
                      {product.lineage}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="mono-label text-purple-400/30 !text-[8px] font-mono">Potency</span>
                      <span className="mono-label text-purple-200 !text-[8px] font-bold font-mono">{product.thc}</span>
                    </div>
                    <div className="w-full h-[1px] bg-purple-900/10" />
                    <div className="flex items-center justify-between">
                      <span className="mono-label text-purple-400/30 !text-[8px] font-mono">{product.spec1Label}</span>
                      <span className="mono-label text-purple-200 !text-[8px] font-mono text-right truncate max-w-[150px]">
                        {product.spec1Value}
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-purple-900/10" />
                    <div className="flex items-center justify-between">
                      <span className="mono-label text-purple-400/30 !text-[8px] font-mono">{product.spec2Label}</span>
                      <span className="mono-label text-purple-200 !text-[8px] font-mono text-right truncate max-w-[150px]">
                        {product.spec2Value}
                      </span>
                    </div>
                    <div className="w-full h-[1px] bg-purple-900/10" />
                    <div className="flex items-center justify-between">
                      <span className="mono-label text-purple-400/30 !text-[8px] font-mono">{product.spec3Label}</span>
                      <span className="mono-label text-purple-200 !text-[8px] font-mono text-right truncate max-w-[150px]">
                        {product.spec3Value}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 z-10">
                  {product.inStock ? (
                    <button
                      onClick={() => handleCurbsideClick(product)}
                      className="w-full mono-label border border-yellow-400 py-3.5 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[9px] cursor-pointer uppercase font-mono"
                    >
                      Start Curbside Order
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAvailabilityClick(product)}
                      className="w-full mono-label border border-purple-800/30 py-3.5 text-purple-200 hover:border-yellow-400 hover:bg-purple-950/20 hover:text-yellow-400 transition-all font-black text-center text-[9px] cursor-pointer uppercase font-mono"
                    >
                      Check Availability
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Permanent "Restocks & New Drops" Waitlist Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: filteredProducts.length * 0.05 }}
              className="group relative bg-purple-950/80 border border-purple-900/20 p-8 flex flex-col justify-between gap-8 hover:bg-purple-950/20 transition-colors duration-500 overflow-hidden"
            >
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <span className="mono-label bg-yellow-500/10 text-yellow-400 px-2 py-0.5 border border-yellow-500/20 !text-[8px] font-mono">
                    DROP ALERTS
                  </span>
                  <Calendar size={16} className="text-purple-400/40" />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="boutique-title text-2xl font-black text-white">Restocks & Drops</h3>
                  <p className="text-xs text-purple-100/90 leading-relaxed font-light">
                    Solventless live rosin batches and premium top-shelf flower rotate daily. Join the drop alerts list to be notified instantly on restocks.
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 text-[9px] font-mono text-purple-400/50">
                  <div className="flex justify-between">
                    <span>Active category:</span>
                    <span className="text-yellow-400 uppercase font-bold">{activeCategory}</span>
                  </div>
                  <div className="w-full h-[1px] bg-purple-900/10" />
                  <div className="flex justify-between">
                    <span>Updates:</span>
                    <span className="text-purple-200">Real-Time SMS & Email</span>
                  </div>
                  <div className="w-full h-[1px] bg-purple-900/10" />
                  <div className="flex justify-between">
                    <span>Requires:</span>
                    <span className="text-purple-200">OMMA Card</span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => {
                    const dummyProduct: Product = {
                      id: "all",
                      category: activeCategory,
                      name: "Restocks & New Drops",
                      type: "DROP ALERTS",
                      thc: "Varies",
                      image: "/hero-bud.webp",
                      batch: "Fresh menu options",
                      inStock: false,
                      lineage: "Stay notified",
                      spec1Label: "Channel",
                      spec1Value: "SMS & Email",
                      spec2Label: "Service",
                      spec2Value: "Real-time alerts",
                      spec3Label: "Compliance",
                      spec3Value: "OMMA required",
                    };
                    handleAvailabilityClick(dummyProduct);
                  }}
                  className="w-full mono-label border border-yellow-400 py-3.5 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[9px] cursor-pointer uppercase font-mono"
                >
                  Join Restock Alerts
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Catalog Disclaimer Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-purple-900/20 pt-8 mt-6 gap-6">
          <div className="flex items-center gap-2 text-purple-400/40 font-mono text-[9px]">
            <AlertCircle size={12} className="shrink-0" />
            <span>
              Demo product data. Final menu, pricing, lab data, and availability are supplied by the dispensary or synced through its current menu provider.
            </span>
          </div>

          <button
            onClick={handleFullMenuClick}
            className="mono-label border border-purple-800/30 px-6 py-3 text-purple-200 hover:border-yellow-400 hover:bg-purple-950/20 hover:text-yellow-400 transition-all font-black text-[9px] cursor-pointer uppercase font-mono"
          >
            Open Full Menu Listing
          </button>
        </div>

      </div>

      {/* Waitlist Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-md bg-purple-950/80 border border-purple-900/30 p-8 flex flex-col gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-6 right-6 text-purple-400 hover:text-yellow-400 cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col gap-2">
                <span className="mono-label text-purple-400 tracking-[0.2em] text-[8px] uppercase font-mono">Waitlist & Drops</span>
                <h3 className="boutique-title text-3xl font-black text-white">{selectedProduct.name}</h3>
                <p className="text-purple-100/90 text-xs font-light leading-relaxed">
                  Ask about availability or join alerts for this item. Email is fine. Texts are optional and only apply if you choose to receive them.
                </p>
              </div>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 gap-4 border border-purple-900/30 bg-purple-950/10 rounded-sm"
                >
                  <div className="w-12 h-12 bg-yellow-500 text-black rounded-full flex items-center justify-center border border-yellow-400">
                    <Check size={24} />
                  </div>
                  <div className="flex flex-col items-center text-center px-6">
                    <span className="mono-label text-yellow-400 font-bold text-xs uppercase tracking-widest font-mono">Request Sent</span>
                    <span className="text-[10px] text-purple-100/95 font-mono mt-2 leading-relaxed uppercase">
                      Thanks. We saved your availability request for {selectedProduct.name}.
                    </span>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col gap-4">
                  {formError && (
                    <div className="flex items-center gap-2 border border-red-500/20 bg-red-500/5 p-3 text-red-400 text-xs font-mono rounded-sm">
                      <ShieldAlert size={14} className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/50 text-[8px] uppercase font-mono">First Name</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="e.g. Jesse"
                      className="bg-purple-950/10 border border-purple-800/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-300/25"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/50 text-[8px] uppercase font-mono">Mobile Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. (580) 555-0199"
                      className="bg-purple-950/10 border border-purple-800/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-300/25"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="mono-label text-purple-400/50 text-[8px] uppercase font-mono">Email Address (Email Alerts)</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. jesse@example.com"
                      className="bg-purple-950/10 border border-purple-800/30 px-4 py-3 text-purple-100 text-sm font-mono focus:border-yellow-400 focus:outline-none transition-colors rounded-sm placeholder:text-purple-300/25"
                    />
                  </div>

                  {/* Preference Selects */}
                  <div className="flex flex-col gap-2 border border-purple-900/20 p-4 bg-purple-950/10 rounded-sm mt-1">
                    <label className="mono-label text-purple-400/50 text-[8px] uppercase font-mono">Interested Categories</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      {["Flower", "Concentrates", "Edibles", "Vapes"].map((catLabel) => {
                        const isSelected = categoriesPref.includes(catLabel);
                        return (
                          <button
                            type="button"
                            key={catLabel}
                            onClick={() => toggleCategoryPref(catLabel)}
                            className={`mono-label py-2 px-3 text-[8px] uppercase tracking-wider text-center border font-mono rounded-sm transition-all ${
                              isSelected
                                ? "bg-yellow-500 text-black border-yellow-400 font-bold"
                                : "bg-purple-950/20 text-purple-300 border-purple-900/30 hover:border-yellow-400/50"
                            }`}
                          >
                            {catLabel}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 mt-2 border border-purple-900/20 p-4 bg-purple-950/10 rounded-sm">
                    <input
                      id="modal-consent"
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-1 bg-transparent border-purple-800/30 focus:ring-0 rounded-sm cursor-pointer"
                    />
                    <label htmlFor="modal-consent" className="text-[9px] text-purple-200/80 leading-relaxed font-mono">
                      Optional text alerts: I agree to receive marketing text messages from {siteConfig.storeName} at the phone number provided. Message frequency may vary. Reply STOP to opt out. Email alerts do not require SMS consent.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full mono-label border border-yellow-400 py-4 bg-yellow-500 text-black hover:bg-transparent hover:text-yellow-400 transition-all font-black text-center text-[10px] cursor-pointer uppercase mt-2 font-mono"
                  >
                    Send Availability Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
