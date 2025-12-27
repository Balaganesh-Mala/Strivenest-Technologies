import { useEffect, useState } from "react";
import { fetchMyProjects } from "../../api/developer.api";
import { useDeveloperAuth } from "../../context/DeveloperAuthContext";

import StatsCard from "../../components/dashboard/StatsCard";
import ActiveProjectsTable from "../../components/dashboard/ActiveProjectsTable";
import TaskTimeline from "../../components/dashboard/TaskTimeline";
import RecentActivity from "../../components/dashboard/RecentActivity";

export default function Dashboard() {
  const { developer } = useDeveloperAuth();
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const res = await fetchMyProjects();
      const data = res.data.projects || [];

      setProjects(data);

      setStats({
        total: data.length,
        inProgress: data.filter(
          (p) => p.projectStatus === "IN_PROGRESS"
        ).length,
        completed: data.filter(
          (p) => p.projectStatus === "COMPLETED"
        ).length,
      });
    } catch (err) {
      console.error("Dashboard load failed", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= LOADING SKELETON ================= */
  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-6">
        <div className="h-7 w-60 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 bg-gray-100 rounded-2xl animate-pulse"
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Welcome back,{" "}
          <span className="text-indigo-600">
            {developer?.fullName}
          </span>
        </h1>

        <p className="text-xs text-gray-400">
          Overview of your current work
        </p>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard title="Total Projects" value={stats.total} />
        <StatsCard title="In Progress" value={stats.inProgress} />
        <StatsCard title="Completed" value={stats.completed} />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <TaskTimeline projects={projects} />
          <ActiveProjectsTable projects={projects} />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <RecentActivity projects={projects} />
        </div>
      </div>
    </div>
  );
}
