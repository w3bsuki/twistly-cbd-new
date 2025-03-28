'use client'

import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Star, Dumbbell, Activity, Clock, Medal, Check, Sparkles, ShoppingCart, Heart, Info, Users, CheckCircle, XCircle, X, Beaker, Bot } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Updated with local image paths and more product details
const sportProducts = [
  {
    name: "Recovery Blend CBD Oil",
    strength: "2000mg CBD",
    image: "/images/tincture2.png",
    price: "$69.99",
    rating: 4.9,
    reviews: 142,
    description: "Fast-acting formula designed for post-workout recovery",
    benefits: ["Accelerated recovery", "Reduces inflammation", "Muscle relief"],
    badgeColor: "bg-blue-600",
    featured: true
  },
  {
    name: "Muscle Relief CBD Oil",
    strength: "1500mg CBD",
    image: "/images/tincture2.png",
    price: "$59.99",
    rating: 4.8,
    reviews: 118,
    description: "Targeted relief for sore muscles and joint discomfort",
    benefits: ["Deep tissue relief", "Joint support", "Anti-inflammatory"],
    badgeColor: "bg-blue-700",
    featured: true
  },
  {
    name: "Performance CBD Oil",
    strength: "1000mg CBD",
    image: "/images/tincture2.png",
    price: "$49.99",
    rating: 4.7,
    reviews: 96,
    description: "Balanced formula to support athletic performance and focus",
    benefits: ["Improved focus", "Endurance boost", "Stress relief"],
    badgeColor: "bg-blue-600",
    featured: true
  },
  {
    name: "Joint Support CBD Oil",
    strength: "750mg CBD",
    image: "/images/tincture2.png",
    price: "$44.99",
    rating: 4.6,
    reviews: 87,
    description: "Enhanced with glucosamine for optimal joint health",
    benefits: ["Cartilage support", "Mobility improvement", "Pain relief"],
    badgeColor: "bg-blue-500",
    featured: false
  },
  {
    name: "Pre-Workout CBD Oil",
    strength: "500mg CBD",
    image: "/images/tincture2.png",
    price: "$39.99",
    rating: 4.5,
    reviews: 74,
    description: "Energizing blend to prepare your body for intense workouts",
    benefits: ["Energy boost", "Mental clarity", "Improved focus"],
    badgeColor: "bg-blue-600",
    featured: false
  }
]

// Sport benefits data
const sportBenefits = [
  {
    title: "Enhanced Recovery",
    description: "Our CBD formulations help reduce recovery time between workouts by supporting muscle repair and reducing inflammation.",
    icon: <Dumbbell className="h-6 w-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-100"
  },
  {
    title: "Improved Performance",
    description: "CBD may help enhance focus and endurance during workouts while reducing exercise-induced anxiety and stress.",
    icon: <Activity className="h-6 w-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-100"
  },
  {
    title: "Better Sleep & Recovery",
    description: "Quality sleep is crucial for recovery and performance. Our CBD formulas help improve sleep quality for maximum results.",
    icon: <Clock className="h-6 w-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-100"
  },
  {
    title: "Joint & Muscle Support",
    description: "Our targeted formulas provide relief to sore muscles and joints while supporting long-term mobility and flexibility.",
    icon: <Medal className="h-6 w-6 text-blue-600" />,
    color: "bg-blue-50 border-blue-100"
  }
]

// Testimonials
const testimonials = [
  {
    quote: "The Recovery Blend has been a game-changer for my marathon training. I'm recovering faster between long runs and feeling less soreness.",
    author: "Michael T.",
    role: "Marathon Runner",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "As a personal trainer, I recommend the Muscle Relief oil to all my clients. It's made a huge difference in their recovery and performance.",
    author: "Jessica R.",
    role: "Personal Trainer",
    image: "/images/tincture2.png",
    rating: 5
  },
  {
    quote: "I've tried many products for my joint pain from years of weightlifting. The Joint Support CBD oil is the only one that consistently works.",
    author: "David K.",
    role: "Competitive Weightlifter",
    image: "/images/tincture2.png",
    rating: 4
  },
]

export function Sport() {
  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <Badge className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-1 rounded-full text-sm mb-3">
              Sport & Recovery
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-600 to-blue-700 mb-3">
              Performance & Recovery CBD
            </h2>
            <p className="text-blue-700 text-base max-w-2xl text-center">
              Our sport collection is specially formulated to support athletic performance, enhance recovery, and provide targeted relief for active lifestyles.
            </p>
          </motion.div>
        </div>

        {/* Sport Benefits Section - More compact */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {sportBenefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={cn("border h-full transition-all hover:shadow-md", benefit.color)}>
                <CardContent className="pt-4 p-4">
                  <div className="rounded-full w-10 h-10 flex items-center justify-center bg-white border border-gray-100 shadow-sm mb-3">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1.5">{benefit.title}</h3>
                  <p className="text-gray-600 text-xs line-clamp-3">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Featured Products Heading */}
        <div className="flex flex-col items-center justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800">Featured Sport Products</h3>
            <p className="text-blue-600 mt-1">Discover our most popular performance formulas</p>
          </motion.div>
          
          <Link href="/sport-and-recovery" className="text-blue-700 hover:text-blue-800 font-medium text-sm flex items-center gap-1 mt-2">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Products Grid - More compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {sportProducts.filter(p => p.featured).map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative">
                    <AspectRatio ratio={1/1} className="bg-gradient-to-b from-blue-50 to-white">
                      <div className="relative h-full w-full p-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1 scale-75 transition-transform duration-300 group-hover:scale-[0.85]"
                        />
                      </div>
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className={cn("text-white text-xs px-2 py-0.5", product.badgeColor)}>
                          {product.strength}
                        </Badge>
                      </div>
                    </AspectRatio>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">{product.name}</h3>
                      <p className="font-bold text-sm text-blue-700">{product.price}</p>
                    </div>
                    
                    <div className="flex items-center mb-1.5">
                      <div className="flex mr-1.5">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${i < Math.floor(product.rating) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-200 fill-gray-200"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">({product.reviews})</span>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.benefits.map((benefit, i) => (
                        <span key={i} className="bg-blue-50 text-[10px] text-blue-700 px-1.5 py-0.5 rounded-full flex items-center">
                          <Check className="h-2 w-2 mr-0.5" /> {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex gap-1">
                  <Button size="sm" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 h-7 rounded-lg transition-colors flex-1">
                    <ShoppingCart className="h-3 w-3 mr-1" /> Add to Cart
                  </Button>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-10 flex items-center justify-center text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-colors"
                      >
                        <Info className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-blue-700 flex items-center gap-1.5">
                          <Activity className="h-5 w-5" />
                          {product.name} Benefits
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="flex items-center mb-3">
                          <Badge className={cn("mr-2", product.badgeColor)}>
                            {product.strength}
                          </Badge>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) 
                                  ? "text-yellow-400 fill-yellow-400" 
                                  : "text-gray-200 fill-gray-200"}`} 
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-1.5">({product.reviews} reviews)</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-4">{product.description}</p>
                        
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <Sparkles className="h-4 w-4 mr-1.5" /> Key Benefits
                        </h4>
                        
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <ul className="space-y-3">
                            {product.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <div className="bg-white rounded-full p-1 mt-0.5">
                                  <Check className="h-3.5 w-3.5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-800">{benefit}</p>
                                  <p className="text-xs text-gray-600">
                                    {getSportBenefitDescription(benefit)}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <Users className="h-4 w-4 mr-1.5" /> Ideal For
                        </h4>
                        <p className="text-sm text-gray-700 mb-4">
                          {getSportIdealUsers(product.name)}
                        </p>
                        
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1.5" /> Recommended Usage
                        </h4>
                        <p className="text-sm text-gray-700">
                          {getSportUsageInstructions(product.name)}
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-10 flex items-center justify-center text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-colors"
                      >
                        <Users className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-blue-700 flex items-center gap-1.5">
                          <Users className="h-5 w-5" />
                          Who is {product.name} for?
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="bg-blue-50 p-4 rounded-lg mb-4">
                          <p className="text-sm text-gray-700">
                            {getSportIdealUsers(product.name)}
                          </p>
                        </div>
                        
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <CheckCircle className="h-4 w-4 mr-1.5" /> Recommended For
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {getSportRecommendedGroups(product.name).map((group, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-3.5 w-3.5 text-blue-600 mt-0.5" />
                              <span className="text-sm text-gray-700">{group}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <XCircle className="h-4 w-4 mr-1.5" /> Not Recommended For
                        </h4>
                        <ul className="space-y-2">
                          {getSportNotRecommendedGroups().map((group, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <X className="h-3.5 w-3.5 text-blue-500 mt-0.5" />
                              <span className="text-sm text-gray-700">{group}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-10 flex items-center justify-center text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-colors"
                      >
                        <Beaker className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="text-blue-700 flex items-center gap-1.5">
                          <Beaker className="h-5 w-5" />
                          {product.name} Dosage Guide
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <div className="flex items-center mb-3">
                          <Badge className={cn("mr-2", product.badgeColor)}>
                            {product.strength}
                          </Badge>
                          <p className="text-xs text-gray-600">Total CBD: {product.strength}</p>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-4">
                          This sport-focused {product.name} contains {product.strength} of high-quality CBD. Athletic dosage needs may differ based on training intensity and recovery goals.
                        </p>
                        
                        <h4 className="font-medium text-blue-700 mb-2 flex items-center">
                          <Info className="h-4 w-4 mr-1.5" /> Athletic Dosage Guidelines
                        </h4>
                        <p className="text-sm text-gray-700 mb-4">
                          For athletes and active individuals, CBD dosage may need to be adjusted based on training intensity, body weight, and recovery needs. We recommend a personalized approach.
                        </p>
                        
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                          <h5 className="font-medium text-blue-700 mb-2">Recommended Doses for Athletes:</h5>
                          <ul className="space-y-3">
                            <li className="grid grid-cols-2 gap-2">
                              <div className="flex items-start gap-1.5">
                                <Badge variant="outline" className="h-5 border-blue-200 text-blue-700">Light Training</Badge>
                              </div>
                              <p className="text-xs text-gray-700">
                                10-15mg CBD daily<br />
                                <span className="text-gray-500">For light workouts, general recovery</span>
                              </p>
                            </li>
                            <li className="grid grid-cols-2 gap-2">
                              <div className="flex items-start gap-1.5">
                                <Badge variant="outline" className="h-5 border-blue-200 text-blue-700">Moderate Training</Badge>
                              </div>
                              <p className="text-xs text-gray-700">
                                20-40mg CBD daily<br />
                                <span className="text-gray-500">For regular training, muscle recovery</span>
                              </p>
                            </li>
                            <li className="grid grid-cols-2 gap-2">
                              <div className="flex items-start gap-1.5">
                                <Badge variant="outline" className="h-5 border-blue-200 text-blue-700">Intense Training</Badge>
                              </div>
                              <p className="text-xs text-gray-700">
                                50-80mg CBD daily<br />
                                <span className="text-gray-500">For high-intensity training, competition prep</span>
                              </p>
                            </li>
                            <li className="grid grid-cols-2 gap-2">
                              <div className="flex items-start gap-1.5">
                                <Badge variant="outline" className="h-5 border-blue-200 text-blue-700">Recovery Focus</Badge>
                              </div>
                              <p className="text-xs text-gray-700">
                                60-100mg+ CBD daily<br />
                                <span className="text-gray-500">For injury recovery, significant soreness</span>
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button 
                    size="sm"
                    variant="ghost"
                    className="h-8 w-10 flex items-center justify-center text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Compact Infinite Slider */}
        <InfiniteSlider gap={12} className="w-full py-4 mb-6">
          {sportProducts.map((product, index) => (
            <motion.div 
              key={`slider-${index}`} 
              className="relative group w-[180px]"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <AspectRatio ratio={1} className="bg-white rounded-xl border border-blue-100">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-4 scale-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-blue-800/20 to-transparent rounded-xl opacity-80 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-2 text-left">
                  <p className="text-white text-xs font-medium leading-tight">{product.name}</p>
                  <Badge variant="outline" className="mt-1 text-[8px] bg-white/10 text-white border-white/20">
                    {product.strength}
                  </Badge>
                </div>
              </AspectRatio>
            </motion.div>
          ))}
        </InfiniteSlider>

        {/* Testimonials Section - More compact */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800 text-center">Athlete Testimonials</h3>
            <p className="text-blue-600 mt-1 text-center">Real stories from athletes who have improved their performance</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-3 w-3", 
                            i < testimonial.rating 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-200 fill-gray-200"
                          )} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm italic mb-4 line-clamp-4">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-2">
                      <div className="relative w-8 h-8 rounded-full bg-blue-100 overflow-hidden">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-semibold text-xs text-gray-900">{testimonial.author}</p>
                        <p className="text-[10px] text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quality Banner - More compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-12 text-white"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Performance-Grade Quality
              </h3>
              <p className="text-blue-100 text-sm mb-3">
                Our sport CBD formulations are designed specifically for athletes and active individuals. Each batch is tested for banned substances and verified by third-party labs.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-xs">Athlete-Approved</Badge>
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-xs">Lab Tested</Badge>
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-xs">No Banned Substances</Badge>
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white text-xs">Fast-Acting</Badge>
              </div>
            </div>
            <Button asChild size="sm" className="bg-white text-blue-700 hover:bg-blue-50 px-4 py-2">
              <Link href="/lab-results">
                View Lab Tests <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Explore Button */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex gap-3"
          >
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 transition-colors">
              <Link href="/sport-and-recovery" className="flex items-center gap-2">
                <Image src="/images/2.png" width={24} height={24} alt="Twistly" className="h-5 w-5" />
                <Separator orientation="vertical" className="h-4 bg-blue-50/20" />
                Explore Sport & Recovery
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-700 hover:bg-blue-50 rounded-full px-6 transition-colors"
            >
              <Link href="#cbd-doctor" className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Ask AI
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Helper functions for product benefits dialog
function getSportBenefitDescription(benefit: string): string {
  const benefitDescriptions: {[key: string]: string} = {
    "Reduces inflammation": "Helps minimize exercise-induced inflammation for faster recovery between workouts.",
    "Eases muscle soreness": "Interacts with CB2 receptors in muscle tissue to reduce post-workout discomfort.",
    "Speeds recovery": "Supports cellular repair processes to help you bounce back faster after intense training.",
    "Improves sleep": "Enhances sleep quality, which is essential for muscle recovery and performance gains.",
    "Joint support": "Helps maintain joint health and comfort during high-impact activities.",
    "Stress reduction": "Lowers cortisol levels which can interfere with recovery and muscle growth.",
    "Increases endurance": "May help improve stamina by supporting cardiovascular function and oxygen utilization.",
    "Enhanced focus": "Improves mind-muscle connection and training intensity without stimulants.",
    "All natural": "No banned substances or synthetic ingredients - safe for competitive athletes.",
    "Fast-acting": "Rapid absorption formula designed to work quickly when you need it most.",
    "Long-lasting": "Extended release technology provides benefits throughout your training session or recovery period.",
    "Non-psychoactive": "All the performance benefits without the high - THC-free formula."
  };
  
  return benefitDescriptions[benefit] || "Supports athletic performance and physical wellbeing.";
}

function getSportIdealUsers(productName: string): string {
  if (productName.includes("Recovery")) {
    return "Athletes engaged in high-intensity training, individuals experiencing post-workout soreness, and anyone looking to optimize their recovery between sessions.";
  } else if (productName.includes("Relief") || productName.includes("Pain")) {
    return "Active individuals dealing with exercise-induced discomfort, athletes with joint stress, and those needing targeted relief for specific areas.";
  } else if (productName.includes("Performance")) {
    return "Competitive athletes, fitness enthusiasts looking to maximize their potential, and individuals preparing for athletic events or challenges.";
  } else if (productName.includes("Focus") || productName.includes("Energy")) {
    return "Athletes needing mental clarity during training or competition, those seeking non-stimulant energy support, and individuals wanting to enhance their mind-body connection.";
  } else {
    return "Active individuals of all levels looking to support their physical performance, recovery, and overall athletic wellness naturally.";
  }
}

function getSportUsageInstructions(productName: string): string {
  if (productName.includes("Oil") || productName.includes("Tincture")) {
    return "Take 1ml about 30 minutes before activity for performance, or post-workout for recovery. Hold under tongue for 60 seconds before swallowing for fastest absorption.";
  } else if (productName.includes("Topical") || productName.includes("Balm") || productName.includes("Cream")) {
    return "Apply directly to affected areas before and after activity. Massage gently until absorbed. Can be reapplied as needed for targeted relief.";
  } else if (productName.includes("Capsule")) {
    return "Take 1 capsule with water about 45-60 minutes before activity, or immediately after for recovery support. Best taken with food for optimal absorption.";
  } else {
    return "Follow package directions for optimal dosing. For best results, use consistently as part of your training regimen rather than sporadically.";
  }
}

function getSportRecommendedGroups(productName: string): string[] {
  if (productName.includes("Recovery")) {
    return [
      "Athletes after intense training sessions",
      "Fitness enthusiasts seeking faster muscle recovery",
      "Active individuals with post-workout soreness",
      "People with demanding physical routines"
    ];
  } else if (productName.includes("Performance")) {
    return [
      "Competitive athletes seeking natural support",
      "Active individuals looking to optimize workouts",
      "Sports enthusiasts preparing for events",
      "Fitness-focused professionals"
    ];
  } else if (productName.includes("Relief") || productName.includes("Pain")) {
    return [
      "Athletes with exercise-induced discomfort",
      "Active people with joint stress",
      "Individuals with physically demanding jobs",
      "Sports participants seeking targeted relief"
    ];
  } else if (productName.includes("Focus") || productName.includes("Energy")) {
    return [
      "Athletes needing mental clarity during competition",
      "Individuals seeking improved mind-body connection",
      "People wanting non-stimulant energy support",
      "Sports enthusiasts requiring sustained attention"
    ];
  } else {
    return [
      "Active individuals of all levels",
      "Health-conscious fitness enthusiasts",
      "People with regular physical activity habits",
      "Athletes looking for natural wellness support"
    ];
  }
}

function getSportNotRecommendedGroups(): string[] {
  return [
    "Pregnant or nursing women",
    "Athletes subject to drug testing without verification",
    "Children under 18 years of age",
    "Individuals with certain health conditions (consult doctor)",
    "Those taking medications with potential interactions"
  ];
} 