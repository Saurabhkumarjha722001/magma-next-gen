import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabase/client";
import { useForm } from "react-hook-form";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {  ToggleLeft, Trash2 } from "lucide-react";

type Product = {
  id: string;
  name: string;
  image: string;
  disabled: boolean;
  created_at: string;
};

type FormValues = {
  name: string;
  image: FileList;
};

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // For dialog

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormValues>({ mode: "onChange" });

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) {
      console.error("Error fetching products:", error.message);
    } else {
      setProducts(data || []);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Upload image to Supabase storage
  const uploadImage = async (file: File): Promise<string | null> => {
    const filePath = `products/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      alert("Failed to upload image!");
      return null;
    }

    const { data } = supabase.storage.from("images").getPublicUrl(filePath);
    return data?.publicUrl || null;
  };

  // Add a new product
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    const imageFile = data.image[0];
    if (!imageFile) {
      alert("Image file is required!");
      setIsSubmitting(false);
      return;
    }

    const imageUrl = await uploadImage(imageFile);
    if (!imageUrl) {
      setIsSubmitting(false);
      return;
    }

    const { error } = await supabase.from("products").insert([
      { name: data.name, image: imageUrl, disabled: false },
    ]);

    if (error) {
      console.error("Error adding product:", error.message);
      alert("Failed to add product!");
    } else {
      alert("Product added successfully!");
      reset();
      fetchProducts();
    }

    setIsSubmitting(false);

    await supabase.functions.invoke("send-mail")
  };

  // Handle delete product and its image
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

    const productId = selectedProduct.id;
    const productImage = selectedProduct.image;

    // Delete product from Supabase
    const { error } = await supabase.from("products").delete().eq("id", productId);

    if (error) {
      console.error("Error deleting product:", error.message);
      alert("Failed to delete product!");
    } else {
      // Delete product image from Supabase storage
      const filePath = productImage.split("/").pop(); // Extract file path
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from("images")
          .remove([`products/${filePath}`]);

        if (storageError) {
          console.error("Error deleting image:", storageError.message);
        }
      }

      alert("Product deleted successfully!");
      fetchProducts();
    }

    setSelectedProduct(null); // Close dialog
  };

  // Toggle the status flag
  const handleToggleProduct = async (id: string, disabled: boolean) => {
    const { error } = await supabase
      .from("products")
      .update({ disabled: !disabled })
      .eq("id", id);

    if (error) {
      console.error("Error toggling product status:", error.message);
      alert("Failed to toggle product status!");
    } else {
      fetchProducts();
    }
  };

  // TanStack Table Columns
  const columns: ColumnDef<Product>[] = [
    {
      header: "Sr. No",
      cell: (info) => info.row.index + 1,
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: (info) => (
        <img
          src={info.getValue() as string}
          alt="Product"
          className="w-16 h-16 object-cover rounded"
        />
      ),
    },
    {
      accessorKey: "disabled",
      header: "Status",
      cell: (info) => {
        const disabled = info.getValue<boolean>();
        return (
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              disabled
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {disabled ? "Inactive" : "Active"}
          </span>
        );
      },
    },
    {
      header: "Actions",
      cell: (info) => {
        const product = info.row.original;
        return (
          <div className="flex space-x-2">
            <button
              onClick={() => handleToggleProduct(product.id, product.disabled)}
              className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
            >
              <ToggleLeft className="w-4 h-4 mr-1" />
              Toggle
            </button>
            <button
              onClick={() => setSelectedProduct(product)} // Open dialog
              className="flex items-center px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="py-1 lg:px-4">

      {/* Add Product Form */}
      <div className="flex justify-center mb-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md border border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-4">Add New Product</h3>
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                {...register("name", {
                  required: "Product name is required",
                  minLength: { value: 3, message: "Name must be at least 3 characters long" },
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image</label>
              <input
                type="file"
                {...register("image", { required: "Image file is required" })}
                className="w-full px-4 py-2 border rounded-lg"
                accept="image/*"
              />
              {errors.image && (
                <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`px-6 py-2 rounded-lg text-white font-semibold ${
                isSubmitting || !isValid ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full bg-white text-sm text-left">
          <thead className="bg-gray-100 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 text-gray-700 font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p>
              Are you sure you want to delete the product{" "}
              <strong>{selectedProduct.name}</strong>?
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProduct}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default ProductsSection
