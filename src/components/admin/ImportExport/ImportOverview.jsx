import React from "react";
import { Upload, Download, ArrowRight, RefreshCw, Sliders, Trash2 } from "lucide-react";
import { useApiQuery } from "@/hooks/useApiQuery";

export default function ImportOverview({ onStartImport, onStartExport }) {
  const { data: statsResponse, refetch, isFetching } = useApiQuery({
    queryKey: ["import-stats"],
    url: "stock/import/stats/",
    secure: true,
  });

  const stats = statsResponse?.data || statsResponse || {};
  const recentJobs = stats.recent_jobs || [];

  // Helper to calculate success rate
  const successCount = stats.total_success ?? 0;
  const failedCount = stats.total_failed ?? 0;
  const successRate = (successCount + failedCount) > 0
    ? Math.round((successCount / (successCount + failedCount)) * 100)
    : 100;

  // Helper to format date
  const formatJobDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-GB") + " " + d.toLocaleTimeString("en-GB", { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return dateStr;
    }
  };

  // Helper to get time elapsed for last import
  const getLastImportTime = () => {
    if (recentJobs.length === 0) return "N/A";
    const lastJob = recentJobs[0];
    const dateStr = lastJob.completed_at || lastJob.created_at;
    if (!dateStr) return "N/A";
    try {
      const elapsedMs = Date.now() - new Date(dateStr).getTime();
      const mins = Math.floor(elapsedMs / 60000);
      if (mins < 1) return "Just now";
      if (mins < 60) return `${mins}m ago`;
      const hrs = Math.floor(mins / 60);
      if (hrs < 24) return `${hrs}h ago`;
      return new Date(dateStr).toLocaleDateString("en-GB");
    } catch (e) {
      return "N/A";
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Import Box */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-blue-50 rounded-2xl mb-4">
            <Upload className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">Import Inventory</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">
            Upload CSV, XML, Excel or Vincinia files to bulk add vehicles to your garage.
          </p>
          <button
            onClick={onStartImport}
            className="w-full py-3 bg-slate-900 hover:bg-slate-850 text-white font-semibold rounded-xl transition duration-150 flex items-center justify-center gap-2"
          >
            Start Import <ArrowRight size={16} />
          </button>
        </div>

        {/* Export Box */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition duration-200 flex flex-col justify-between items-center text-center">
          <div className="p-4 bg-emerald-50 rounded-2xl mb-4">
            <Download className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-1">Export Inventory</h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs">
            Generate high-quality feeds to syndicates, publishers, or format listings to any format.
          </p>
          <button
            onClick={onStartExport}
            className="w-full py-3 bg-white hover:bg-gray-50 border border-slate-900 text-slate-900 font-semibold rounded-xl transition duration-150 flex items-center justify-center gap-2"
          >
            Start Export <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start px-2 md:border-r border-gray-150 last:border-0">
          <span className="text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Total Imports</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {stats.total_jobs ?? 0}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start px-2 md:border-r border-gray-150 last:border-0">
          <span className="text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Success Rate</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
            {successRate}%
          </span>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start px-2 md:border-r border-gray-150 last:border-0">
          <span className="text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Last Import</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {getLastImportTime()}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start px-2 last:border-0">
          <span className="text-gray-500 text-[10px] sm:text-xs font-semibold uppercase tracking-wider">Total Ads Created</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {stats.total_success ?? 0}
          </span>
        </div>
      </div>

      {/* Recent Jobs Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-gray-150 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">Recent Jobs</h3>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="text-sm font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1.5 disabled:opacity-50"
          >
            <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
        <div className="overflow-x-auto">
          {recentJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-400 text-sm">No recent import jobs found.</div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase border-b border-gray-150">
                  <th className="py-4 px-3 sm:px-6">Date</th>
                  <th className="py-4 px-3 sm:px-6">Format</th>
                  <th className="py-4 px-3 sm:px-6">Total Rows</th>
                  <th className="py-4 px-3 sm:px-6">Success</th>
                  <th className="py-4 px-3 sm:px-6">Failed</th>
                  <th className="py-4 px-3 sm:px-6">Status</th>
                  {/* <th className="py-4 px-3 sm:px-6 text-center">Actions</th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {recentJobs.map((job) => {
                  let statusBadgeStyle = "bg-gray-50 text-slate-700 border border-gray-100";
                  if (job.status === "completed") {
                    statusBadgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-100";
                  } else if (job.status === "failed") {
                    statusBadgeStyle = "bg-red-50 text-red-700 border border-red-100";
                  } else if (job.status === "pending" || job.status === "importing") {
                    statusBadgeStyle = "bg-amber-50 text-amber-700 border border-amber-100";
                  }

                  return (
                    <tr key={job.id} className="hover:bg-gray-50/70 transition">
                      <td className="py-4 px-3 sm:px-6 font-semibold text-slate-900">
                        {formatJobDate(job.created_at)}
                      </td>
                      <td className="py-4 px-3 sm:px-6 text-gray-600 font-mono text-xs">
                        {job.source_format?.toUpperCase()}
                      </td>
                      <td className="py-4 px-3 sm:px-6 font-medium text-slate-900">
                        {job.total_rows}
                      </td>
                      <td className="py-4 px-3 sm:px-6 text-emerald-600 font-semibold">
                        {job.success_count}
                      </td>
                      <td className="py-4 px-3 sm:px-6 text-red-600 font-semibold">
                        {job.failed_count}
                      </td>
                      <td className="py-4 px-3 sm:px-6">
                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full capitalize ${statusBadgeStyle}`}>
                          {job.status}
                        </span>
                      </td>
                      {/* <td className="py-4 px-3 sm:px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 hover:bg-gray-100 rounded-md text-gray-500 hover:text-slate-900 transition" title="Edit template">
                            <Sliders size={16} />
                          </button>
                          <button className="p-1.5 hover:bg-red-50 rounded-md text-gray-500 hover:text-red-600 transition" title="Delete job">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
