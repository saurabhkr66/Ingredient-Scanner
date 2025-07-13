import React from "react";
import { Spinner } from "../ui/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Spinner />
    </div>
  );
}
