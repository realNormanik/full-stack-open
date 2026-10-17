import { useState, useEffect } from "react";
import axios from "axios";

const useCountry = (countryName) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) {
      setCountry(null);
      setLoading(false);

      return;
    };

    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://api.restcountries.com/countries/v5?q=${encodeURIComponent(countryName)}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
          },
        );

        const objects = response.data?.data?.objects;

        setCountry(objects[0]);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError("Country not found");
        setLoading(false);
      };
    };

    fetchCountry();
  }, [countryName]);

  return { country, loading, error };
};

export default useCountry;