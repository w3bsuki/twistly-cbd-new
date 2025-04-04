"use client";

import React, { useState, useEffect } from "react";
import { ChevronRight, AlertCircle, ShoppingCart, Heart, Star, Eye, Info, Droplet, Check, ArrowRight, Sparkles, Package, BadgePercent, Award, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts, Product, getBestSellerProducts, getProductsByCategory } from "@/lib/products";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCardSkeleton } from "@/components/features/products/product-card-skeleton"

export function FeaturedProducts() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'health' | 'beauty' | 'sport' | 'hybrid'>('all');
  const { toast } = useToast();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Simulate network request
        const timer = setTimeout(() => {
          // Get featured products with more than needed
          let allFeaturedProducts = getFeaturedProducts();
          
          // If we don't have enough featured products, add some bestsellers
          if (allFeaturedProducts.length < 8) {
            const bestSellers = getBestSellerProducts(8 - allFeaturedProducts.length);
            allFeaturedProducts = [...allFeaturedProducts, ...bestSellers];
          }
          
          // Always show up to 8 products
          setProducts(allFeaturedProducts.slice(0, 8));
          setIsLoading(false);
        }, 800);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error loading products:", error);
        setHasError(true);
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  // Get filtered products based on active category
  const getFilteredProducts = () => {
    if (activeCategory === 'all') {
      return products;
    }
    return products.filter(product => product.category === activeCategory);
  };
  
  // Show quick view dialog for a product
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };
  
  // Add to cart handler
  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    });
  };

  if (isLoading) {
    return <FeaturedProductsSkeleton />;
  }

  if (hasError) {
    return (
      <section className="w-full py-12 md:py-16 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center p-8 border border-red-200 rounded-lg bg-red-50">
            <AlertCircle className="h-10 w-10 text-red-500 mb-4" />
            <h2 className="text-2xl font-semibold text-red-700 mb-2">
              Unable to Load Products
            </h2>
            <p className="text-gray-600 mb-4">
              We're having trouble loading our featured products. Please try again later.
            </p>
            <Button 
              onClick={() => {
                setIsLoading(true);
                setHasError(false);
                // Retry loading products
                setTimeout(() => {
                  try {
                    // Get products
                    let featuredProducts = getFeaturedProducts();
                    if (featuredProducts.length < 8) {
                      const bestSellers = getBestSellerProducts(8 - featuredProducts.length);
                      featuredProducts = [...featuredProducts, ...bestSellers];
                    }
                    setProducts(featuredProducts.slice(0, 8));
                    setIsLoading(false);
                  } catch (error) {
                    setHasError(true);
                    setIsLoading(false);
                  }
                }, 800);
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }
  
  // Get color for category
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'health': return 'green';
      case 'beauty': return 'purple';
      case 'sport': return 'blue';
      case 'hybrid': return 'amber';
      default: return 'green';
    }
  };

  return (
    <section className="w-full py-20 md:py-28 relative overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-green-50/30" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#22c55e10_50%,transparent_100%)]" />
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#22c55e_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-5" />
      <div className="absolute top-40 left-20 w-72 h-72 bg-gradient-to-br from-green-100/10 to-blue-100/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-20 w-96 h-96 bg-gradient-to-bl from-purple-100/5 to-green-100/10 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <Badge className="px-3.5 py-1.5 rounded-full text-sm bg-gradient-to-r from-green-500 to-green-600 text-white flex items-center gap-1.5 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span className="font-medium">Premium Selection</span>
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-green-800 via-green-700 to-green-800">
            Featured Products
          </h2>
          
          <p className="text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover our curated selection of premium CBD products, ethically sourced and crafted for your wellness journey
          </p>
          
          {/* Category Tabs */}
          <Tabs 
            defaultValue="all" 
            value={activeCategory}
            onValueChange={(value) => setActiveCategory(value as typeof activeCategory)}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="flex justify-center">
              <TabsList className="bg-white/80 backdrop-blur-sm border border-gray-100 p-1.5 rounded-xl shadow-sm">
                <TabsTrigger 
                  value="all"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeCategory === 'all' 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  All Products
                </TabsTrigger>
                
                <TabsTrigger 
                  value="health"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeCategory === 'health' 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Health & Wellness
                </TabsTrigger>
                
                <TabsTrigger 
                  value="beauty"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeCategory === 'beauty' 
                      ? 'bg-purple-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Beauty
                </TabsTrigger>
                
                <TabsTrigger 
                  value="sport"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${activeCategory === 'sport' 
                      ? 'bg-blue-500 text-white shadow-sm' 
                      : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  Sports
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </motion.div>

        {/* Products Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            {getFilteredProducts().map((product, index) => {
              const categoryColor = getCategoryColor(product.category);
              
              return (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="h-full"
                >
                  <Card 
                    className={`group h-full overflow-hidden border-2 relative transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer
                      border-${categoryColor}-100 hover:border-${categoryColor}-200 dark:border-${categoryColor}-900 dark:hover:border-${categoryColor}-800`}
                    onClick={() => handleQuickView(product)}
                  >
                    {/* Product badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                      {product.bestSeller && (
                        <Badge className="bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                          <Award className="h-3 w-3" />
                          <span>Best Seller</span>
                        </Badge>
                      )}
                      {product.new && (
                        <Badge className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                          <Package className="h-3 w-3" />
                          <span>New Arrival</span>
                        </Badge>
                      )}
                      {product.discount && (
                        <Badge className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                          <BadgePercent className="h-3 w-3" />
                          <span>{product.discount}% Off</span>
                        </Badge>
                      )}
                    </div>
                    
                    {/* Quick view button */}
                    <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              className="h-8 w-8 rounded-full shadow-md"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleQuickView(product);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Quick View</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    
                    {/* Product image */}
                    <div className={`relative overflow-hidden bg-gradient-to-b from-${categoryColor}-50 to-white dark:from-${categoryColor}-900/20 dark:to-gray-900 pt-3`}>
                      <div className="relative h-48 sm:h-52 mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:translate-y-1 p-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      
                      {product.details.concentration && (
                        <div className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 px-3 py-1 rounded-full text-xs bg-white/80 backdrop-blur-sm shadow-sm border border-${categoryColor}-100 text-${categoryColor}-700`}>
                          {product.details.concentration}
                        </div>
                      )}
                    </div>
                    
                    <CardContent className="p-5 flex flex-col space-y-4">
                      {/* Category badge */}
                      <div className="flex justify-between items-start">
                        <Badge 
                          variant="outline" 
                          className={`text-xs border-${categoryColor}-200 bg-${categoryColor}-50 text-${categoryColor}-700 dark:border-${categoryColor}-900 dark:bg-${categoryColor}-900/30 dark:text-${categoryColor}-400`}
                        >
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </Badge>
                        
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-3.5 w-3.5",
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-200 fill-gray-200"
                              )}
                            />
                          ))}
                          <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
                        </div>
                      </div>
                      
                      {/* Product name and description */}
                      <div>
                        <h3 className={`font-semibold text-base text-gray-900 group-hover:text-${categoryColor}-700 transition-colors mb-1`}>
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                      </div>
                      
                      {/* Benefits */}
                      <div className="space-y-1.5">
                        {product.details.benefits.slice(0, 2).map((benefit, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <div className={`rounded-full p-0.5 text-${categoryColor}-600 flex-shrink-0 mt-0.5`}>
                              <Check className="h-3 w-3" />
                            </div>
                            <span className="text-xs text-gray-600">{benefit}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Price and actions */}
                      <div className="mt-auto pt-3 flex justify-between items-center border-t border-gray-100">
                        <div className="flex flex-col">
                          {product.discountPrice ? (
                            <>
                              <span className="text-xs text-gray-500 line-through">${product.price.toFixed(2)}</span>
                              <span className={`font-bold text-${categoryColor}-700`}>${product.discountPrice.toFixed(2)}</span>
                            </>
                          ) : (
                            <span className={`font-bold text-${categoryColor}-700`}>${product.price.toFixed(2)}</span>
                          )}
                        </div>
                        
                        <Button
                          size="sm"
                          className={`bg-${categoryColor}-600 hover:bg-${categoryColor}-700 text-white text-xs h-8`}
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          <ShoppingCart className="h-3.5 w-3.5 mr-1" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-16"
        >
          <Link 
            href="/shop" 
            className="group relative overflow-hidden inline-flex items-center justify-center px-6 py-3.5 rounded-full shadow-md border border-green-200 hover:border-green-300 bg-white hover:bg-green-50/50 transition-all duration-300"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-green-50 via-white to-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="relative z-10 text-green-700 font-medium flex items-center group-hover:text-green-800">
              View Complete Collection
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </div>
      
      {/* Quick view dialog */}
      {selectedProduct && (
        <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
          <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-white dark:bg-gray-900">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Product image */}
              <div className={`relative bg-gradient-to-br from-${getCategoryColor(selectedProduct.category)}-50 to-white dark:from-${getCategoryColor(selectedProduct.category)}-900/30 dark:to-gray-900 p-8`}>
                <div className="relative h-[280px] w-full">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    className="object-contain"
                  />
                </div>
                
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {selectedProduct.bestSeller && (
                    <Badge className="bg-amber-500 text-white">Best Seller</Badge>
                  )}
                  {selectedProduct.new && (
                    <Badge className="bg-blue-500 text-white">New</Badge>
                  )}
                </div>
              </div>
              
              {/* Product details */}
              <div className="p-6 flex flex-col h-full">
                <DialogHeader className="mb-4">
                  <div className="flex justify-between items-start">
                    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {selectedProduct.name}
                    </DialogTitle>
                    <Badge variant="outline" className={`border-${getCategoryColor(selectedProduct.category)}-200 bg-${getCategoryColor(selectedProduct.category)}-50 text-${getCategoryColor(selectedProduct.category)}-700`}>
                      {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
                    </Badge>
                  </div>
                  <DialogDescription className="text-base mt-1 dark:text-gray-400">
                    {selectedProduct.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-5 flex-1">
                  {/* Ratings */}
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={cn(
                            "h-4 w-4",
                            i < Math.floor(selectedProduct.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-200 fill-gray-200 dark:text-gray-700 dark:fill-gray-700"
                          )}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                      {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                    </span>
                  </div>
                  
                  {/* Product details */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400">Size</p>
                      <p className="font-medium text-gray-900 dark:text-gray-200">{selectedProduct.details.size}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400">Concentration</p>
                      <p className="font-medium text-gray-900 dark:text-gray-200">{selectedProduct.details.concentration}</p>
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-200">Key Benefits</h4>
                    <ul className="grid grid-cols-1 gap-2">
                      {selectedProduct.details.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className={`rounded-full p-0.5 flex-shrink-0 text-${getCategoryColor(selectedProduct.category)}-600 dark:text-${getCategoryColor(selectedProduct.category)}-400 mt-0.5`}>
                            <Check className="h-4 w-4" />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Usage instructions */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 dark:text-gray-200">How to Use</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{selectedProduct.details.usage}</p>
                  </div>
                </div>
                
                <DialogFooter className="mt-6 block">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      {selectedProduct.discountPrice ? (
                        <>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">${selectedProduct.price.toFixed(2)}</span>
                          <span className={`text-xl font-bold text-${getCategoryColor(selectedProduct.category)}-700 dark:text-${getCategoryColor(selectedProduct.category)}-500`}>
                            ${selectedProduct.discountPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className={`text-xl font-bold text-${getCategoryColor(selectedProduct.category)}-700 dark:text-${getCategoryColor(selectedProduct.category)}-500`}>
                          ${selectedProduct.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedProduct.stock > 10 ? (
                        <span className="text-green-600 dark:text-green-400">In Stock</span>
                      ) : selectedProduct.stock > 0 ? (
                        <span className="text-amber-600 dark:text-amber-400">Low Stock ({selectedProduct.stock} left)</span>
                      ) : (
                        <span className="text-red-600 dark:text-red-400">Out of Stock</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      className={`bg-${getCategoryColor(selectedProduct.category)}-600 hover:bg-${getCategoryColor(selectedProduct.category)}-700 text-white`}
                      onClick={() => {
                        toast({
                          title: "Added to Cart",
                          description: `${selectedProduct.name} has been added to your cart.`,
                          variant: "success",
                        });
                        setQuickViewOpen(false);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    
                    <Button
                      variant="outline"
                      className={`border-${getCategoryColor(selectedProduct.category)}-200 text-${getCategoryColor(selectedProduct.category)}-700 hover:bg-${getCategoryColor(selectedProduct.category)}-50 dark:border-${getCategoryColor(selectedProduct.category)}-800 dark:text-${getCategoryColor(selectedProduct.category)}-400`}
                      asChild
                    >
                      <Link href={`/shop/${selectedProduct.id}`}>
                        View Full Details
                      </Link>
                    </Button>
                  </div>
                </DialogFooter>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
}

function FeaturedProductsSkeleton() {
  return (
    <section className="w-full py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:20px_20px] opacity-5 pointer-events-none" />
      
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header Skeleton */}
        <div className="flex flex-col items-center text-center mb-16">
          <Skeleton className="h-6 w-36 mb-4 rounded-full" />
          <Skeleton className="h-10 w-72 mb-4" />
          <Skeleton className="h-5 w-[70%] max-w-2xl mb-8" />
          
          {/* Category Tabs Skeleton */}
          <div className="inline-flex items-center justify-center p-1 rounded-lg bg-muted/50 backdrop-blur-sm">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-24 mx-1 rounded-md" />
            ))}
          </div>
        </div>

        {/* Grid of skeleton cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>

        {/* View All Button Skeleton */}
        <div className="flex justify-center mt-16">
          <Skeleton className="h-12 w-48 rounded-full" />
        </div>
      </div>
    </section>
  );
}

// Add this to globals.css if not already there
// @keyframes shine {
//   0%, 20%, 100% { transform: translateX(-100%); }
//   50%, 70% { transform: translateX(100%); }
// } 