import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import RoleRoute from './components/RoleRoute';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfilePage from './pages/student/StudentProfilePage';
import StudentInvitationsPage from './pages/student/StudentInvitationsPage';
import StudentTasksPage from './pages/student/StudentTasksPage';
import StudentProjectsPage from './pages/student/StudentProjectsPage';
import LeaderDashboard from './pages/leader/LeaderDashboard';
import CreateProjectPage from './pages/leader/CreateProjectPage';
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import ProjectListPage from './pages/projects/ProjectListPage';
import ProjectDetailsPage from './pages/projects/ProjectDetailsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/register" element={<SignupPage />} />

          {/* Protected Role-Based Dashboards & Pages */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['student']}>
                  <StudentDashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/profile"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['student']}>
                  <StudentProfilePage />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/invitations"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['student']}>
                  <StudentInvitationsPage />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/tasks"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['student']}>
                  <StudentTasksPage />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/projects"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['student']}>
                  <StudentProjectsPage />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/leader/dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['leader']}>
                  <LeaderDashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          {/* Leader Project Creation */}
          <Route
            path="/leader/projects/create"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['leader']}>
                  <CreateProjectPage />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/faculty/dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute allowedRoles={['faculty']}>
                  <FacultyDashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          {/* General Project Browsing & Details (Authenticated for all roles) */}
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <ProjectListPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailsPage />
              </ProtectedRoute>
            }
          />

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
