import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Coffee, UtensilsCrossed } from "lucide-react";

export const ProductsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const products = [
    {
      id: 1,
      name: "كابتشينو كلاسيكي",
      category: "مشروبات ساخنة",
      price: "15.50 ر.س",
      stock: 100,
      status: "متوفر",
      image: "/api/placeholder/80/80",
      description: "قهوة إسبريسو مع حليب مبخر ورغوة كثيفة"
    },
    {
      id: 2,
      name: "لاتيه بالفانيليا", 
      category: "مشروبات ساخنة",
      price: "18.00 ر.س",
      stock: 85,
      status: "متوفر",
      image: "/api/placeholder/80/80",
      description: "قهوة لاتيه مع شراب الفانيليا الطبيعي"
    },
    {
      id: 3,
      name: "فرابتشينو بالكراميل",
      category: "مشروبات باردة", 
      price: "22.75 ر.س",
      stock: 45,
      status: "متوفر",
      image: "/api/placeholder/80/80",
      description: "مشروب بارد مثلج مع كراميل وكريمة مخفوقة"
    },
    {
      id: 4,
      name: "كروسان بالزبدة",
      category: "معجنات",
      price: "8.25 ر.س",
      stock: 25,
      status: "قليل",
      image: "/api/placeholder/80/80",
      description: "كروسان فرنسي طازج محشو بالزبدة"
    },
    {
      id: 5,
      name: "كيك الشوكولاتة",
      category: "حلويات",
      price: "28.00 ر.س",
      stock: 0,
      status: "نفد",
      image: "/api/placeholder/80/80",
      description: "قطعة كيك شوكولاتة غنية مع كريمة الفانيليا"
    }
  ];

  const getCategoryIcon = (category: string) => {
    if (category.includes("مشروبات")) {
      return <Coffee className="w-4 h-4" />;
    }
    return <UtensilsCrossed className="w-4 h-4" />;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "متوفر":
        return "bg-accent/20 text-accent-foreground border-accent/30";
      case "قليل":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "نفد":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-strong bg-card/95 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-foreground">إدارة المنتجات</CardTitle>
            <CardDescription>إضافة وتعديل وحذف منتجات المقهى</CardDescription>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:shadow-glow">
            <Plus className="w-4 h-4 mr-2" />
            منتج جديد
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="البحث في المنتجات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pr-10"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-glow transition-all duration-300 border-border/50">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-lg bg-muted/30 flex items-center justify-center">
                    {getCategoryIcon(product.category)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-foreground text-sm">{product.name}</h3>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getStatusColor(product.status)}`}
                      >
                        {product.status}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-primary">{product.price}</p>
                        <p className="text-xs text-muted-foreground">المخزون: {product.stock}</p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm" className="w-7 h-7 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-7 h-7 p-0 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};