import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Male, Female, Transgender, PersonOutlineRounded } from "@mui/icons-material";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import { Avatar, Box, Stack, Typography } from "@mui/material";

import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";
import { apiBaseUrl } from "../../constants";
import { Patient, Diagnosis, Entry } from "../../types";

const genderIcon = (gender: string) => {
  switch (gender) {
    case "male":
      return <Male />;
    case "female":
      return <Female />;
    default:
      return <Transgender />;
  };
};

const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

const PatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchPatient = async () => {
      const { data } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );
      setPatient(data);
    };

    const fetchDiagnoses = async () => {
      const { data } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses`
      );
      setDiagnoses(data);
    };

    void fetchPatient();
    void fetchDiagnoses();
  }, [id]);

  const handleAddEntry = (entry: Entry) => {
    if (!patient) return;
    setPatient({
      ...patient,
      entries: patient.entries.concat(entry),
    });
  };

  if (!patient) {
    return (
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
        }}
      >
        <CircularProgress size={22} />
        <Typography variant="body1">
          Loading...
        </Typography>
      </Stack>
    );
  };

  return (
    <div>
      {/* Patient information */}
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Avatar
          sx={{
            width: 90,
            height: 90,
            flexShrink: 0,
            bgcolor: "action.selected",
            color: "primary.main",
            fontSize: "2rem",
            fontWeight: 700,
          }}
        >
          {getInitials(patient.name) || <PersonOutlineRounded />}
        </Avatar>

        <Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="h5">
              {patient.name}
            </Typography>
            {genderIcon(patient.gender)}
          </Stack>

          <Typography variant="body2" color="text.secondary">
            SSN: {patient.ssn}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Occupation: {patient.occupation}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Date of birth: {patient.dateOfBirth}
          </Typography>
        </Box>
      </Stack>

      <AddEntryForm
        patientId={patient.id}
        onEntryAdded={handleAddEntry}
      />

      <h3>Entries</h3>

      {patient.entries.length === 0 ? (
        <p>No entries</p>
      ) : (
        <div>
          {patient.entries.map((entry) => (
            <EntryDetails
              key={entry.id}
              entry={entry}
              diagnoses={diagnoses}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientPage;