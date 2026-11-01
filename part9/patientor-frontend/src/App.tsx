import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import { Patient } from "./types";
import { apiBaseUrl } from "./constants";
import patientService from "./services/patients";
import PatientPage from "./components/PatientPage";
import PatientListPage from "./components/PatientListPage";
import AppLayout from "./components/AppLayout";
import ThemeModeProvider from "./theme/ThemeModeProvider";
import GlobalStyles from "./theme/GlobalStyles";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const result = await patientService.getAll();
      setPatients(result);
    };

    void fetchPatientList();
  }, []);

  return (
    <ThemeModeProvider>
      <GlobalStyles />
      <Router>
        <AppLayout>
          <Routes>
            <Route
              path="/"
              element={
                <PatientListPage
                  patients={patients}
                  setPatients={setPatients}
                />
              }
            />
            <Route
              path="/patients/:id"
              element={<PatientPage />}
            />
          </Routes>
        </AppLayout>
      </Router>
    </ThemeModeProvider>
  );
};

export default App;