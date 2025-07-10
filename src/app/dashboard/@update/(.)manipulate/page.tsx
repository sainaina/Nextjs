"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CreateModal() {
  const router = useRouter();

  // Optional: Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => router.back()}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 999,
          cursor: "pointer",
        }}
      />

      {/* Modal container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "2.5rem 3rem",
          width: "420px",
          maxWidth: "90vw",
          boxShadow: "0 12px 28px rgba(0,0,0,0.3)",
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "fadeInScale 0.3s ease forwards",
        }}
      >
        <h2
          id="modal-title"
          style={{
            margin: 0,
            marginBottom: "1.25rem",
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#222",
            textAlign: "center",
          }}
        >
          Update Car (Modal)
        </h2>

        <p
          style={{
            marginBottom: "2rem",
            color: "#555",
            fontSize: "1rem",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Here you can add your form or inputs to create a car.
        </p>

        <button
          onClick={() => router.back()}
          style={{
            padding: "0.75rem 1.8rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "600",
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 6px 12px rgba(0, 112, 243, 0.4)",
            transition: "background-color 0.25s ease, box-shadow 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#005bb5";
            e.currentTarget.style.boxShadow =
              "0 8px 16px rgba(0, 91, 181, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0070f3";
            e.currentTarget.style.boxShadow =
              "0 6px 12px rgba(0, 112, 243, 0.4)";
          }}
          type="button"
        >
          Close
        </button>
      </div>

      <style>
        {`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
        `}
      </style>
    </>
  );
}
