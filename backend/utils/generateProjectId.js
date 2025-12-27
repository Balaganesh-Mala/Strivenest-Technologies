import Project from "../models/project.model.js";

export const generateProjectId = async () => {
  const lastProject = await Project.findOne({})
    .sort({ createdAt: -1 })
    .select("projectId");

  let nextNumber = 1;

  if (lastProject?.projectId) {
    const parts = lastProject.projectId.split("-");
    nextNumber = parseInt(parts[2]) + 1;
  }

  return `PRJ-${new Date().getFullYear()}-${String(nextNumber).padStart(3, "0")}`;
};
