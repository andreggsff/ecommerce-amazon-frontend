"use client"

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const cartService = {
  getCart: async (userId) => {
    const response = await api.get(`/carrinho/${userId}`);
    return response.data;
  },

  addToCart: async (userId, productId, quantity) => {
    const response = await api.post(`/carrinho/${userId}/produto/${productId}`, {
      quantity,
    });
    return response.data;
  },

  removeFromCart: async (userId, productId) => {
    const response = await api.delete(
      `/carrinho/${userId}/produto/${productId}`
    );
    return response.data;
  },

  updateQuantity: async (userId, productId, quantity) => {
    const response = await api.put(
      `/carrinho/${userId}/produto/${productId}`,
      { quantity }
    );
    return response.data;
  },

  clearCart: async (userId) => {
    const response = await api.delete(`/carrinho/${userId}/limpar`);
    return response.data;
  },
};