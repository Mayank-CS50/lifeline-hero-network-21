
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the main app page
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Heart className="h-12 w-12 text-blood-600 animate-pulse" />
        <h2 className="mt-4 text-2xl font-semibold">Loading LifeFlow...</h2>
      </div>
    </div>
  );
};

export default Index;
