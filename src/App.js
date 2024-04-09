import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import WeatherPage from "./pages/Weather";
import GinaTestPage from "./pages/GinaTest";
import RecordsPage from "./pages/Records";
import HealthAdvicePage from "./pages/HealthAdvice";
import { AuthProvider } from "./services/AuthService";
import { APIProvider } from "./services/APIService";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPasswordPage from "./pages/ForgotPassword";
import UpdateProfilePage from "./pages/UpdateProfile";
import HealthCareHomePage from "./pages/health-care/home";
import HealthCarePatientsPage from "./pages/health-care/patients";
import HealthCareWeatherPage from './pages/health-care/weather'
import AdminHomePage from "./pages/admin/home";
import HealthCareManagementPage from "./pages/admin/healthcare-management";
import AdminPatientsPage from "./pages/admin/patients";

function App() {
  return (
    <AuthProvider>
      <APIProvider>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <WeatherPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/gina-test"
              element={
                <PrivateRoute>
                  <GinaTestPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/records"
              element={
                <PrivateRoute>
                  <RecordsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/health-advice"
              element={
                <PrivateRoute>
                  <HealthAdvicePage />
                </PrivateRoute>
              }
            />


            {/* Health care */}
            <Route path="/healthcare" element={
              <PrivateRoute role="healthcare">
                <HealthCareHomePage />
              </PrivateRoute>
            } />
            <Route
              exact
              path="/weather"
              element={
                <PrivateRoute role="healthcare">
                  <HealthCareWeatherPage />
                </PrivateRoute>
              }
            />
            <Route path="/patients" element={
              <PrivateRoute role="healthcare">
                <HealthCarePatientsPage />
              </PrivateRoute>
            } />
            {/* Admin */}
            <Route path="/admin" element={
              <PrivateRoute role="admin">
                <AdminHomePage />
              </PrivateRoute>
            } />
            <Route path="/healthcare-management" element={
              <PrivateRoute role="admin">
                <HealthCareManagementPage />
              </PrivateRoute>
            } />
            <Route path="/patients-management" element={
              <PrivateRoute role="admin">
                <AdminPatientsPage />
              </PrivateRoute>
            } />

            {/* Private */}
            <Route
              path="/dashboard"
              element={
                <DashboardPage />
              }
            />
            <Route
              path="/update-profile"
              element={
                <UpdateProfilePage />
              }
            />
            {/* Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          </Routes>
        </Router>
      </APIProvider>
    </AuthProvider>
  );
}

export default App;
