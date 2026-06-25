import React, { useState } from "react";
import { Upload, Download, Database } from "lucide-react";
import { useApiQuery } from "@/hooks/useApiQuery";
import ImportOverview from "./ImportOverview";
import ImportWizard from "./ImportWizard";
import ExportWizard from "./ExportWizard";

export default function ImportExport() {
  const [activeView, setActiveView] = useState("dashboard");

  // Retrieve supported formats
  const { data: formatsData } = useApiQuery({
    queryKey: ["supported-formats"],
    url: "stock/formats/",
    secure: true,
  });

  const importFormats = formatsData?.data?.import_formats || formatsData?.import_formats || [];
  const exportFormats = formatsData?.data?.export_formats || formatsData?.export_formats || [];

  // Local state for recent jobs logging list (updated on imports)
  const [recentJobs, setRecentJobs] = useState([
    { id: 1, date: "08/09/2026", format: "Vincinia", total: 24, success: 12, failed: 0, status: "Completed" },
    { id: 2, date: "08/09/2026", format: "XML", total: 24, success: 9, failed: 0, status: "Completed" },
    { id: 3, date: "08/09/2026", format: "XML", total: 23, success: 5, failed: 0, status: "Completed" },
    { id: 4, date: "08/09/2026", format: "XML", total: 22, success: 3, failed: 0, status: "Completed" },
    { id: 5, date: "08/09/2026", format: "XML", total: 23, success: 6, failed: 0, status: "Completed" },
    { id: 6, date: "08/09/2026", format: "XML", total: 23, success: 5, failed: 0, status: "Completed" },
  ]);

  const handleImportComplete = (newJobData) => {
    const newJob = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-GB"),
      format: newJobData.format,
      total: newJobData.total,
      success: newJobData.success,
      failed: newJobData.failed,
      status: "Completed",
    };
    setRecentJobs((prevJobs) => [newJob, ...prevJobs]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4  text-gray-800">
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-150 pb-5 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Database className="text-custom-primary w-6 h-6 md:w-8 md:h-8" />
            Stock Import & Export
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Easily upload vehicle feeds or export your listings in any structured feed format.
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex w-full md:w-auto overflow-x-auto whitespace-nowrap bg-gray-100 p-1 rounded-xl scrollbar-none">
          <button
            onClick={() => setActiveView("dashboard")}
            className={`flex-1 md:flex-initial px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              activeView === "dashboard"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-gray-600 hover:text-slate-900 hover:bg-gray-50"
            }`}
          >
            Dashboard Overview
          </button>
          <button
            onClick={() => setActiveView("import")}
            className={`flex-1 md:flex-initial px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeView === "import"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-gray-600 hover:text-slate-900 hover:bg-gray-50"
            }`}
          >
            <Upload size={14} /> Import Wizard
          </button>
          <button
            onClick={() => setActiveView("export")}
            className={`flex-1 md:flex-initial px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeView === "export"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-gray-600 hover:text-slate-900 hover:bg-gray-50"
            }`}
          >
            <Download size={14} /> Export Wizard
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE VIEWS */}
      {activeView === "dashboard" && (
        <ImportOverview
          onStartImport={() => setActiveView("import")}
          onStartExport={() => setActiveView("export")}
          recentJobs={recentJobs}
        />
      )}

      {activeView === "import" && (
        <ImportWizard
          onImportComplete={handleImportComplete}
          resetAll={() => setActiveView("dashboard")}
          importFormats={importFormats}
        />
      )}

      {activeView === "export" && (
        <ExportWizard
          resetAll={() => setActiveView("dashboard")}
          exportFormats={exportFormats}
        />
      )}
    </div>
  );
}
