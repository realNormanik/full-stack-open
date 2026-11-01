import { Card, CardContent } from "@mui/material";
import { MedicalServices, LocalHospital, Work } from "@mui/icons-material";

import { assertNever } from "../../utils";
import { Entry, Diagnosis } from "../../types";

interface EntryDetailsProps {
  entry: Entry;
  diagnoses: Diagnosis[];
};

const EntryDetails = ({ entry, diagnoses }: EntryDetailsProps) => {
  const getDiagnosisName = (code: string): string => {
    const match = diagnoses.find(d => d.code === code);
    return match ? match.name : "";
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <Card variant="outlined" style={{ marginBottom: "1em" }}>
          <CardContent>
            <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <strong>{entry.date}</strong> <MedicalServices />
            </p>
            <p>{entry.description}</p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>
                    {code} {getDiagnosisName(code)}
                  </li>
                ))}
              </ul>
            )}
            <p><em>Discharge:</em> {entry.discharge.date} - {entry.discharge.criteria}</p>
          </CardContent>
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" style={{ marginBottom: "1em" }}>
          <CardContent>
            <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <strong>{entry.date}</strong> <Work /> <strong>{entry.employerName}</strong>
            </p>
            <p>{entry.description}</p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>
                    {code} {getDiagnosisName(code)}
                  </li>
                ))}
              </ul>
            )}
            {entry.sickLeave && (
              <p><em>Sick leave:</em> {entry.sickLeave.startDate} – {entry.sickLeave.endDate}</p>
            )}
          </CardContent>
        </Card>
      );

    case "HealthCheck":
      return (
        <Card variant="outlined" style={{ marginBottom: "1em" }}>
          <CardContent>
            <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <strong>{entry.date}</strong> <LocalHospital /> <strong>Health Check</strong>
            </p>
            <p>{entry.description}</p>
            <p>Rating: {entry.healthCheckRating}</p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>
                    {code} {getDiagnosisName(code)}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      );
  
    default:
      return assertNever(entry);
  };
};

export default EntryDetails;