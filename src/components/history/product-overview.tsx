import { CosmeticReport, FoodReport } from "@/types";
  import React, { ChangeEvent, useState } from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp, CircleCheckBig, PenLine, PenLineIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useGetSingleReportQuery } from "@/hooks/react-query";
import Loading from "@/components/common/Loading";
import Food from "./Food";
import Cosmetic from "./Cosmetic";
interface Props {
  report: FoodReport | CosmeticReport;
  id: string;
}

// export default function ProductOverview({ report, id }: Props) {
//   const [close, setClose] = useState<boolean>(false);
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: report.title ?? "",
//     type: report.type ?? "",
//     description: report.title ?? "",
//   });
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData((p) => ({ ...p, [e.target.id]: e.target.value }));
//   };
//   return (
//     <div className="sm:p-2 md:p-4">
//       <Card className="flex flex-col items-center justify-center rounded-2xl shadow-2xl">
//         <CardHeader className="w-full">
//           <CardTitle className="flex items-center justify-between text-3xl">
//             <div className="flex-1 self-end md:text-center">Product overview</div>
//             {close ? (
//               <ChevronDown onClick={() => setClose((p) => !p)} />
//             ) : (
//               <ChevronUp onClick={() => setClose((p) => !p)} />
//             )}{" "}
//           </CardTitle>
//           {/* <CardDescription>Card Description</CardDescription> */}
//         </CardHeader>
//         {!close && (
//           <>
//             <CardContent className="flex w-full flex-col space-y-2.5 p-1 sm:flex-row sm:p-2 md:p-4">
//               <form className="flex-2/3 space-y-4 p-1 sm:p-2 md:p-4">
//                 <div className="flex flex-col gap-2 sm:flex-row">
//                   <Label htmlFor="name" className="min-w-20 sm:justify-end">
//                     Name:
//                   </Label>
//                   <div className="relative flex w-full items-center">
//                     <Input
//                       id="name"
//                       placeholder="Name of your project"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="bg-secondary rounded-b-md p-4"
//                     />
//                     <Label htmlFor="name">
//                       <PenLineIcon className="right-2 hidden sm:absolute" />
//                     </Label>
//                   </div>
//                 </div>
//                 <div className="relative flex flex-col gap-2 sm:flex-row">
//                   <Label htmlFor="type" className="min-w-20 sm:justify-end">
//                     Type:
//                   </Label>
//                   <div className="flex w-full items-center">
//                     <Input
//                       id="type"
//                       placeholder="Type of your report"
//                       value={formData.type}
//                       onChange={handleChange}
//                       className="bg-secondary rounded-b-md p-4"
//                     />
//                     <Label htmlFor="type">
//                       <PenLineIcon className="right-2 hidden sm:absolute" />
//                     </Label>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-2 sm:flex-row">
//                   <Label htmlFor="description" className=" ">
//                     Description:
//                   </Label>
//                   <div className="relative flex w-full items-center">
//                     <Input
//                       id="description"
//                       placeholder=" "
//                       value={formData.description}
//                       onChange={handleChange}
//                       className="bg-secondary rounded-b-md p-4"
//                     />
//                     <Label htmlFor="description">
//                       <PenLineIcon className="right-2 hidden sm:absolute" />
//                     </Label>
//                   </div>
//                 </div>
//               </form>
//               <div className="bg-secondary flex flex-1/3 flex-col items-center justify-center space-y-2.5 rounded-3xl p-1 sm:p-2 md:p-4">
//                 <img
//                   src={report.imageUrl}
//                   className="overflow-hidden object-contain"
//                   alt="product preview"
//                 />
//               </div>
//             </CardContent>
//             <CardFooter className="flex-col gap-6">
//               <p>
//                 Ai generated Description with 78%{" "}
//                 <span className="font-bold">confidence level.</span> Please review for accuracy
//                 before proceeding.
//               </p>
//               <div className="flex max-w-lg gap-2 sm:justify-between">
//                 <Button
//                   onClick={() => router.push(`/report/${id}`)}
//                   variant={"default"}
//                   className="bg-blue-500 text-white hover:bg-blue-600"
//                 >
//                   {" "}
//                   Confirm All <CircleCheckBig />{" "}
//                 </Button>
//                 <Button
//                   variant={"outline"}
//                   className="border-blue-500 bg-white p-4 text-blue-500 hover:border-blue-600 hover:bg-white hover:text-blue-600"
//                 >
//                   Enter Manually <PenLine />
//                 </Button>
//               </div>
//             </CardFooter>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// }
export default function ProductOverview({ report, id }: Props) {
  const searchParams = useSearchParams();
    const { data, isError, isLoading } = useGetSingleReportQuery({ id });
    if (isError) {
      return <div>error occur while fetching query</div>;
    }
    if (isLoading) {
      return <Loading />;
    }
    if (data) {
      const type = searchParams.get("type");
      const [message] = data.data.messages.filter(
        (message) => message.role == "assistant" || message.role == "system",
      );
      const temp = message.content.replace(/^```json\n|```$/g, "").trim();
      const report = JSON.parse(temp) ?? null;
  
      return (
        <div className="flex max-w-full flex-col justify-center gap-4 space-y-4 bg-blue-100 p-2 pt-40 sm:p-4 md:p-8 dark:bg-black">
          {type == "food" && <Food report={report} imageUrl={data.data.imageUrl} />}
          {type == "cosmetic" && <Cosmetic report={report} imageUrl={data.data.imageUrl} />}
        </div>
      );
    }
}
