import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../../supabase/client";
import { Session } from "@supabase/supabase-js";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
      }
      setSession(data?.session);
      setLoading(false); // Set loading to false once session check is complete
    };

    fetchSession();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally show a loading spinner or message
  }

  if (!session) {
    return <Navigate to="/admin" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
