import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  updateProjectDetails,
  uploadProjectDocument,
  deleteProjectDocument,
} from "../../api/admin.api";

export default function ProjectEditorModal({
  open,
  project,
  onClose,
  onUpdated,
}) {
  const [details, setDetails] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
const [deletingId, setDeletingId] = useState(null);


  /* ================= TIPTAP EDITOR ================= */
  const editor = useEditor({
    extensions: [StarterKit],
    content: project?.projectDetails || "",
    onUpdate: ({ editor }) => {
      setDetails(editor.getHTML());
    },
  });

  /* ================= INIT ================= */
  useEffect(() => {
    if (project && editor) {
      editor.commands.setContent(project.projectDetails || "");
      setDetails(project.projectDetails || "");
    }
  }, [project, editor]);

  if (!open || !project) return null;

  /* ================= SAVE DETAILS ================= */
  const handleSaveDetails = async () => {
  try {
    setSaving(true);
    await updateProjectDetails(project._id, {
      projectDetails: details,
    });

    Swal.fire("Saved", "Project details updated", "success");
    onUpdated();
   
    onClose();
  } catch {
    Swal.fire("Error", "Failed to save project details", "error");
  } finally {
    setSaving(false);
  }
};


  /* ================= UPLOAD DOCUMENT ================= */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("document", file);

    try {
      setUploading(true);
      await uploadProjectDocument(project._id, formData);

      Swal.fire("Uploaded", "Document uploaded successfully", "success");
      onUpdated();
      onClose();
    } catch (err) {
      Swal.fire("Error", "Document upload failed", "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  /* ================= DELETE DOCUMENT ================= */
  const handleDelete = async (docId) => {
  const res = await Swal.fire({
    title: "Delete document?",
    text: "This action cannot be undone",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    confirmButtonText: "Delete",
  });

  if (!res.isConfirmed) return;

  try {
    setDeletingId(docId);
    await deleteProjectDocument(project._id, docId);
    Swal.fire("Deleted", "Document removed", "success");
    onUpdated();
    onClose();
  } catch {
    Swal.fire("Error", "Failed to delete document", "error");
  } finally {
    setDeletingId(null);
  }
};


  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
    {/* BACKDROP */}
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => !saving && onClose()}
    />

    {/* MODAL */}
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative bg-white w-full max-w-5xl rounded-2xl shadow-xl z-10 overflow-hidden flex flex-col"
    >
      {/* ================= HEADER ================= */}
      <div className="px-6 py-4 border-b flex justify-between items-center bg-white">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Project Editor — {project.projectId}
          </h2>
          <p className="text-xs text-gray-400">
            Manage project details & documents
          </p>
        </div>

        <button
          onClick={onClose}
          disabled={saving}
          className="px-3 py-1.5 text-xs rounded-lg bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
        >
          Close
        </button>
      </div>

      {/* ================= BODY ================= */}
      <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
        {/* CLIENT DESCRIPTION */}
        <div className="bg-slate-50 border rounded-xl p-4">
          <h4 className="text-sm font-semibold mb-1 text-slate-700">
            Client Project Description
          </h4>
          <div className="text-sm text-gray-700 whitespace-pre-line">
            {project.clientProjectDescription || "—"}
          </div>
        </div>

        {/* PROJECT DETAILS */}
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h4 className="text-sm font-semibold text-slate-700">
            Project Details (Admin Editable)
          </h4>

          <div className="border rounded-lg overflow-hidden">
            <EditorContent
              editor={editor}
              className="min-h-[220px] p-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* DOCUMENTS */}
        <div className="bg-white border rounded-xl p-4 space-y-3">
          <h4 className="text-sm font-semibold text-slate-700">
            Project Documents
          </h4>

          <input
            type="file"
            onChange={handleUpload}
            disabled={uploading || saving}
            className="block text-sm
              file:mr-3 file:px-4 file:py-2
              file:rounded-lg file:border-0
              file:bg-indigo-50 file:text-indigo-600
              hover:file:bg-indigo-100
              disabled:opacity-60"
          />

          {uploading && (
            <p className="text-xs text-gray-500">
              Uploading document…
            </p>
          )}

          <ul className="space-y-2">
            {project.projectDocuments?.map((doc) => (
              <li
                key={doc._id}
                className="flex justify-between items-center border rounded-lg px-3 py-2"
              >
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-600 text-sm truncate max-w-[70%]"
                >
                  {doc.name}
                </a>

                <button
                  onClick={() => handleDelete(doc._id)}
                  disabled={deletingId === doc._id || saving}
                  className="text-xs text-red-600 hover:underline disabled:opacity-50"
                >
                  {deletingId === doc._id ? "Deleting…" : "Delete"}
                </button>
              </li>
            ))}

            {(!project.projectDocuments ||
              project.projectDocuments.length === 0) && (
              <p className="text-xs text-gray-400">
                No documents uploaded yet
              </p>
            )}
          </ul>
        </div>
      </div>

      {/* ================= FOOTER (STICKY ACTIONS) ================= */}
      <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={saving}
          className="px-4 py-2 text-sm rounded-lg border hover:bg-slate-50 transition disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          onClick={handleSaveDetails}
          disabled={saving}
          className={`px-5 py-2 text-sm rounded-lg flex items-center gap-2 transition ${
            saving
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {saving && (
            <span className="h-4 w-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin" />
          )}
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
);

}
