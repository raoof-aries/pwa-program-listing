import React, { createContext, useContext, useState, useCallback } from "react";

const ProgramContext = createContext();

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

  const BASE_URL = "https://anukavyam.in/webservices/attendance/index.php";

  // Fetch today's programs
  const fetchTodayPrograms = useCallback(async () => {
    setLoading((prev) => ({ ...prev, today: true }));
    setError((prev) => ({ ...prev, today: null }));

    try {
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
  }, []);

  // Fetch programs for a specific date
  const fetchProgramsByDate = useCallback(async (date) => {
    if (!date) {
      setPastPrograms([]);
      return;
    }

    setLoading((prev) => ({ ...prev, past: true }));
    setError((prev) => ({ ...prev, past: null }));

    try {
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
  }, []);

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
