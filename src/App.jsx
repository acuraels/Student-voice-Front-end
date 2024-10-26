import FormPage from './pages/FormPage.jsx';
import StudentForm from './pages/StudentForm.jsx';
import AdminUsers from './pages/AdminPages/AdminUsers.jsx';
import AdminUserStat from './pages/AdminPages/AdminUserStat.jsx';
import AdminUserEdit from './pages/AdminPages/AdminUserEdit.jsx';
import AdminReport from './pages/AdminPages/AdminReport.jsx';
import AdminSettings from './pages/AdminPages/AdminSettings.jsx';
import TeacherLessons from './pages/TeacherPages/TeacherLessons.jsx';
import './styles/app.css';

function App() {

  return (
    <>
      <FormPage />
      <StudentForm />
      <AdminUsers />
      <AdminUserStat />
      <AdminUserEdit />
      <AdminReport />
      <AdminSettings />
      <TeacherLessons />
    </>
  )
}

export default App
