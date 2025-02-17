import React, { createContext, useState } from "react";  // ✅ Import React

export const DataContext = createContext();

export default function ContextFun({ children }) {
  const [data, setData] = useState("");
  const [isLogin,setIsLogin] = useState(false)
  const [menu,setMenu] = useState(false)

  const value = { data, setData,
    isLogin,setIsLogin,
    menu,setMenu
   };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

