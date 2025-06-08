"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "How do credits work?",
    answer:
      "Each photo processing uses 1 credit. Free users start with 5 credits. Pro users get 50 credits per month for $20. Pro Plus users get 500 credits per month for $200. Credits for paid plans renew monthly.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "Free users will need to upgrade to a paid plan to get more credits. Pro and Pro Plus users will have their credits renewed at the start of each billing cycle. You can also purchase additional credits if needed.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the change takes effect immediately. If you downgrade, the change will take effect at the end of your current billing cycle.",
  },
  {
    question: "Is there a limit to how many photos I can upload in a single batch?",
    answer:
      "Free users can upload up to 5 photos per batch. Pro users can upload up to 20 photos per batch. Pro Plus users can upload up to 100 photos per batch. This helps ensure optimal performance for all users.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through our payment processor, and we never store your payment information on our servers.",
  },
  {
    question: "What's the difference between the AI selection in different plans?",
    answer:
      "The Free plan uses our basic AI model that analyzes fundamental aspects like focus and exposure. The Pro plan adds composition analysis and facial expression detection. The Pro Plus plan uses our most advanced AI model with additional features like aesthetic scoring and professional-grade technical analysis.",
  },
]

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 px-4 bg-black/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our pricing plans and features.
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
