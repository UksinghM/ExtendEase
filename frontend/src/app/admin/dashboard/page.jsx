'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [pendingPublishers, setPendingPublishers] = useState([]);

  useEffect(() => {
    let mounted = true;

    axios
      .get('http://localhost:5000/publisher/pending')
      .then((res) => {
        if (!mounted) return;
        setPendingPublishers(res.data || []);
      })
      .catch(() => {
        if (!mounted) return;
        setPendingPublishers([]);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminUser');
    router.push('/admin-login');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND (SAFE LAYER) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 animate-gradient-bg"></div>
      <div className="absolute inset-0 -z-10 bg-black/20"></div>

      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-gray-600">
                Welcome, Admin
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition shadow-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

          <StatCard
            href="/admin/pending-Publishers"
            title="Total Users"
            value="1,234"
            color="blue"
          />

          <StatCard
            href="/admin/pending-Publishers"
            title="Active Extensions"
            value="567"
            color="green"
          />

          <StatCard
            href="/admin/pending-Publishers"
            title="Pending Publisher Registrations"
            value={pendingPublishers.length}
            color="orange"
          />

        </div>

        {/* NAVIGATION */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg mb-10">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Navigation
            </h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5">

            <NavCard
              href="/browse-extensions"
              title="Browse Extensions"
              desc="Manage and review extensions"
              color="blue"
              external
            />

            <NavCard
              href="/admin/manage-extensions"
              title="Add Extension"
              desc="Create new extension"
              color="green"
            />

            <NavCard
              href="/admin/pending-Publishers"
              title="Review Pending Publishers"
              desc="Approve publisher registrations"
              color="orange"
            />

          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Activity
            </h2>
          </div>

          <div className="p-6 space-y-4">
            <Activity text='Extension "Weather Widget" approved' time="2 hours ago" color="green" />
            <Activity text='User "john.doe@example.com" registered' time="4 hours ago" color="blue" />
            <Activity text='Extension "Task Manager" needs review' time="6 hours ago" color="yellow" />
          </div>
        </div>

      </main>

      {/* ANIMATION */}
      <style jsx>{`
        @keyframes gradient-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-bg {
          background-size: 300% 300%;
          animation: gradient-bg 18s ease infinite;
        }
      `}</style>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ href, title, value, color }) {
  return (
    <Link
      href={href}
      className="bg-white/95 rounded-xl shadow-lg p-6 hover:-translate-y-1 hover:shadow-2xl transition-all"
    >
      <p className="text-sm font-semibold text-gray-500">{title}</p>
      <p className={`text-3xl font-bold text-${color}-600 mt-2`}>
        {value}
      </p>
    </Link>
  );
}

function NavCard({ href, title, desc, color, external }) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className="p-5 bg-gray-50 hover:bg-white rounded-lg shadow-sm hover:shadow-md transition"
    >
      <h3 className={`font-semibold text-${color}-600`}>
        {title}
      </h3>
      <p className="text-sm text-gray-500 mt-1">
        {desc}
      </p>
    </Link>
  );
}

function Activity({ text, time, color }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`w-2.5 h-2.5 rounded-full bg-${color}-500`} />
      <span className="text-sm text-gray-600 flex-1">{text}</span>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}
