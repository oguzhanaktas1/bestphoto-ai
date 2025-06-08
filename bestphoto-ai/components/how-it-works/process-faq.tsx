"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How accurate is the AI at selecting the best photos?",
    answer:
      "Our AI has been trained on millions of professional photos and can identify quality factors with over 95% accuracy. It analyzes multiple aspects including focus, exposure, composition, facial expressions, and more to select truly superior images.",
  },
  {
    question: "How many photos can I process at once?",
    answer:
      "The free plan allows processing up to 100 photos per month. Premium plans offer higher limits, with our Professional plan allowing unlimited photo processing. The system can handle batches of up to 500 photos at once for optimal performance.",
  },
  {
    question: "What photo formats are supported?",
    answer:
      "BestPhoto AI supports all common image formats including JPG, PNG, HEIC, WEBP, and most RAW formats from major camera manufacturers. This ensures compatibility with photos from smartphones, DSLRs, and mirrorless cameras.",
  },
  {
    question: "Is my data secure and private?",
    answer:
      "Yes, we take data security very seriously. Your photos are processed in a secure environment and are never shared with third parties. We use encryption for all data transfers and storage. You can also opt to have your photos automatically deleted after processing.",
  },
  {
    question: "Can I customize the selection criteria?",
    answer:
      "Yes, premium users can adjust the importance of different quality factors to match their preferences. For example, you can prioritize facial expressions over technical perfection if you're selecting family photos.",
  },
  {
    question: "How does the storage optimization work?",
    answer:
      "After selecting your best photos, you can choose to automatically delete or archive the similar duplicates. This can save up to 80% of your storage space while ensuring you keep only the highest quality images.",
  },
]

export function ProcessFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about how BestPhoto AI works and what it can do for you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left bg-black/30 backdrop-blur-sm p-5 rounded-lg border border-white/10 flex justify-between items-center"
              >
                <h3 className="text-white font-medium text-lg">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                )}
              </button>

              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-black/20 backdrop-blur-sm p-5 rounded-b-lg border-x border-b border-white/10 text-gray-300"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
