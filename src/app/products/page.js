"use client"

import { useQuery } from "@tanstack/react-query"
import useCartStore from "@/store/cartStore"
import Link from "next/link"
import axios from "axios"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem)

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/produtos`)
      return response.data
    },
    retry: false,
  })

  const mockProducts = [
    { id: 1, name: "Fone de Ouvido Bluetooth", price: 199.90, imageUrl: null, description: "Fone sem fio com cancelamento de ruído" },
    { id: 2, name: "Teclado Mecânico RGB", price: 349.90, imageUrl: null, description: "Teclado gamer com switches blue" },
    { id: 3, name: "Mouse Gamer 12000 DPI", price: 149.90, imageUrl: null, description: "Mouse óptico de alta precisão" },
    { id: 4, name: "Monitor 24\" Full HD", price: 899.90, imageUrl: null, description: "Monitor IPS 144Hz" },
    { id: 5, name: "Cadeira Gamer", price: 1299.90, imageUrl: null, description: "Cadeira ergonômica reclinável" },
    { id: 6, name: "Webcam Full HD", price: 259.90, imageUrl: null, description: "Webcam 1080p com microfone" },
  ]

  const displayProducts = products || mockProducts

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 py-4 px-6 flex justify-between items-center">
        <Link href="/" className="text-yellow-400 text-2xl font-bold">
          amazon<span className="text-white">.clone</span>
        </Link>
        <Link href="/cart" className="text-white hover:text-yellow-400 font-semibold">
          🛒 Carrinho
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Produtos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col">
              <div className="w-full h-48 bg-gray-100 rounded-md mb-4 flex items-center justify-center">
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={product.name} className="h-full object-contain" />
                ) : (
                  <span className="text-5xl">📦</span>
                )}
              </div>
              <h2 className="font-semibold text-gray-800 mb-1">{product.name}</h2>
              <p className="text-gray-500 text-sm mb-3">{product.description}</p>
              <p className="text-orange-500 font-bold text-lg mb-4">
                R$ {product.price.toFixed(2)}
              </p>
              <button
                onClick={() => addItem(product)}
                className="mt-auto w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-lg transition-colors"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default ProductsPage