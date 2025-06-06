import { ArrowRight } from "lucide-react";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import TrainingCarousel from "./TrainingCarousel";

export default function CommunityTraining() {
  return (
    <div className="border overflow-y-auto dark:text-white mb-6">
      <div className="flex items-center justify-between py-2 px-3 border-b font-semibold text-slate-50 bg-black dark:bg-slate-900  overflow-y-auto">
        <h2 className="dark:text-slate-300 text-lg capitalize">
          Capacitaciones
        </h2>
        <Link
          href={"#"}
          className="px-2 py-2 rounded text-xs text-slate-50 flex items-center gap-1 bg-lime-700 hover:bg-lime-600 focus:outline-none focus:ring-lime-600 transition-all duration-300"
        >
          Ver todo <ArrowRight width={18} height={18} />
        </Link>
      </div>
      <div className="pb-4 px-2  dark:bg-slate-700 ">
        <TrainingCarousel />
      </div>
    </div>
  );
}
