import { useEffect, useState } from "react";
import {
  fetchAllRequests,
  fetchDevelopers,
  fetchAllProjects,
} from "../../api/admin.api";

import StatCard from "../../components/ui/StatCard";
import RequestsStatusChart from "../../components/dashboard/RequestsStatusChart";
import ServiceTypeChart from "../../components/dashboard/ServiceTypeChart";
import RecentRequests from "../../components/dashboard/RecentRequests";
import Notifications from "../../components/dashboard/Notifications";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [requests, setRequests] = useState([]);
  const [projects, setProjects] = useState([]);

  const [stats, setStats] = useState({
    totalRequests: 0,
    pendingRequests: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalDevelopers: 0,
  });

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        /* ================= REQUESTS ================= */
        const reqRes = await fetchAllRequests();
        const reqData = reqRes.data.requests || [];
        setRequests(reqData);

        const totalRequests = reqData.length;
        const pendingRequests = reqData.filter(
          (r) => r.requestStatus === "NEW"
        ).length;

        /* ================= PROJECTS ================= */
        let projectData = [];
        try {
          const projRes = await fetchAllProjects();
          projectData = projRes.data.projects || [];
          setProjects(projectData);
        } catch {
          projectData = [];
        }

        const activeProjects = projectData.filter(
          (p) => p.projectStatus === "IN_PROGRESS"
        ).length;

        const completedProjects = projectData.filter(
          (p) => p.projectStatus === "COMPLETED"
        ).length;

        /* ================= DEVELOPERS ================= */
        let totalDevelopers = 0;
        try {
          const devRes = await fetchDevelopers();
          totalDevelopers = devRes.data.developers?.length || 0;
        } catch {
          totalDevelopers = 0;
        }

        setStats({
          totalRequests,
          pendingRequests,
          activeProjects,
          completedProjects,
          totalDevelopers,
        });
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  /* ================= CHART DATA ================= */

  const projectStatusChartData = [
    {
      name: "Assigned",
      value: projects.filter((p) => p.projectStatus === "ASSIGNED").length,
    },
    {
      name: "In Progress",
      value: projects.filter((p) => p.projectStatus === "IN_PROGRESS").length,
    },
    {
      name: "Completed",
      value: projects.filter((p) => p.projectStatus === "COMPLETED").length,
    },
    {
      name: "Rejected",
      value: projects.filter((p) => p.projectStatus === "REJECTED").length,
    },
  ];

  const serviceMap = {};
  requests.forEach((r) => {
    serviceMap[r.serviceType] = (serviceMap[r.serviceType] || 0) + 1;
  });

  const serviceChartData = Object.keys(serviceMap).map((key) => ({
    name: key.replace("_", " "),
    value: serviceMap[key],
  }));

  const notifications = requests
    .slice(0, 5)
    .map((r) => `New ${r.serviceType.replace("_", " ")} request received`);

  if (loading) {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header */}
      <div className="h-6 w-40 bg-gray-200 rounded" />

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-24 bg-gray-200 rounded-xl" />
        <div className="h-24 bg-gray-200 rounded-xl" />
        <div className="h-24 bg-gray-200 rounded-xl" />
      </div>

      {/* Chart / table */}
      <div className="h-64 bg-gray-200 rounded-xl" />
    </div>
  );
}


  return (
    <div className="p-4 sm:p-6 space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Requests"
          value={stats.totalRequests}
          color="blue"
        />
        <StatCard
          title="Pending Requests"
          value={stats.pendingRequests}
          color="yellow"
        />
        <StatCard
          title="Active Projects"
          value={stats.activeProjects}
          color="purple"
        />
        <StatCard
          title="Completed Projects"
          value={stats.completedProjects}
          color="green"
        />
        <StatCard
          title="Total Developers"
          value={stats.totalDevelopers}
          color="gray"
        />
      </div>

      {/* ================= CHARTS + NOTIFICATIONS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <RequestsStatusChart data={projectStatusChartData} />

          <ServiceTypeChart data={serviceChartData} />
        </div>

        <Notifications notifications={notifications} />
      </div>

      {/* ================= RECENT REQUESTS ================= */}
      <RecentRequests requests={requests.slice(0, 5)} />
    </div>
  );
}
