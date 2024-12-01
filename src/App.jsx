import FormPage from './pages/FormPage.jsx';
import StudentForm from './pages/StudentForm.jsx';
import AdminUsers from './pages/AdminPages/AdminUsers.jsx';
import AdminUserStat from './pages/AdminPages/AdminUserStat.jsx';
import AdminUserCreate from './pages/AdminPages/AdminUserCreate.jsx';
import AdminUserEdit from './pages/AdminPages/AdminUserEdit.jsx';
import AdminReport from './pages/AdminPages/AdminReport.jsx';
import AdminSettings from './pages/AdminPages/AdminSettings.jsx';
import TeacherLessons from './pages/TeacherPages/TeacherLessons.jsx';
import TeacherLessonCreate from './pages/TeacherPages/TeacherLessonCreate.jsx';
import TeacherLessonStat from './pages/TeacherPages/TeacherLessonStat.jsx';
import TeacherLessonEdit from './pages/TeacherPages/TeacherLessonEdit.jsx';
import TeacherDisciplines from './pages/TeacherPages/TeacherDisciplines.jsx';
import TeacherDisciplineStat from './pages/TeacherPages/TeacherDisciplineStat.jsx';
import TeacherDisciplineCreate from './pages/TeacherPages/TeacherDisciplineCreate.jsx';
import TeacherSettings from './pages/TeacherPages/TeacherSettings.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Logout from './components/Logout.jsx';
import Unauthorized from './components/Unauthorized.jsx';
import NotFound from './components/NotFound.jsx';
import FormIsDone from './components/FormIsDone.jsx';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/app.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin-users" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUsers />
          </ProtectedRoute>
        } />
        <Route path="/admin-user-stat/:id" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUserStat />
          </ProtectedRoute>
        } />
        <Route path="/admin-user-create/" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUserCreate />
          </ProtectedRoute>
        } />
        <Route path="/admin-user-edit/:id" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminUserEdit />
          </ProtectedRoute>
        } />
        <Route path="/admin-report" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminReport />
          </ProtectedRoute>
        } />
        <Route path="/admin-settings" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminSettings />
          </ProtectedRoute>
        } />





        <Route path="/teacher-lessons" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherLessons />
          </ProtectedRoute>
        } />
        <Route path="/teacher-lesson-create" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherLessonCreate />
          </ProtectedRoute>
        } />
        <Route path="/teacher-lesson-stat/:unique_code" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherLessonStat />
          </ProtectedRoute>
        } />
        <Route path="/teacher-lesson-edit/:unique_code" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherLessonEdit />
          </ProtectedRoute>
        } />
        <Route path="/teacher-disciplines" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDisciplines />
          </ProtectedRoute>
        } />
        <Route path="/teacher-discipline-stat" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDisciplineStat />
          </ProtectedRoute>
        } />
        <Route path="/teacher-discipline-create" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDisciplineCreate />
          </ProtectedRoute>
        } />
        <Route path="/teacher-settings" element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherSettings />
          </ProtectedRoute>
        } />




        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<FormPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/form/:unique_code/feedback" element={<StudentForm />} />
        <Route path="/form-completed" element={<FormIsDone />} />
      </Routes>
    </BrowserRouter>
  );
}
// /api/lessons/code/:unique_code/feedback/
export default App;
