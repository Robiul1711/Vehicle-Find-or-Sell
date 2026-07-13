import React, { useState } from "react";
import { ScrollRestoration, Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useApiQuery } from "@/hooks/useApiQuery";
import SEO from "@/components/common/SEO";
import { Search, HelpCircle, MessageSquare, ArrowRight } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FaqPage = () => {
  const selectedLanguage = localStorage.getItem("selectedLanguage") || "fr";
  const { data, isLoading } = useApiQuery({
    queryKey: ["faq"],
    url: "/support/faq/",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const faqs = data?.data || [];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50/50">
        <SEO title="FAQ" />
        {/* Loading Hero */}
        <div className="w-full bg-slate-900 py-16 md:py-24 text-center space-y-4">
          <div className="h-4 w-24 bg-slate-800 rounded-full mx-auto animate-pulse"></div>
          <div className="h-10 w-64 bg-slate-800 rounded-lg mx-auto animate-pulse"></div>
          <div className="h-12 w-96 max-w-[90%] bg-slate-800 rounded-full mx-auto animate-pulse"></div>
        </div>

        {/* Loading Accordions */}
        <div className="section-padding-x py-12 max-w-4xl mx-auto space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 w-full bg-white border border-gray-100 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <SEO
        title={selectedLanguage === "fr" ? "Foire Aux Questions (FAQ)" : "Frequently Asked Questions (FAQ)"}
        description="Trouvez des réponses rapides aux questions les plus fréquentes sur l'achat, la vente et la location de véhicules."
      />
      <ScrollRestoration />

      {/* Premium Hero Header Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-custom-primary/30 text-white py-16 md:py-24 px-4 border-b border-slate-800/60">
        {/* Decorative background grid and glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-custom-primary/10 rounded-full filter blur-[100px] animate-pulse pointer-events-none" />

        <div className="relative max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white/90 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border border-white/10 uppercase"
          >
            <HelpCircle size={14} className="text-custom-secondary" />
            {selectedLanguage === "fr" ? "Centre d'aide" : "Help Center"}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white capitalize"
          >
            {selectedLanguage === "fr" ? "Comment pouvons-nous vous aider ?" : "How can we help you?"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-sm md:text-lg max-w-2xl mx-auto font-light leading-relaxed"
          >
            {selectedLanguage === "fr"
              ? "Recherchez dans notre foire aux questions ou parcourez les rubriques ci-dessous."
              : "Search our frequently asked questions or browse the sections below."}
          </motion.p>

          {/* Interactive Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xl mx-auto pt-4 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-custom-primary to-custom-secondary rounded-full filter blur-[6px] opacity-20 group-hover:opacity-40 transition duration-300" />
            <div className="relative flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:border-white/30 hover:bg-white/15 transition-all duration-300">
              <Search className="absolute left-4 sm:left-5 text-slate-400 group-hover:text-white transition-colors duration-300" size={18} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={selectedLanguage === "fr" ? "Rechercher une question ou un mot-clé..." : "Search a question or keyword..."}
                className="w-full pl-10 sm:pl-12 pr-6 py-3 sm:py-4 bg-transparent border-none outline-none text-white text-sm sm:text-base placeholder-slate-400 focus:placeholder-slate-500 rounded-full"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main FAQ List Section */}
      <div className="flex-grow section-padding-x py-16 max-w-7xl mx-auto w-full">
        {filteredFaqs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Accordion className="space-y-4" type="single" collapsible>
              {filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border border-gray-100 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-300 px-6 py-1"
                >
                  <AccordionItem value={`item-${index}`} className="border-none">
                    <AccordionTrigger className="font-semibold text-lg text-left text-gray-900 hover:text-custom-primary hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-gray-600 leading-relaxed pt-2 pb-5 border-t border-gray-50 mt-1">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 space-y-4 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm"
          >
            <div className="p-3 bg-red-50 text-red-500 rounded-full inline-block">
              <Search size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {selectedLanguage === "fr" ? "Aucun résultat trouvé" : "No results found"}
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              {selectedLanguage === "fr"
                ? `Nous n'avons trouvé aucune réponse pour "${searchQuery}". Essayez de taper d'autres mots-clés.`
                : `We couldn't find any results for "${searchQuery}". Please try again with different keywords.`}
            </p>
          </motion.div>
        )}
      </div>

      {/* Beautiful Bottom Support Section */}
      <div className="bg-white border-t border-gray-100 py-16">
        <div className="section-padding-x max-w-7xl mx-auto w-full">
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute top-0 right-0 w-64 h-64 bg-custom-primary/10 rounded-full filter blur-[60px] pointer-events-none" />
            <div className="space-y-3 relative z-10 text-center md:text-left">
              <div className="inline-flex p-3 bg-white/10 rounded-2xl text-custom-secondary mb-2">
                <MessageSquare size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                {selectedLanguage === "fr" ? "Vous avez toujours des questions ?" : "Still have questions?"}
              </h2>
              <p className="text-slate-300 max-w-md text-sm md:text-base font-light">
                {selectedLanguage === "fr"
                  ? "Si vous ne trouvez pas de réponse dans notre FAQ, vous pouvez contacter notre support client."
                  : "If you can't find the answers you need in our FAQ, please feel free to get in touch with our customer service."}
              </p>
            </div>
            <div className="relative z-10 shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-custom-primary to-custom-secondary hover:from-custom-primary/95 hover:to-custom-secondary/95 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                {selectedLanguage === "fr" ? "Contactez-nous" : "Contact Us"}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
