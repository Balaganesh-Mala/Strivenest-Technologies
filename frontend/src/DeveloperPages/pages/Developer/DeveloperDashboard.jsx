import React, { useEffect, useState } from "react";
import DeveloperNavbar from "../../components/Navbar/DeveloperNavbar";
import DeveloperSidebar from "../../components/Sidebar/DeveloperSidebar";
import StatsCard from "../../components/Cards/StatsCard";
import ActiveProjectsTable from "../../components/Table/ActiveProjectsTable";
import TaskTimeline from "../../components/Timeline/TaskTimeline";
import RecentActivity from "../../components/Activity/RecentActivity";
import AnnouncementList from "../../components/Announcements/AnnouncementList";
import API from "../../api/apiClient";

export default function DeveloperDashboard() {
  const [user, setUser] = useState({ name: "Bala Ganesh" });
  const [projects, setProjects] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    inProgress: 0,
    completed: 0,
    announcements: 0,
  });

  useEffect(() => {
    fetchDeveloperData();
  }, []);

  async function fetchDeveloperData() {
    try {
      const me = await API.get("/auth/me");
      setUser(me.data.data);

      const res = await API.get(`/projects/developer/${me.data.data._id}`);
      const data = res.data.data || [];
      const total = data.length;
      const inProgress = data.filter((p) => p.status === "In Progress").length;
      const completed = data.filter((p) => p.status === "Completed").length;
      setStats({ total, inProgress, completed, announcements: 3 });
      setProjects(data);
    } catch (err) {
      console.error("Failed to load developer data:", err);
    }
  }

  return (
    <div className="relative flex min-h-screen bg-gray-50 text-gray-800 overflow-hidden">
      <div className="hidden md:block w-64 bg-white/60 backdrop-blur-lg border-r border-gray-100">
        <DeveloperSidebar />
      </div>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DeveloperSidebar />
      </div>

    
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
        ></div>
      )}

      
      <main className="flex-1 flex flex-col relative z-10">
        <DeveloperNavbar
          user={user}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <div className="px-5 sm:px-8 py-6 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h2 className="text-2xl font-semibold">
              Welcome back, {user.name} 👋
            </h2>
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          
          <div className="flex flex-wrap gap-4">
            <StatsCard
              title="Assigned Projects"
              value={stats.total}
              icon="FaClipboardList"
            />
            <StatsCard
              title="In Progress"
              value={stats.inProgress}
              icon="FaSpinner"
            />
            <StatsCard
              title="Completed"
              value={stats.completed}
              icon="FaCheckCircle"
            />
            <StatsCard
              title="Announcements"
              value={stats.announcements}
              icon="FaBullhorn"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TaskTimeline projects={projects} />
              <ActiveProjectsTable developerId={user._id} />
              
            </div>

            <div className="space-y-6">
              <RecentActivity developerId={user._id} />
              <AnnouncementList />
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
