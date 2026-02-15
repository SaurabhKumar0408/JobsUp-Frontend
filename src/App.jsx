import {BrowserRouter, Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Layout from './Layout'
import { AuthProvider } from './context/AuthContext'
import Login from './components/auth/Login'
import { ProtectedApplicantRoute, ProtectedRecruiterRoute } from './pages/ProtectedRoutes'
import ApplicantDashboard from './pages/ApplicantDashboard'
import RecruiterDashboard from './pages/RecruiterDashBoard';
import Register from './components/auth/Register'
import RecruiterOutlet from './pages/recruiter/RecruiterOutlet'
import MyJobs from './pages/recruiter/MyJobs'
import CreateJob from './pages/recruiter/CreateJob'
import ApplicantOutlet from './pages/applicant/ApplicantOutlet'
import MyCompanies from './pages/recruiter/MyCompanies'
import CompanyDetail from './pages/recruiter/CompanyDetail'
import ApplicationToJob from './pages/recruiter/ApplicationToJob'
import CreateCompany from './pages/recruiter/CreateCompany'
import JobDetail from './pages/recruiter/JobDetail'
import EditJob from './pages/recruiter/EditJob'
import ApplyJob from './pages/applicant/ApplyJob'
import ApplicationStatus from './pages/applicant/ApplicationStatus'
import ApplicationDetail from './pages/applicant/ApplicationDetail'
import JobListing from './pages/JobListing'
import ViewJobs from './pages/JobDetail'
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        
        <Route  path='' element={<JobListing />}/>
        <Route path='jobs' element={<JobListing />}/>
        <Route path='jobs/:job_id' element={<ViewJobs />} />
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />} />

        <Route path='applicant' element={
          <ProtectedApplicantRoute>
            <ApplicantOutlet/>
          </ProtectedApplicantRoute>
        }>
          <Route path='dashboard' element={<ApplicantDashboard />}/>
          <Route path='applyJob/:job_id' element={<ApplyJob />} />
          <Route path='applications' element={<ApplicationStatus />}/>
          <Route path='applications/:application_id' element={<ApplicationDetail />} />
        </Route>
        
        <Route path='recruiter' element={
          <ProtectedRecruiterRoute>
            <RecruiterOutlet />
          </ProtectedRecruiterRoute>
        }>
          <Route path='dashboard' element={<RecruiterDashboard />}/>
          <Route path='myJobs' element={<MyJobs />} />
          <Route path='myJobs/:company_id' element={<MyJobs />} />
          <Route path='createJob' element={<CreateJob />} />
          <Route path='createJob/:company_id' element={<CreateJob />} />
          <Route path='myCompanies' element={<MyCompanies />} />
          <Route path='createCompany' element={<CreateCompany/>} />
          <Route path='company/:id' element={<CompanyDetail />} />
          <Route path='applications/:job_id' element = {<ApplicationToJob />} />
          <Route path='jobs/:job_id' element={<JobDetail />} />
          <Route path='editJob/:job_id' element={<EditJob />} />

        </Route>


      </Route>
    )
  )

  return (
    <>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
    </>
  )
}

export default App
