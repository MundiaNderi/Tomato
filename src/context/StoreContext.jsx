import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    // Add to cart
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    };

    // Remove from Cart
    const removeFromCart = async (itemId) => {
        if (cartItems[itemId] > 0) {
            // Decrement the quantity in the local state
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

            // Make the API call to update the cart
            if (token) {
                try {
                    await axios.delete(url + "/api/cart/remove", { data: { itemId }, headers: { token } });
                } catch (error) {
                    // If the API call fails, revert the local state back to its previous state
                    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
                    console.error("Error removing item from cart:", error);
                }
            }
        }
    };

    // Calculate total cart amount
    const getTotalCartAmount = () => {
        let totalAmount = 0;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    // fetch food list from the database
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFoodList(response.data.data)
    }

    // Load cart data
    const loadCartData = async (token) => {
        try {
            const response = await axios.get(url + "/api/cart/get", { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    }



    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token")) // point of error
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
