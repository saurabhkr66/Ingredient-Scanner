// components/CameraAccessToast.tsx
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default function UnsuccessfulScan() {
  return (
    <div className="flex flex-col items-center space-y-3 p-4 text-center">
      <Camera className="h-8 w-8 text-blue-500" />
      <h3 className="text-lg font-semibold">Scan Unsuccessful</h3>
      <p className="text-sm text-gray-600">
        We could not detect the ingredients in the image.
        <br />
        This might be due to poor image quality or unclear labelling.
      </p>
      <div className="mt-2 flex space-x-2">
        <Button className="bg-blue-500 text-white hover:bg-blue-600">Try Again</Button>
        <Button>View Tips</Button>
      </div>
    </div>
  );
}
