"use client";

import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState, ReactNode } from "react";

interface GlobalContextType {
  showNavModal: boolean;
  setShowNavModal: (value: boolean) => void;
  pageLevelLoader: boolean;
  setPageLevelLoader: (value: boolean) => void;
  isAuthUser: boolean | null;
  setIsAuthUser: (value: boolean | null) => void;
  user: any; // Define a proper type for user
  setUser: (user: any) => void; // Adjust as needed
  componentLevelLoader: {
    loading: boolean;
    id: string;
  };
  setComponentLevelLoader: (value: { loading: boolean; id: string }) => void;
  // currentUpdatedProduct: any; // Define a proper type for the product
  // setCurrentUpdatedProduct: (product: any) => void; // Adjust as needed
  // showCartModal: boolean;
  // setShowCartModal: (value: boolean) => void;
  // cartItems: any[]; // Define a proper type for cart items
  // setCartItems: (items: any[]) => void; // Adjust as needed
  // addresses: any[]; // Define a proper type for addresses
  // setAddresses: (addresses: any[]) => void; // Adjust as needed
  // addressFormData: {
  //   fullName: string;
  //   city: string;
  //   country: string;
  //   postalCode: string;
  //   address: string;
  // };
  // setAddressFormData: (data: typeof addressFormData) => void;
  // checkoutFormData: typeof initialCheckoutFormData; // Use the existing initial type
  // setCheckoutFormData: (data: typeof initialCheckoutFormData) => void;
  // allOrdersForUser: any[]; // Define a proper type for orders
  // setAllOrdersForUser: (orders: any[]) => void; // Adjust as needed
  // orderDetails: any; // Define a proper type for order details
  // setOrderDetails: (details: any) => void; // Adjust as needed
  // allOrdersForAllUsers: any[]; // Define a proper type for all orders
  // setAllOrdersForAllUsers: (orders: any[]) => void; // Adjust as needed
}

// Provide a default context value
const defaultContext: GlobalContextType = {
  showNavModal: false,
  setShowNavModal: () => { }, // No-op function
  pageLevelLoader: false,
  setPageLevelLoader: () => { }, // No-op function
  isAuthUser: null,
  user: null,
  setIsAuthUser: function (value: boolean | null): void {},
  setUser: function (user: any): void {},
  componentLevelLoader: {
    loading: false,
    id: ""
  },
  setComponentLevelLoader: function (value: { loading: boolean; id: string; }): void {}
};


export const GlobalContext = createContext<GlobalContextType>(defaultContext);

export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

const protectedRoutes = ["cart", "checkout", "account", "orders", "admin-view"];

const protectedAdminRoutes = [
  "/admin-view",
  "/admin-view/add-product",
  "/admin-view/all-products",
];

interface User {
  name?: string;
  email?: string;
  role?: string;
}

interface GlobalStateProps {
  children: ReactNode;
}

export default function GlobalState({ children }: GlobalStateProps) {
  const [showNavModal, setShowNavModal] = useState(false);
  const [pageLevelLoader, setPageLevelLoader] = useState(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [addressFormData, setAddressFormData] = useState({
    fullName: "",
    city: "",
    country: "",
    postalCode: "",
    address: "",
  });

  const [checkoutFormData, setCheckoutFormData] = useState(
    initialCheckoutFormData
  );

  const [allOrdersForUser, setAllOrdersForUser] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState([]);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user") ?? "{}") || {};
      const getCartItems = JSON.parse(localStorage.getItem("cartItems") ?? "{}") || [];
      setUser(userData);
      // setCartItems(getCartItems);
    } else {
      setIsAuthUser(false);
      setUser({}); //unauthenticated user
    }
  }, [Cookies]);

  useEffect(() => {
    if (
      pathName !== "/register" &&
      !pathName.includes("product") &&
      pathName !== "/" &&
      user &&
      Object.keys(user).length === 0 &&
      protectedRoutes.includes(pathName)
    )
      router.push("/login");
  }, [user, pathName]);

  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathName) > -1
    )
      router.push("/unauthorized-page");
  }, [user, pathName]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        pageLevelLoader,
        setPageLevelLoader,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        componentLevelLoader,
        setComponentLevelLoader,
        // currentUpdatedProduct,
        // setCurrentUpdatedProduct,
        // showCartModal,
        // setShowCartModal,
        // cartItems,
        // setCartItems,
        // addresses,
        // setAddresses,
        // addressFormData,
        // setAddressFormData,
        // checkoutFormData,
        // setCheckoutFormData,
        // allOrdersForUser,
        // setAllOrdersForUser,
        // orderDetails,
        // setOrderDetails,
        // allOrdersForAllUsers,
        // setAllOrdersForAllUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
