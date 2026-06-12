import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useNavigate } from "react-router-dom";
import {
  Download,
  FileText,
  FileArchive,
  AlertTriangle,
  Trash2,
  ShieldAlert,
  Loader,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  showLoadingToast,
  updateToastError,
  updateToastSuccess,
} from "@/lib/utils";

/* ── Export Data Section ── */
const ExportDataSection = () => {
  const [exportFormat, setExportFormat] = useState("pdf");
  const [isExporting, setIsExporting] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await axiosSecure.get(
        `/account/export-data/`,
        {
          params: { export_format: exportFormat },
          responseType: "blob",
        },
      );

      // Create a blob URL and trigger download
      const blob = new Blob([response.data], {
        type:
          exportFormat === "pdf"
            ? "application/pdf"
            : "application/zip",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `account-export.${exportFormat}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      const toastId = showLoadingToast("Exporting...");
      updateToastSuccess(toastId, "Data exported successfully!");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to export data";
      const toastId = showLoadingToast("Exporting...");
      updateToastError(toastId, message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-gray-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-50 rounded-xl flex-shrink-0">
            <Download className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Export My Data
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Download a copy of all your personal data, ads, messages, and
              account information stored on RONPOIN.
            </p>
          </div>
        </div>
      </div>

      {/* Format Selector */}
      <div className="p-5 sm:p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* PDF Option */}
          <label
            className={`relative flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              exportFormat === "pdf"
                ? "border-blue-500 bg-blue-50/50 shadow-sm"
                : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
            }`}
          >
            <input
              type="radio"
              name="exportFormat"
              value="pdf"
              checked={exportFormat === "pdf"}
              onChange={(e) => setExportFormat(e.target.value)}
              className="sr-only"
            />
            <div
              className={`p-2.5 rounded-lg ${
                exportFormat === "pdf"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">PDF Format</p>
              <p className="text-xs text-gray-500 mt-0.5">
                Best for reading & printing
              </p>
            </div>
            {exportFormat === "pdf" && (
              <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
            )}
          </label>

          {/* ZIP Option */}
          <label
            className={`relative flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
              exportFormat === "zip"
                ? "border-purple-500 bg-purple-50/50 shadow-sm"
                : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
            }`}
          >
            <input
              type="radio"
              name="exportFormat"
              value="zip"
              checked={exportFormat === "zip"}
              onChange={(e) => setExportFormat(e.target.value)}
              className="sr-only"
            />
            <div
              className={`p-2.5 rounded-lg ${
                exportFormat === "zip"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              <FileArchive className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">ZIP Archive</p>
              <p className="text-xs text-gray-500 mt-0.5">
                All data in a single archive
              </p>
            </div>
            {exportFormat === "zip" && (
              <CheckCircle2 className="w-5 h-5 text-purple-600 flex-shrink-0" />
            )}
          </label>
        </div>

        {/* Download Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-semibold shadow-md shadow-blue-200 hover:shadow-lg transition-all"
          >
            {isExporting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download as {exportFormat.toUpperCase()}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ── Delete Account Section ── */
const DeleteAccountSection = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { mutate: deleteAccount, isPending: isDeleting } = useApiMutation({
    url: "/account/delete/",
    method: "DELETE",
    secure: true,
    onSuccess: () => {
      logout();
      navigate("/");
    },
  });

  const handleDelete = () => {
    Swal.fire({
      title: "Are you absolutely sure?",
      text: "This action cannot be undone. This will permanently delete your account and remove all your data from our servers.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete my account",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve) => {
          deleteAccount(undefined, {
            onSuccess: () => resolve(),
            onError: () => resolve(),
          });
        });
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-red-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-50 rounded-xl flex-shrink-0">
            <ShieldAlert className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              Delete Account
            </h3>
            <p className="text-sm text-gray-500 mt-1 leading-relaxed">
              Permanently delete your account and all associated data. This
              action cannot be undone — please proceed with caution.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* Warning Box */}
        <div className="flex items-start gap-3 p-4 bg-red-50/80 border border-red-100 rounded-xl">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-red-700 leading-relaxed">
            <p className="font-semibold mb-1">What happens when you delete your account?</p>
            <ul className="list-disc list-inside space-y-1 text-red-600/90">
              <li>All your active listings will be removed</li>
              <li>Your messages and conversations will be deleted</li>
              <li>Any active subscriptions will be cancelled</li>
              <li>Your profile and account data will be permanently erased</li>
            </ul>
          </div>
        </div>

        {/* Delete Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-2.5 rounded-xl font-semibold shadow-md shadow-red-200 hover:shadow-lg transition-all"
          >
            {isDeleting ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete My Account
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ── Main DangerZone Component ── */
const DangerZone = () => {
  return (
    <div className="space-y-8">
      <ExportDataSection />
      <DeleteAccountSection />
    </div>
  );
};

export default DangerZone;
