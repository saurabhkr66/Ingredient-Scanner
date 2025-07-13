"use client";

import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCapturedImage } from "@/context/ImageContext";
import { useCategory } from "@/context/CategoryContext";
import { useGenerateReportMutation } from "@/hooks/react-query";
import { AxiosError } from "axios";
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  file: z.instanceof(File, { message: "A file is required." }),
});

export default function UploadForm() {
  const { capturedFile } = useCapturedImage();
  const { selectedCategory } = useCategory();
  const category = selectedCategory || "food";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string>("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();


  const { mutate, isPending, isError, error ,data,isSuccess} = useGenerateReportMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData();
    formData.append("file", data.file);
    formData.append("type", category);
    mutate({ formData });
  };

  useEffect(() => {
    if (capturedFile) {
      form.setValue("file", capturedFile);
      setPreview(URL.createObjectURL(capturedFile));
    }
  }, [capturedFile]);
  
useEffect(() => {
  if (isSuccess && data?.id) {
    router.push(`/history/${data.id}?type=${category}`);
  }
}, [isSuccess, data, router, category]);


  const handleDrop = (e: React.DragEvent<HTMLDivElement>, onChange: (file: File) => void) => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      setIsImageLoaded(false);
      onChange(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
    }
    
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 pt-20 dark:from-black dark:to-gray-900">
      <div className="max-w-xl">
        {!isPending && (
          <AnimatePresence>
  {isError && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-400"
    >
      <p className="flex items-center font-medium">
        <span className="mr-2">Error:</span>
        {error instanceof AxiosError
          ? error.response?.data.error
          : "Please upload a valid product ingredient list."}
      </p>

     
    </motion.div>
  )}
</AnimatePresence>

        )}

        <Form {...form}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-900"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
              <div className="p-3 sm:p-8">
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field, fieldState }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="mb-1 block text-center text-lg font-medium text-slate-700 dark:text-blue-300">
                        Ingredient Image
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => {
                              const fileList = e.target.files;
                              if (fileList && fileList.length > 0) {
                                setIsImageLoaded(false);
                                field.onChange(fileList[0]);
                                setPreview(URL.createObjectURL(fileList[0]));
                              }
                            }}
                            className="hidden"
                            accept="image/*"
                          />

                          <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onDrop={(e) => handleDrop(e, field.onChange)}
                            className={`relative cursor-pointer transition-all duration-300 ease-in-out ${preview ? "h-[300px]" : "h-[350px]"} mx-auto w-[250px] overflow-hidden rounded-lg ${
                              !preview
                                ? "border-2 border-dashed border-slate-300 bg-slate-50 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-600 dark:bg-gray-800 dark:hover:border-slate-400 dark:hover:bg-gray-700"
                                : ""
                            }`}
                          >
                            {preview ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative h-full w-full"
                              >
                                <img
                                  src={preview}
                                  alt="Preview"
                                  className="h-full w-full object-contain"
                                  onLoad={() => setIsImageLoaded(true)}
                                />

                                {isImageLoaded && isPending && (
                                  <motion.div className="pointer-events-none absolute inset-0 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600">
                                    <motion.div className="pointer-events-none absolute inset-0 overflow-hidden">
                                      <motion.div
                                        className="absolute left-0 h-24 w-full rounded-md bg-gradient-to-r from-emerald-400/40 via-emerald-500/60 to-emerald-400/40 blur-md"
                                        initial={{ top: "-20%" }}
                                        animate={{ top: ["-20%", "120%"] }}
                                        transition={{
                                          duration: 3,
                                          repeat: Number.POSITIVE_INFINITY,
                                          ease: "easeInOut",
                                          repeatType: "reverse",
                                        }}
                                      />
                                    </motion.div>
                                  </motion.div>
                                )}

                                <div className="bg-opacity-0 absolute inset-0 flex items-center justify-center transition-all hover:bg-black/30 dark:hover:bg-white/10">
                                  <div className="opacity-0 transition-opacity hover:opacity-100">
                                    <Button
                                      type="button"
                                      variant="secondary"
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        fileInputRef.current?.click();
                                      }}
                                      disabled={isPending}
                                    >
                                      <ImagePlus className="mr-2 h-4 w-4" />
                                      Change Image
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            ) : (
                              <div className="flex h-full w-full flex-col items-center justify-center p-6">
                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-200 dark:bg-gray-700">
                                  <Upload className="h-8 w-8 text-slate-500 dark:text-blue-300" />
                                </div>
                                <p className="mb-1 text-center font-medium text-slate-600 dark:text-blue-300">
                                  Drag and drop your image here
                                </p>
                                <p className="text-center text-sm text-slate-400 dark:text-blue-400">
                                  or click to browse files
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="mt-2">{fieldState.error.message}</FormMessage>
                      )}
                      {!isPending && (
                        <FormDescription className="mt-2 text-center text-slate-500 dark:text-blue-400">
                          Upload a clear image of your ingredient for analysis
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                {!isPending && (
                  <div className="mb-4">
                    <FormLabel className="mb-2 block text-lg font-medium text-slate-700 dark:text-slate-300">
                      Product Type
                    </FormLabel>
                    <div className="rounded border border-slate-300 bg-slate-100 px-4 py-2 text-slate-700 dark:border-slate-700 dark:bg-gray-800 dark:text-slate-300">
                      {category}
                    </div>
                  </div>
                )}
              </div>

              {!isPending && <Separator className="bg-slate-200 dark:bg-slate-700" />}

              {!isPending && (
                <div className="flex justify-center bg-slate-50 p-6 dark:bg-gray-900">
                  <Button
                    type="submit"
                    className="h-11 w-full min-w-[200px] bg-emerald-600 text-white hover:bg-emerald-700 sm:w-auto"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center"
                      >
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </motion.div>
                    ) : (
                      "Get Report"
                    )}
                  </Button>
                </div>
              )}
            </form>
          </motion.div>
        </Form>
      </div>
    </div>
  );
}
