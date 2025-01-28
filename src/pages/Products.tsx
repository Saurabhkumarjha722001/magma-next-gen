// import React from 'react';

// // Importing the local product image
// import productImage from "./product.jpg";

// const Products = () => {
//   const products = [
//     {
//       category: "Fire Fighting Equipments",
//       items: [
//         {
//           name: "Pro-X Fire Extinguisher",
//           image: productImage
//         },
//         {
//           name: "CO2 Fire Extinguisher",
//           image: productImage
//         },
//         {
//           name: "Attack Fire Hose",
//           image: productImage
//         },
//         {
//           name: "Supply Line Hose",
//           image: productImage
//         },
//         {
//           name: "Professional Firefighter Suit",
//           image: productImage
//         },
//         {
//           name: "SCBA System",
//           image: productImage
//         }
//       ]
//     }
//   ];

//   return (
//     <div>
//       {/* Hero Section */}
//       <div className="bg-red-700 text-white py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center">
//             <h1 className="text-4xl font-bold mb-4">Our Products</h1>
//             <p className="text-xl">Professional firefighting equipment for every need</p>
//           </div>
//         </div>
//       </div>
//     <div className="py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {products.map((category, index) => (
//           <div key={index} className="mb-16">
//             {/* Updated grid layout for 3 columns */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//               {category.items.map((product, productIndex) => (
//                 <div key={productIndex} className="bg-white rounded-lg shadow-lg overflow-hidden">
//                   <img 
//                     src={product.image} 
//                     alt={product.name}
//                     className="w-full h-64 object-cover"
//                   />
//                   <div className="p-4">
//                     <h3 className="text-xl font-semibold text-center">{product.name}</h3>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </div>
//   );
// };

// export default Products;


import  { useEffect, useState } from "react";
import { supabase } from "../supabase/client";

// Importing the fallback product image
import fallbackImage from "./product.jpg";

type Product = {
  id: string;
  name: string;
  image?: string; // Optional image URL
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").eq("disabled",false);
    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data || []);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Our Products</h1>
            <p className="text-xl">Professional firefighting equipment for every need</p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <img
                  src={product.image || fallbackImage} // Fallback to static image if `image_url` is missing
                  alt={product.name}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-center">
                    {product.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
