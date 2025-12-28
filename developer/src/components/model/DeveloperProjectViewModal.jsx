import { useState } from "react";
import { previewProjectPdf } from "../../api/developer.api";

export default function DeveloperProjectViewModal({ open, project, onClose }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  if (!open || !project) return null;

  const {
    projectTitle,
    projectId,
    clientProjectDescription,
    projectDetails,
    projectDocuments = [],
  } = project;

  const handlePreview = async (doc) => {
    try {
      setPreviewLoading(true);

      const res = await previewProjectPdf(project._id, doc._id);

      // ✅ Validate response
      const contentType = res.headers["content-type"];
      if (!contentType || !contentType.includes("application/pdf")) {
        console.error("Invalid content-type:", contentType);
        throw new Error("Response is not a PDF");
      }

      // ✅ Create PDF Blob CORRECTLY
      const pdfBlob = new Blob([res.data], {
        type: "application/pdf",
      });

      const url = URL.createObjectURL(pdfBlob);
      setPreviewUrl(url);
    } catch (err) {
      console.error("PDF PREVIEW ERROR:", err);
      alert("Failed to load PDF document");
    } finally {
      setPreviewLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* BACKDROP */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* MODAL */}
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-xl z-10 overflow-hidden">
        {/* HEADER */}
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              {projectTitle || "Project"}
            </h2>
            <p className="text-xs text-gray-400">{projectId || "—"}</p>
          </div>

          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* CLIENT DESCRIPTION */}
          <div>
            <h4 className="text-sm font-semibold mb-1">
              Client Project Description
            </h4>
            <div className="p-3 bg-slate-50 rounded text-sm text-gray-700 whitespace-pre-line">
              {clientProjectDescription || "No client description provided."}
            </div>
          </div>

          {/* PROJECT DETAILS */}
          <div>
            <h4 className="text-sm font-semibold mb-1">Project Details</h4>

            <div
              className="prose prose-sm max-w-none bg-white border rounded p-3 text-sm"
              dangerouslySetInnerHTML={{
                __html:
                  projectDetails || "<p>No project details added yet.</p>",
              }}
            />
          </div>

          {/* DOCUMENTS */}
          {/* DOCUMENTS */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Project Documents</h4>

            {projectDocuments.length > 0 ? (
              <ul className="space-y-2">
                {projectDocuments.map((doc) => {
                  const fileExt = doc.fileType?.toUpperCase() || "FILE";

                  return (
                    <li
                      key={doc._id}
                      className="flex items-center justify-between gap-3 border rounded-lg p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">
                          {doc.name}
                        </p>
                        <p className="text-[11px] text-gray-400">
                          {fileExt} • {(doc.size / 1024).toFixed(1)} KB
                        </p>
                      </div>

                      <div className="flex gap-3 shrink-0">
                        {/* VIEW */}
                        <button
                          onClick={() => handlePreview(doc)}
                          className="text-xs text-indigo-600 hover:underline"
                        >
                          View
                        </button>

                        {/* DOWNLOAD */}
                        <a
                          href={`/api/projects/${project._id}/documents/${doc._id}/download?download=1`}
                          className="text-indigo-600 text-xs"
                        >
                          Download
                        </a>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-xs text-gray-400">No documents uploaded.</p>
            )}
          </div>
        </div>
      </div>
      {previewUrl && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center">
          <div className="bg-white w-full max-w-5xl h-[85vh] rounded-xl overflow-hidden relative">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <h3 className="text-sm font-semibold">PDF Preview</h3>
              <button
                onClick={() => {
                  URL.revokeObjectURL(previewUrl);
                  setPreviewUrl(null);
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            {/* Body */}
            <div className="h-full">
              {previewLoading ? (
                <div className="flex items-center justify-center h-full text-sm text-gray-500">
                  Loading PDF...
                </div>
              ) : (
                <iframe
                  src={previewUrl}
                  title="PDF Preview"
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
