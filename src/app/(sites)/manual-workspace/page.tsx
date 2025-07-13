"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCategory } from "@/context/CategoryContext";
import { useGenerateTextReportMutation} from "@/hooks/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const FormSchema = z.object({
  ingredients: z
    .string()
    .min(1, { message: "At least one ingredient is required." }),
});

export default function UploadForm() {
  const { selectedCategory } = useCategory();
  const category = selectedCategory || "food";
  const router = useRouter();

  const {
    mutate,
    isPending,
    isError,
    error,
    data,
    isSuccess,
  } = useGenerateTextReportMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
  const ingredientsArray = data.ingredients
    .split(",")
    .map((i) => i.trim())
    .filter((i) => i);

  mutate({
    ingredients: ingredientsArray,
    type: category as "food" | "cosmetic",
  });
};


  useEffect(() => {
    if (isSuccess && data?.id) {
      router.push(`/history/${data.id}?type=${category}`);
    }
  }, [isSuccess, data, router, category]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 pt-20 dark:from-black dark:to-gray-900">
      <div className="max-w-xl">
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
                  : "Please enter valid ingredients."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <Form {...form}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-900"
          >
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
              <div className="p-3 sm:p-8">
                {/* Multiple Ingredient Input */}
                <FormField
                  control={form.control}
                  name="ingredients"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="mb-1 block text-center text-lg font-medium text-slate-700 dark:text-blue-300">
                        Ingredients
                      </FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          rows={4}
                          className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-gray-800 dark:text-white"
                          placeholder="e.g. Sugar, Milk, Wheat"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                      {!isPending && (
                        <FormDescription className="mt-2 text-center text-slate-500 dark:text-blue-400">
                          Separate ingredients with commas (e.g. Rice, Oil, Salt)
                        </FormDescription>
                      )}
                    </FormItem>
                  )}
                />

                {/* Product Type */}
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

              {/* Submit Button */}
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
            </form>
          </motion.div>
        </Form>
      </div>
    </div>
  );
}
