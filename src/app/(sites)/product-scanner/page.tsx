"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Camera, RotateCcw } from "lucide-react";
import { useGenerateReportMutation } from "@/hooks/react-query";
import Loading from "@/components/common/Loading";
import { useCategory } from "@/context/CategoryContext";
import UploadForm from "../workspace/page";
import { useCapturedImage } from "@/context/ImageContext";

export default function ProductScanner() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [_, setAnalysisResult] = useState<string | null>(null);
  const [showUploadForm, _setShowUploadForm] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { selectedCategory } = useCategory();
  const category = selectedCategory || "Food";

  const { setCapturedFile } = useCapturedImage();

  const { isPending, data, isSuccess, isError, error } = useGenerateReportMutation();

  // Start camera on mount and when facingMode changes
  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [facingMode]);

  // Stop camera on tab switch or browser minimize
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") stopCamera();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Stop camera on route change
  useEffect(() => {
    return () => stopCamera();
  }, [pathname]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("Unable to access the camera. Please grant permission.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current) videoRef.current.srcObject = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  };

  const switchCamera = () => {
    stopCamera();
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  };

  const goBack = () => {
    stopCamera();
    router.back();
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const context = canvasRef.current.getContext("2d");
    const { videoWidth, videoHeight } = videoRef.current;

    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;
    context?.drawImage(videoRef.current, 0, 0, videoWidth, videoHeight);

    canvasRef.current.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
      const url = URL.createObjectURL(file);
      setCapturedImage(url);
      setImageFile(file);
      stopCamera();
    }, "image/jpeg");
  };

  const uploadImage = () => {
    if (!imageFile) return alert("No image captured");
    setCapturedFile(imageFile); // Save in context
    router.push("/workspace");
    stopCamera();
  };

  useEffect(() => {
    if (isSuccess && data?.success && data?.choice) {
      setAnalysisResult(data.choice);
    } else if (isError) {
      console.error("Upload error:", error);
    }
  }, [isSuccess, isError, data, error]);

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-black">
      {!capturedImage && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-md rounded-lg"
        />
      )}
      <canvas ref={canvasRef} className="hidden" />

      {/* Go Back */}
      <div className="absolute top-4 left-4">
        <button
          onClick={goBack}
          className="rounded-lg bg-gray-800 px-3 py-2 text-white shadow hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>

      {/* Camera Controls */}
      {!capturedImage && (
        <>
          {/* Switch camera */}
          <div className="absolute top-4 right-4">
            <button
              onClick={switchCamera}
              className="rounded-full bg-gray-800 p-2 text-white shadow hover:bg-gray-700"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          {/* Capture button */}
          <div className="absolute bottom-10 flex flex-col items-center">
            <button
              onClick={captureImage}
              className="rounded-full bg-white p-4 text-black shadow-lg transition hover:bg-gray-100"
            >
              <Camera className="h-6 w-6" />
            </button>
          </div>
        </>
      )}

      {/* Captured Preview */}
      {capturedImage && (
        <div className="mt-4 flex flex-col items-center justify-center">
          <h3 className="mb-4 text-white">Captured Image:</h3>
          <img
            src={capturedImage}
            alt="Captured"
            className="w-full max-w-xl rounded-lg shadow-md"
          />
          <div className="mt-4">
            <button
              onClick={uploadImage}
              disabled={isPending}
              className="rounded-lg bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
            >
              {isPending ? <Loading /> : "Upload Image"}
            </button>
          </div>
        </div>
      )}

      {/* Retake Photo */}
      {capturedImage && (
        <button
          onClick={() => {
            setCapturedImage(null);
            setImageFile(null);
            startCamera();
          }}
          className="mt-4 rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
        >
          Retake Photo
        </button>
      )}
    </div>
  );
}
