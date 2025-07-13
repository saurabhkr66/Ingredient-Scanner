// components/CameraAccessToast.tsx
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function CameraAccessToast({
  onAllow,
  onChooseAnother,
}: {
  onAllow: () => void;
  onChooseAnother: () => void;
}) {
  return (
    <div className="flex flex-col items-center space-y-3 p-4 text-center">
      <Camera className="h-8 w-8 text-blue-500" />
      <h3 className="text-lg font-semibold">Allow Camera Access</h3>
      <p className="text-sm text-gray-600">
        To scan your product label in real time, we need access to your camera.
        <br />
        We will never record or store anything without your permission.
      </p>
      <div className="mt-2 flex space-x-2">
        <Button onClick={onAllow} className="bg-blue-500 text-white hover:bg-blue-600">
          Allow Access
        </Button>
        <Button variant="outline" onClick={onChooseAnother}>
          Choose Another Method
        </Button>
      </div>
    </div>
  );
}
