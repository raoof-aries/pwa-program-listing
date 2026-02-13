import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

const ProgramContext = createContext();

// Loads runtime config from public/config.json (outside the bundle)
async function loadConfig() {
  const response = await fetch(`${import.meta.env.BASE_URL}config.json`);
  if (!response.ok) throw new Error("Failed to load config.json");
  return response.json();
}

export function ProgramProvider({ children }) {
  const [todayPrograms, setTodayPrograms] = useState([]);
  const [pastPrograms, setPastPrograms] = useState([]);
  const [loading, setLoading] = useState({
    today: false,
    past: false,
  });
  const [error, setError] = useState({
    today: null,
    past: null,
  });

  const baseUrlRef = useRef(null);
  const configLoadedRef = useRef(null); // holds the config promise

  // Ensures config is loaded only once and returns the BASE_URL
  // On failure, clears the cached promise so the next call retries
  const getBaseUrl = useCallback(async () => {
    if (baseUrlRef.current) return baseUrlRef.current;

    if (!configLoadedRef.current) {
      configLoadedRef.current = loadConfig()
        .then((config) => {
          baseUrlRef.current = config.BASE_URL;
          return config.BASE_URL;
        })
        .catch((err) => {
          configLoadedRef.current = null; // allow retry on next call
          throw err;
        });
    }

    return configLoadedRef.current;
  }, []);

  // Fetch today's programs
  const fetchTodayPrograms = useCallback(async () => {
    setLoading((prev) => ({ ...prev, today: true }));
    setError((prev) => ({ ...prev, today: null }));

    try {
      const BASE_URL = await getBaseUrl();
      const response = await fetch(`${BASE_URL}?action=todayPgm`);
      if (!response.ok) throw new Error("Failed to fetch today's programs");

      const data = await response.json();
      setTodayPrograms(data || []);
    } catch (err) {
      setError((prev) => ({ ...prev, today: err.message }));
      setTodayPrograms([]);
    } finally {
      setLoading((prev) => ({ ...prev, today: false }));
    }
  }, [getBaseUrl]);

  // Fetch programs for a specific date
  const fetchProgramsByDate = useCallback(async (date) => {
    if (!date) {
      setPastPrograms([]);
      return;
    }

    setLoading((prev) => ({ ...prev, past: true }));
    setError((prev) => ({ ...prev, past: null }));

    try {
      const BASE_URL = await getBaseUrl();
      const response = await fetch(
        `${BASE_URL}?action=dateWisePgm&date=${date}`
      );
      if (!response.ok)
        throw new Error("Failed to fetch programs for selected date");

      const data = await response.json();
      setPastPrograms(data || []);
    } catch (err) {
      setError((prev) => ({ ...prev, past: err.message }));
      setPastPrograms([]);
    } finally {
      setLoading((prev) => ({ ...prev, past: false }));
    }
  }, [getBaseUrl]);

  // Find a program by ID from both today and past programs
  const findProgramById = useCallback(
    (id) => {
      const allPrograms = [...todayPrograms, ...pastPrograms];
      return allPrograms.find((p) => p.id === parseInt(id));
    },
    [todayPrograms, pastPrograms]
  );

  const value = {
    todayPrograms,
    pastPrograms,
    loading,
    error,
    fetchTodayPrograms,
    fetchProgramsByDate,
    findProgramById,
  };

  return (
    <ProgramContext.Provider value={value}>{children}</ProgramContext.Provider>
  );
}

export function useProgramContext() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useProgramContext must be used within a ProgramProvider");
  }
  return context;
}
