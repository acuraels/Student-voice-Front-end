import FormPage from './pages/FormPage.jsx';
import StudentForm from './pages/StudentForm.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminUserStat from './pages/AdminUserStat.jsx';
import AdminUserEdit from './pages/AdminUserEdit.jsx';
import AdminReport from './pages/AdminReport.jsx';
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
    </>
  )
}

export default App
