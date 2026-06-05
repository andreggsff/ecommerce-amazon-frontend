"use client"

import { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import useCartStore from "@/store/cartStore"
import CartItem from "@/components/cart/CartItem"
import CartSummary from "@/components/cart/CartSummary"
import { cartService } from "@/services/cartService"
import Link from "next/link"

function CartPage() {
  const items = useCartStore((state) => state.items)
  const addItem = useCartStore((state) => state.addItem)

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null

  const { data: cartData, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => cartService.getCart(userId),
    enabled: !!userId,
    retry: false,
  })

  useEffect(() => {
    if (cartData?.items) {
      cartData.items.forEach((item) => addItem(item))
    }
  }, [cartData])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="bg-gray-900 py-4 px-6">
        <Link href="/" className="text-yellow-400 text-2xl font-bold">
          amazon<span className="text-white">.clone</span>
        </Link>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Carrinho de Compras</h1>
        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-6xl mb-4">🛒</p>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-500 mb-6">Adicione produtos para continuar</p>
            <Link href="/products" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-3 rounded-lg">
              Ver Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default CartPage