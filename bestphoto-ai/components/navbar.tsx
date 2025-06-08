"use client"

import { Button } from "@/components/ui/button"
import { Camera, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { User, onAuthStateChanged } from "firebase/auth"
import { auth } from "@/lib/firebase" // Firebase auth import
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import LogoutButton from "@/components/auth/LogoutButton"

type NavLinkItem = { label: string; href: string }

type NavbarProps = {
  navLinks?: { label: string; href: string }[]; // Link öğeleri
  authButtons?: React.ReactNode; // Özel butonlar için alan
  showAuthButtons?: boolean; // Butonların gösterilip gösterilmeyeceği
  logoHref?: string; // Logo tıklandığında yönlendirilecek sayfa
  signInHref?: string; // Sign-in yönlendirmesi
  getStartedHref?: string; // Get Started yönlendirmesi
  onSignInClick?: () => void; // Sign-in tıklama işlevi
  onGetStartedClick?: () => void; // Get Started tıklama işlevi
}

export default function Navbar({
  navLinks = [
    { label: "Features", href: "/features" },
    { label: "How it Works", href: "/how-it-works" },
    { label: "Examples", href: "/examples" },
    { label: "Pricing", href: "/pricing" },
    { label: "Download", href: "/download" },
  ],
  authButtons,
  showAuthButtons = true,
  logoHref = "/",
  signInHref = "/[auth]/signin",
  getStartedHref = "/download",
  onSignInClick,
  onGetStartedClick,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
    return () => unsubscribe()
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10">
        <Link href={logoHref} className="flex items-center space-x-2">
          <Camera className="w-8 h-8 text-cyan-500" />
          <span className="text-white font-medium text-xl">BestPhoto AI</span>
        </Link>


        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(({ label, href }) => (
            <NavLink key={href} href={href} isActive={pathname === href}>
              {label}
            </NavLink>
          ))}
        </div>

        {currentUser && currentUser.emailVerified ? (
          <div className="hidden md:flex items-center space-x-4 pr-20">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:text-cyan-400 border border-white rounded-full px-2 py-2 min-w-[50px] text-center flex items-center justify-center"
                >
                  {currentUser.photoURL ? (
                    <img src={currentUser.photoURL} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="text-sm">{currentUser.displayName || currentUser.email?.charAt(0)?.toUpperCase()}</span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gray-800 text-white border border-gray-700">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-gray-300">{currentUser.email}</DropdownMenuItem>
                {currentUser.displayName && (
                  <DropdownMenuItem className="text-gray-300">
                    {currentUser.displayName}
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          showAuthButtons && (
            <div className="hidden md:flex items-center space-x-4 pr-20">
              {authButtons ? (
                authButtons
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-cyan-400 border border-white rounded-tl-xl rounded-br-xl px-4 py-2 min-w-[120px] text-center"
                    asChild
                  >
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button
                    className="bg-cyan-600 hover:bg-cyan-700 text-white border border-cyan-400 rounded-tl-xl rounded-br-xl px-4 py-2 min-w-[120px] text-center"
                    asChild
                  >
                    <Link href="/auth/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          )
        )}

        <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={toggleMenu}>
          <Menu className="w-6 h-6" />
        </Button>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={toggleMenu} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-3/4 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-6 shadow-xl"
            >
              <div className="flex justify-end mb-8">
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X className="w-6 h-6 text-white" />
                </Button>
              </div>

              <div className="flex flex-col items-center text-center space-y-6">
                {navLinks.map(({ label, href }) => (
                  <MobileNavLink key={href} href={href} onClick={toggleMenu} isActive={pathname === href}>
                    {label}
                  </MobileNavLink>
                ))}
              </div>

              {currentUser && currentUser.emailVerified ? (
                <div className="mt-8 flex flex-col space-y-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="text-white hover:text-cyan-400 justify-center border border-white rounded-full px-2 py-2 min-w-[50px] text-center flex items-center"
                      >
                        {currentUser.photoURL ? (
                          <img src={currentUser.photoURL} alt="Profile" className="h-8 w-8 rounded-full object-cover" />
                        ) : (
                          <span className="text-sm">{currentUser.displayName || currentUser.email?.charAt(0)?.toUpperCase()}</span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-gray-800 text-white border border-gray-700">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-gray-300">
                        {currentUser.email}
                      </DropdownMenuItem>
                      {currentUser.displayName && (
                        <DropdownMenuItem className="text-gray-300">
                          {currentUser.displayName}
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <LogoutButton />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                showAuthButtons && (
                  <div className="mt-8 flex flex-col space-y-4">
                    <Button
                      variant="ghost"
                      className="text-white hover:text-cyan-400 justify-center border border-white rounded-tl-xl rounded-br-xl px-4 py-2 min-w-[120px] text-center"
                      asChild
                    >
                      <Link href="/auth/signin">Sign In</Link>
                    </Button>
                    <Button
                      className="bg-cyan-600 hover:bg-cyan-700 text-white justify-center border border-cyan-400 rounded-tl-xl rounded-br-xl px-4 py-2 min-w-[120px] text-center"
                      asChild
                    >
                      <Link href="/auth/signup">Sign Up</Link>
                    </Button>
                  </div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children, isActive }: { href: string; children: React.ReactNode; isActive?: boolean }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span
        className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all ${
          isActive ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  )
}

function MobileNavLink({
  href,
  children,
  onClick,
  isActive,
}: { href: string; children: React.ReactNode; onClick: () => void; isActive?: boolean }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-xl font-medium ${isActive ? "text-cyan-400" : "text-white"} hover:text-cyan-400 transition-colors`}
    >
      {children}
    </Link>
  )
}
