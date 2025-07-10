"use client";

import { useState, useEffect } from "react";
import { getAuthToken, getRefreshToken, logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import secureLocalStorage from "react-secure-storage";

type CreateCarType = {
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description: string;
  color: string;
  fuel_type: string;
  transmission: string;
  image: string;
};

const sampleCarData: CreateCarType = {
  make: "Toyota",
  model: "Camry 002",
  year: 2024,
  price: 35000,
  mileage: 0,
  description: "Brand new Toyota Camry with excellent features",
  color: "Silver",
  fuel_type: "gasoline",
  transmission: "automatic",
  image:
    "https://car-nextjs-api.cheatdev.online/uploads/41ff38ec-87ad-4ac1-86e3-f1a7e99c04df.png",
};

export default function CreateCarModal() {
  const [modalOpen, setModalOpen] = useState(false);

  // Form & state
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [carData, setCarData] = useState<CreateCarType | null>(null);

  // Lock scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [modalOpen]);

  // Create car API call
  const createCar = async (userData: CreateCarType) => {
    const access_token = getAuthToken();
    if (!access_token) {
      throw new Error(
        "No access token found. Please login or refresh your token."
      );
    }

    const response = await fetch(
      `https://car-nextjs-api.cheatdev.online/cars`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();

      if (response.status === 401) {
        throw new Error("Access token expired. Please refresh your token.");
      }

      throw new Error(errorData.message || "Failed to create car");
    }

    const data = await response.json();
    return data;
  };

  // Handlers
  const handleCreateCar = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const result = await createCar(sampleCarData);
      setMessage("Car created successfully!");
      setCarData(result.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to create car");
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    setRefreshing(true);
    setError("");
    setMessage("");

    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        throw new Error("No refresh token found. Please login again.");
      }

      const response = await fetch("/api/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to refresh token");
      }

      const data = await response.json();

      if (data.token || data.access_token) {
        const newToken = data.token || data.access_token;
        secureLocalStorage.setItem("authToken", newToken);
        setMessage("Access token refreshed successfully!");
      } else {
        throw new Error("No new access token received");
      }

      if (data.refreshToken || data.refresh_token) {
        const newRefreshToken = data.refreshToken || data.refresh_token;
        secureLocalStorage.setItem("refreshToken", newRefreshToken);
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to refresh token"
      );
    } finally {
      setRefreshing(false);
    }
  };

  const logOutAccessToken = async () => {
    setRefreshing(true);
    setError("");
    setMessage("");

    try {
      const logOutToken = logout();
      console.log(logOutToken);
      setModalOpen(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to logout");
    } finally {
      setRefreshing(false);
    }
  };

  const checkTokenStatus = () => {
    const accessToken = getAuthToken();
    const refreshToken = getRefreshToken();

    alert(
      `Access Token: ${accessToken ? "Available" : "Missing"}\nRefresh Token: ${
        refreshToken ? "Available" : "Missing"
      }`
    );
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="px-5 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Open Create Car Modal
      </button>

      {/* Modal */}
      {modalOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setModalOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-[1000] cursor-pointer"
          />

          {/* Modal Content */}
          <div
            role="dialog"
            aria-modal="true"
            className="fixed top-1/2 left-1/2 z-[1001] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg flex flex-col items-center"
          >
            <h1 className="text-2xl font-bold mb-6 text-center">Create Car</h1>

            <div className="bg-gray-100 p-4 rounded-lg mb-6 w-full">
              <h3 className="font-semibold mb-2">Car to be created:</h3>
              <p>
                {sampleCarData.year} {sampleCarData.make} {sampleCarData.model}
              </p>
              <p>Price: ${sampleCarData.price.toLocaleString()}</p>
              <p>Color: {sampleCarData.color}</p>
            </div>

            <div className="space-y-3 mb-6 w-full">
              <Button
                onClick={handleCreateCar}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Creating Car..." : "Create Car Now"}
              </Button>

              <Button
                onClick={refreshAccessToken}
                disabled={refreshing}
                variant="outline"
                className="w-full"
              >
                {refreshing ? "Refreshing Token..." : "🔄 Refresh Access Token"}
              </Button>

              <Button
                onClick={checkTokenStatus}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Check Token Status
              </Button>

              <Button
                onClick={logOutAccessToken}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Logout
              </Button>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4 w-full text-center">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded mb-4 w-full text-center">
                {message}
              </div>
            )}

            {carData && (
              <div className="bg-blue-50 p-4 rounded-lg w-full text-left max-h-48 overflow-auto">
                <h3 className="font-semibold mb-2">Created Car Details:</h3>
                <pre className="text-sm">
                  {JSON.stringify(carData, null, 2)}
                </pre>
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setModalOpen(false)}
              className="mt-4 px-5 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </>
      )}
    </>
  );
}
