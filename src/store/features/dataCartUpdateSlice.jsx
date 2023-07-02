import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [], // Массив для обновления корзины
  cartItems: [], // Массив для отображения корзины и взаимодействия с пользователем
  total: null, // общая сумма заказа
};

const cartUpdateData = createSlice({
  name: "data",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.data.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        // The item already exists. Updates quantity
        state.data[itemIndex].quantity = quantity;

      } else {
        // Product not found => add to data
        state.data.push({ id, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.data.findIndex((item) => item.id === id);

      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1);
        const cartItemIndex = state.cartItems.findIndex((item) => item.product.id === id);
        if (cartItemIndex !== -1) {
          state.cartItems.splice(cartItemIndex, 1);
        }
      }
    },
    updateCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    clearCart: (state) => {
      state.data = [];
      state.cartItems = [];
    },
    updateTotal: (state) => {
      let total = 0;
      state.cartItems.forEach((item) => {
        const product = state.data.find((prod) => prod.id === item.product.id);
        if (product) {
          total += product.quantity * item.product.price;
        }
      });
      state.total = total;
    }
  },
});

export const { addToCart, removeFromCart, updateCartItems, clearCart, updateTotal } = cartUpdateData.actions;
export default cartUpdateData.reducer;

export const saveCartState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cartState", serializedState);
  } catch (error) {
    console.log("Ошибка записи состояния корзины в localStorage", error);
  }
}

export const loadCartState = (state) => {
  try {
    const serializedState = localStorage.getItem("cartState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.log("Ошибка получения состояния корзины в localStorage", error);
  }
}
