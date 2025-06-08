"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Camera, Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-white/10 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Camera className="w-6 h-6 text-cyan-500" />
              <span className="text-white font-medium text-lg">BestPhoto AI</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered photo selection and organization tool that helps you find your best photos and save storage
              space.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Facebook size={18} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Instagram size={18} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/download" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-medium mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter for tips, updates, and early access to new features.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-black/30 border-white/20 text-white placeholder:text-gray-500"
              />
              <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">Subscribe</Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">© {currentYear} BestPhoto AI. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
