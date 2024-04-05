import { useState, useEffect } from "react";
import { createContext } from "vm";

const context = createContext();

export default function ProviderContext({children}) {
  const [csrfToken, setCsrfToken] = useState<string>("");
  useEffect(() => {
    // Fetch the CSRF token from your backend API
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf-token"); // Replace '/api/csrf-token' with the actual endpoint to fetch the CSRF token
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };

    fetchCsrfToken();
  }, []);
  return(
    <context.Provider value={csrfToken}>
        {children}
    </context.Provider>
  )
}
