'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, User, Search, ChevronDown, Menu, X, Bitcoin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { CartDrawer } from '@/components/features/cart/cart-drawer'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useCart } from '@/context/cart-context'

// Product categories data
const productCategories = [
  {
    name: "Wellness",
    color: "green",
    path: "/health-and-wellness",
    products: [
      {
        name: "Tinctures",
        description: "Full spectrum CBD oils for daily balance",
        image: "/images/tincture2.png",
        path: "/wellness/tinctures"
      },
      {
        name: "Softgels",
        description: "Easy-to-take CBD capsules for consistent dosing",
        image: "/images/tincture2.png",
        path: "/wellness/softgels"
      },
      {
        name: "Capsules",
        description: "Specialized formulas for targeted wellness benefits",
        image: "/images/tincture2.png",
        path: "/wellness/capsules"
      }
    ]
  },
  {
    name: "Sport",
    color: "blue",
    path: "/sport-and-recovery",
    products: [
      {
        name: "Tinctures",
        description: "Performance-focused CBD oils for active lifestyles",
        image: "/images/tincture2.png",
        path: "/sport/tinctures"
      },
      {
        name: "Softgels",
        description: "Pre and post-workout supplements for recovery",
        image: "/images/tincture2.png",
        path: "/sport/softgels"
      },
      {
        name: "Bandages",
        description: "Targeted relief for muscles and joints",
        image: "/images/tincture2.png",
        path: "/sport/bandages"
      }
    ]
  },
  {
    name: "Beauty",
    color: "purple",
    path: "/beauty-and-cosmetics",
    products: [
      {
        name: "Tinctures",
        description: "Beauty-enhancing CBD formulas for skin health",
        image: "/images/tincture2.png",
        path: "/beauty/tinctures"
      },
      {
        name: "Serums",
        description: "Concentrated CBD treatments for targeted concerns",
        image: "/images/tincture2.png",
        path: "/beauty/serums"
      },
      {
        name: "Oils",
        description: "Nourishing oils for face and body",
        image: "/images/tincture2.png",
        path: "/beauty/oils"
      }
    ]
  },
  {
    name: "Hybrid",
    color: "brown",
    path: "/hybrid-and-mushrooms",
    products: [
      {
        name: "Tinctures",
        description: "CBD-mushroom blend formulas for cognitive support",
        image: "/images/tincture2.png",
        path: "/hybrid/tinctures"
      },
      {
        name: "Capsules",
        description: "Functional mushroom supplements with CBD",
        image: "/images/tincture2.png",
        path: "/hybrid/capsules"
      },
      {
        name: "Gummies",
        description: "Tasty CBD-mushroom edibles for daily wellness",
        image: "/images/tincture2.png",
        path: "/hybrid/gummies"
      }
    ]
  },
  {
    name: "Pet CBD",
    color: "amber",
    path: "/pet-cbd",
    products: [
      {
        name: "Dog Tinctures",
        description: "Calming CBD oil specially formulated for dogs",
        image: "/images/tincture2.png",
        path: "/pet-cbd/dog-tinctures"
      },
      {
        name: "Cat Drops",
        description: "Gentle CBD formulas for feline wellness",
        image: "/images/tincture2.png",
        path: "/pet-cbd/cat-drops"
      },
      {
        name: "Treats",
        description: "CBD-infused treats for joint support and anxiety relief",
        image: "/images/tincture2.png",
        path: "/pet-cbd/treats"
      }
    ]
  }
]

// Navigation links - removed Home and Shop
const navLinks = [
  { name: "Shop", path: "/shop", icon: ShoppingCart },
  { name: "About", path: "/about", icon: User },
  { name: "Blog", path: "/blog", icon: ArrowRight },
  { name: "Contact", path: "/contact", icon: ArrowRight },
  { name: "Lab", path: "/lab", icon: Bitcoin }
]

// Add category descriptions for the dropdowns
const categoryDescriptions = {
  "Wellness": "Discover premium CBD products designed to promote balance, relaxation, and overall wellbeing.",
  "Sport": "Enhance your active lifestyle with CBD formulations designed specifically for performance and recovery.",
  "Beauty": "Elevate your skincare routine with CBD-infused beauty products for radiant, healthy skin.",
  "Hybrid": "Experience the synergistic benefits of CBD combined with functional mushrooms and botanicals.",
  "Pet CBD": "Support your furry friend's wellness with specially formulated CBD products for pets."
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [logoIndex, setLogoIndex] = React.useState(3) // Start with logo 3 instead of 2
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState("");
  const { totalItems } = useCart();
  
  // Get current path for active state
  useEffect(() => {
    const path = window.location.pathname;
    const category = productCategories.find(cat => 
      path.includes(cat.path) || path === cat.path
    );
    
    if (category) {
      setActiveCategory(category.name);
    } else {
      setActiveCategory("");
    }
  }, []);
  
  // Detect scroll for header style changes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    // Use passive event listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Cycle through logos 3, 4, 5 (skipping 2)
  const cycleLogo = () => {
    setLogoIndex(prev => {
      if (prev >= 5) return 3
      return prev + 1
    })
  }
  
  // Button click handler for wallet connect
  const handleWalletConnect = () => {
    toast({
      title: 'Wallet Connection',
      description: 'Wallet connection feature coming soon.',
    });
    setIsMobileMenuOpen(false);
  };
  
  return (
    <motion.div 
      className={cn(
        "sticky top-0 z-[100] w-full border-b",
        isScrolled 
          ? "h-16 shadow-md bg-white/95 backdrop-blur-lg border-gray-200" 
          : "h-20 border-b-0 bg-gradient-to-r from-white via-white to-white/95 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-green-200 after:to-transparent"
      )}
      initial={false}
      animate={{
        height: isScrolled ? 64 : 80,
      }}
      transition={{
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      <div className="container mx-auto h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 group"
            onClick={cycleLogo}
          >
            <div className="relative h-14 w-14 overflow-hidden shadow-sm rounded-xl bg-gradient-to-br from-green-50 to-white border border-green-100 group-hover:shadow-md transition-all duration-300">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  ease: "linear",
                  duration: 20,
                  repeat: Infinity
                }}
              >
                <Image
                  src={`/images/${logoIndex}.png`}
                  alt="Twistly"
                  width={56}
                  height={56}
                  className="object-contain p-1 group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>
            </div>
            <span className="font-semibold text-gray-900 text-2xl hidden sm:inline-block tracking-tight group-hover:text-gray-800">
              Twistly<span className="text-green-600 font-bold">.</span>
            </span>
          </Link>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center justify-center flex-1 mx-6">
            <nav className="flex items-center space-x-5" aria-label="Main Navigation">
              {/* Product Category Dropdowns with hover trigger */}
              {productCategories.map((category, index) => (
                <motion.div 
                  key={category.path} 
                  className="group relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.3
                  }}
                >
                  <motion.button 
                    className={cn(
                      "px-4 py-2.5 text-[15px] font-medium tracking-tight rounded-md flex items-center gap-1.5 transition-all duration-200",
                      activeCategory === category.name ? "bg-gray-50" : "",
                      category.color === "green" && "text-green-700 hover:text-green-900 group-hover:bg-green-50/80",
                      category.color === "blue" && "text-blue-700 hover:text-blue-900 group-hover:bg-blue-50/80",
                      category.color === "purple" && "text-purple-700 hover:text-purple-900 group-hover:bg-purple-50/80",
                      category.color === "brown" && "text-amber-900 hover:text-amber-950 group-hover:bg-amber-100/80",
                      category.color === "amber" && "text-amber-700 hover:text-amber-800 group-hover:bg-amber-50/80",
                      activeCategory === category.name && category.color === "green" && "bg-green-50",
                      activeCategory === category.name && category.color === "blue" && "bg-blue-50",
                      activeCategory === category.name && category.color === "purple" && "bg-purple-50",
                      activeCategory === category.name && category.color === "brown" && "bg-amber-100",
                      activeCategory === category.name && category.color === "amber" && "bg-amber-50"
                    )}
                    style={{ letterSpacing: '-0.01em' }}
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    {category.name} 
                    <motion.div
                      animate={{ rotate: 180 }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                      }}
                      className="group-hover:rotate-180 transition-transform duration-300"
                    >
                      <ChevronDown className="h-3.5 w-3.5 opacity-70 ml-0.5" />
                    </motion.div>
                    {activeCategory === category.name && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-current"></span>
                    )}
                  </motion.button>
                  <motion.div 
                    className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible w-[420px] z-20 transition-all duration-150 ease-out transform translate-y-1 group-hover:translate-y-0"
                    initial={false}
                    transition={{ 
                      duration: 0.2,
                      ease: "easeOut"
                    }}
                  >
                    <div className={cn(
                      "rounded-lg border shadow-lg bg-white p-6",
                      category.color === "green" && "border-green-100",
                      category.color === "blue" && "border-blue-100",
                      category.color === "purple" && "border-purple-100",
                      category.color === "brown" && "border-amber-200",
                      category.color === "amber" && "border-amber-100"
                    )}>
                      {/* Category description */}
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 leading-relaxed">{categoryDescriptions[category.name]}</p>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-5">
                        {category.products.map((product) => (
                          <Link key={product.path} href={product.path} className="group">
                            <div className="space-y-2">
                              <div className={cn(
                                "relative w-full pt-[100%] rounded-lg overflow-hidden border bg-gray-50/50 transition-all duration-200",
                                category.color === "green" && "group-hover:border-green-300 border-green-100 bg-green-50/50",
                                category.color === "blue" && "group-hover:border-blue-300 border-blue-100 bg-blue-50/50",
                                category.color === "purple" && "group-hover:border-purple-300 border-purple-100 bg-purple-50/50",
                                category.color === "brown" && "group-hover:border-amber-400 border-amber-200 bg-amber-50/50",
                                category.color === "amber" && "group-hover:border-amber-300 border-amber-100 bg-amber-50/50"
                              )}>
                                <Image
                                  src="/images/tincture2.png"
                                  alt={product.name}
                                  fill
                                  className="object-contain p-2 transition-all duration-300 ease-in-out group-hover:scale-110"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                              </div>
                              <div className="space-y-1">
                                <h4 className={cn(
                                  "text-sm font-semibold tracking-tight group-hover:underline",
                                  category.color === "green" && "group-hover:text-green-700",
                                  category.color === "blue" && "group-hover:text-blue-700",
                                  category.color === "purple" && "group-hover:text-purple-700",
                                  category.color === "brown" && "group-hover:text-amber-900",
                                  category.color === "amber" && "group-hover:text-amber-700"
                                )}>
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-2 font-light">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="h-px bg-gray-200 my-4"></div>
                      <div className="flex justify-center">
                        <Button 
                          asChild
                          variant="ghost" 
                          className={cn(
                            "gap-1.5 font-medium text-white rounded-full shadow-sm px-5",
                            category.color === "green" && "bg-green-600 hover:bg-green-700",
                            category.color === "blue" && "bg-blue-600 hover:bg-blue-700",
                            category.color === "purple" && "bg-purple-600 hover:bg-purple-700",
                            category.color === "brown" && "bg-amber-800 hover:bg-amber-900",
                            category.color === "amber" && "bg-amber-600 hover:bg-amber-700"
                          )}
                          size="default"
                        >
                          <Link href={category.path} className="flex items-center">
                            Explore {category.name}
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
              
              {/* Info Dropdown */}
              <motion.div 
                className="group relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: productCategories.length * 0.1,
                  duration: 0.3
                }}
              >
                <motion.button 
                  className="px-4 py-2.5 text-[15px] font-medium tracking-tight rounded-md flex items-center gap-1.5 text-gray-800 hover:text-gray-900 group-hover:bg-green-50/50 transition-all duration-200"
                  style={{ letterSpacing: '-0.01em' }}
                  aria-expanded="false"
                  aria-haspopup="true"
                  whileHover={{ y: -1 }}
                  whileTap={{ y: 1 }}
                >
                  Info 
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 0] }}
                    whileHover={{ rotate: [0, 180] }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="h-3.5 w-3.5 opacity-70 ml-0.5" />
                  </motion.div>
                </motion.button>
                <motion.div 
                  className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible w-[220px] z-20 transition-all duration-150 ease-out transform translate-y-1 group-hover:translate-y-0"
                  initial={false}
                  transition={{ 
                    duration: 0.2,
                    ease: "easeOut"
                  }}
                >
                  <div className="rounded-lg border border-green-100 shadow-lg bg-white p-3">
                    <div className="flex flex-col space-y-1">
                      {navLinks.slice(1).map((link, index) => (
                        <motion.div
                          key={link.path}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05, duration: 0.15 }}
                        >
                          <Link 
                            href={link.path}
                            className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 hover:bg-green-50/70 rounded-md flex items-center gap-2 transition-all duration-150"
                          >
                            <motion.div
                              whileHover={{ rotate: 15 }}
                              transition={{ duration: 0.2 }}
                            >
                              <link.icon className="h-4 w-4 text-gray-500" />
                            </motion.div>
                            {link.name}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Search Button - Now next to Info */}
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative rounded-full h-10 w-10"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                >
                  <Search className="h-[18px] w-[18px]" />
                </Button>
              </motion.div>
            </nav>
          </div>
          
          {/* Desktop Right Side Actions - Rearranged */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart with notification badge - simplified */}
            <div className="relative">
              <CartDrawer>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative rounded-full h-10 w-10"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-[18px] w-[18px]" />
                </Button>
              </CartDrawer>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-medium text-white z-10">
                  {totalItems}
                </span>
              )}
            </div>
            
            {/* User Menu - simplified */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative rounded-full h-10 w-10"
                  aria-label="User account"
                >
                  <User className="h-[18px] w-[18px]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-lg p-1 border border-gray-200">
                <DropdownMenuItem asChild className="rounded-md">
                  <Link href="/account" className="font-medium text-sm">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-md">
                  <Link href="/orders" className="font-medium text-sm">Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-md">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="font-medium text-sm flex items-center justify-center gap-2 rounded-full w-full"
                    onClick={handleWalletConnect}
                  >
                    <motion.div
                      animate={{ 
                        rotate: 360,
                      }}
                      transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      <Bitcoin className="h-4 w-4" />
                    </motion.div>
                    Connect Wallet
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-md">
                  <Link href="/signin" className="font-medium text-sm">Sign In</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Shop Button (Right Side) - simplified animation */}
            <Button 
              asChild 
              variant="default" 
              className="bg-green-600 hover:bg-green-700 text-white rounded-full h-11 px-6 text-[15px] font-medium"
            >
              <Link href="/shop" className="flex items-center gap-2">
                <motion.div 
                  className="relative w-6 h-6"
                  animate={{ rotate: 360 }}
                  transition={{
                    ease: "linear",
                    duration: 10,
                    repeat: Infinity
                  }}
                >
                  <Image 
                    src="/images/2.png"
                    alt="Twistly Icon" 
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </motion.div>
                <Separator orientation="vertical" className="h-5 bg-white/30" />
                Shop
              </Link>
            </Button>
          </div>
          
          {/* Mobile Menu and Cart */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Search Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative rounded-full h-10 w-10"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <Search className="h-[18px] w-[18px]" />
            </Button>
            
            {/* Mobile Cart with badge */}
            <div className="relative">
              <CartDrawer>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 relative rounded-full h-10 w-10"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-[18px] w-[18px]" />
                </Button>
              </CartDrawer>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-medium text-white z-10">
                  {totalItems}
                </span>
              )}
            </div>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Menu" 
                  className="relative text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full h-10 w-10"
                >
                  <Menu className="h-[18px] w-[18px]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0">
                <div className="flex flex-col h-full">
                  <SheetHeader className="p-4 border-b">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-left font-semibold tracking-tight">Menu</SheetTitle>
                      <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                          <X className="h-4 w-4" />
                          <span className="sr-only">Close menu</span>
                        </Button>
                      </SheetClose>
                    </div>
                  </SheetHeader>
                  
                  <div className="flex-1 overflow-auto py-2">
                    {/* Mobile Navigation Links */}
                    <div className="flex flex-col space-y-1 mt-4 px-4">
                      <Link 
                        href="/shop" 
                        className="flex items-center justify-between p-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center">
                          <ShoppingCart className="h-5 w-5 mr-3 text-gray-500" />
                          Shop
                        </div>
                      </Link>
                      
                      {/* Category links */}
                      {productCategories.map(category => (
                        <Link 
                          key={category.name} 
                          href={category.path}
                          className={cn(
                            "flex items-center justify-between p-3 text-base font-medium hover:bg-gray-50 rounded-md transition-colors",
                            category.color === "green" && "text-green-700",
                            category.color === "blue" && "text-blue-700",
                            category.color === "purple" && "text-purple-700",
                            category.color === "brown" && "text-amber-900",
                            category.color === "amber" && "text-amber-700"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.name}
                          <ChevronDown className="h-4 w-4 opacity-70" />
                        </Link>
                      ))}
                      
                      {/* Other links */}
                      {navLinks.slice(1).map(link => (
                        <Link 
                          key={link.name} 
                          href={link.path}
                          className="flex items-center p-3 text-base font-medium text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <link.icon className="h-5 w-5 mr-3 text-gray-500" />
                          {link.name}
                        </Link>
                      ))}
                    </div>
                    
                    {/* Mobile menu actions */}
                    <div className="grid grid-cols-2 gap-3 border-t pt-5 mt-6 px-4">
                      <SheetClose asChild>
                        <Button 
                          variant="outline" 
                          className="w-full gap-1 text-sm rounded-full"
                          onClick={() => {
                            setIsMobileMenuOpen(false)
                            setIsSearchOpen(true)
                          }}
                        >
                          <Search className="h-4 w-4" />
                          Search
                        </Button>
                      </SheetClose>
                      
                      <SheetClose asChild>
                        <Link href="/checkout" passHref>
                          <Button 
                            variant="default" 
                            className="w-full gap-1 text-sm bg-green-600 hover:bg-green-700 rounded-full"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Cart {totalItems > 0 && `(${totalItems})`}
                          </Button>
                        </Link>
                      </SheetClose>
                    </div>
                  </div>
                  
                  {/* Mobile Account Links - simplified */}
                  <div className="border-t p-4">
                    <div className="flex flex-col space-y-2">
                      <Button 
                        asChild 
                        variant="outline" 
                        size="lg" 
                        className="font-medium text-sm rounded-full w-full"
                      >
                        <Link href="/account" className="flex items-center justify-center">
                          My Account
                        </Link>
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="font-medium text-sm flex items-center justify-center gap-2 rounded-full w-full"
                        onClick={handleWalletConnect}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ 
                            duration: 10,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                        >
                          <Bitcoin className="h-4 w-4" />
                        </motion.div>
                        Connect Wallet
                      </Button>
                      <Button asChild size="lg" className="font-medium text-sm bg-green-600 hover:bg-green-700 rounded-full w-full">
                        <Link href="/signin">Sign In</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      
      {/* Search Overlay */}
      <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <SheetContent side="top" className="h-auto max-h-[350px]">
          <div className="flex flex-col space-y-4 pt-8 pb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
              <Input 
                placeholder="Search products..." 
                className="pl-10 h-12 text-base rounded-full border-gray-200 focus-visible:ring-green-600 focus-visible:border-green-200 shadow-sm"
                autoFocus
              />
            </div>
            <div className="space-y-3">
              <div className="text-xs uppercase font-semibold tracking-wide text-gray-500 px-2">Popular Searches</div>
              <div className="flex flex-wrap gap-2">
                {["CBD Oil", "Softgels", "Sleep Aid", "Pain Relief", "Mushroom Extract", "Pet CBD", "Gummies"].map((term) => (
                  <Button 
                    key={term}
                    variant="outline" 
                    size="sm" 
                    onClick={() => setIsSearchOpen(false)}
                    className="text-xs h-9 font-medium px-3 rounded-full border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:scale-105 transition-transform"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  )
} 