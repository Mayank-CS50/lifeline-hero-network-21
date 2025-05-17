
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-4">
        <div className="flex justify-center mb-6">
          <div className="bg-blood-100 rounded-full p-6">
            <Heart className="h-12 w-12 text-blood-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <div className="space-y-4">
          <Button 
            className="w-full bg-blood-600 hover:bg-blood-700"
            onClick={() => navigate("/")}
          >
            Return Home
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
