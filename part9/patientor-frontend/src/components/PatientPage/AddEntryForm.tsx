import { useState, useEffect } from "react";
import axios from "axios";
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  TextField,
  Button,
  OutlinedInput,
  Checkbox,
  ListItemText
} from "@mui/material";

import { Entry, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  patientId: string;
  onEntryAdded: (entry: Entry) => void;
};

const textFieldStyles = {
  mb: 2,
  "& .MuiInputLabel-root": {
    lineHeight: "1.7em"
  },
  "& .MuiInputBase-input": {
    padding: "11px 14px"
  }
};

const AddEntryForm = ({ patientId, onEntryAdded }: Props) => {
  const [type, setType] = useState<"Hospital" | "HealthCheck" | "OccupationalHealthcare">("Hospital");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [allDiagnosis, setAllDiagnosis] = useState<Diagnosis[]>([]);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get<Diagnosis[]>(`${import.meta.env.VITE_API_URL}/api/diagnoses`)
      .then((res) => setAllDiagnosis(res.data))
      .catch(() => setAllDiagnosis([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!date || !description || !specialist) {
      setError("Please fill in required fields: date, description, specialist.");
      return;
    };

    const baseEntry = {
      type,
      date,
      description,
      specialist,
      diagnosisCodes,
    };

    let entryData;

    switch (type) {
      case "Hospital":
        if (!dischargeDate || !dischargeCriteria) {
          setError("Please fill in discharge information.");
          return;
        };
        entryData = {
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;
      case "HealthCheck":
        entryData = {
          ...baseEntry,
          healthCheckRating
        };
        break;
      case "OccupationalHealthcare":
        if (!employerName) {
          setError("Please provide employer name.");
          return;
        };
        entryData = {
          ...baseEntry,
          employerName,
          sickLeave: sickLeaveStart && sickLeaveEnd ? { startDate: sickLeaveStart, endDate: sickLeaveEnd } : undefined
        };
        break;
      default:
        return;
    };

    try {
      const response = await axios.post<Entry>(
        `${import.meta.env.VITE_API_URL}/api/patients/${patientId}/entries`,
        entryData
      );
      onEntryAdded(response.data);
      // Reset
      setDate("");
      setDescription("");
      setSpecialist("");
      setDiagnosisCodes([]);
      setEmployerName("");
      setSickLeaveStart("");
      setSickLeaveEnd("");
      setDischargeDate("");
      setDischargeCriteria("");
      setHealthCheckRating(HealthCheckRating.Healthy);
    } catch (e: unknown) {
      if (axios.isAxiosError(e) && e.response?.data?.error) {
        setError(e.response.data.error);
      } else {
        setError("Something went wrong");
      };
    };
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>Add New Entry</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel id="purpose-label">
            Purpose
          </InputLabel>

          <Select
            label="Purpose"
            value={type}
            sx={textFieldStyles}
            onChange={(e) => setType(e.target.value as typeof type)}
          >
            <MenuItem value="Hospital">Hospital</MenuItem>
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          </Select>
        </FormControl>

        <TextField
          type="date"
          label="Date of birth"
          placeholder="dd/mm/yyyy"
          fullWidth
          value={date}
          sx={{
            ...textFieldStyles,
            "& input::-webkit-datetime-edit": {
              opacity: 0,
            },
            "& input:focus::-webkit-datetime-edit": {
              opacity: 1,
            },
          }}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          sx={textFieldStyles}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          sx={textFieldStyles}
          onChange={(e) => setSpecialist(e.target.value)}
        />

        <FormControl 
          fullWidth 
          sx={{
            "& .MuiInputLabel-root": {
              lineHeight: "1em"
            }
          }}
        >
          <InputLabel id="diagnosis-label">
            Diagnosis Codes
          </InputLabel>

          <Select<string[]>
            multiple
            value={diagnosisCodes}
            sx={textFieldStyles}
            onChange={(e: SelectChangeEvent<typeof diagnosisCodes>) =>
              setDiagnosisCodes(typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value)
            }
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => selected.join(", ")}
          >
            {allDiagnosis.map((diag) => (
              <MenuItem key={diag.code} value={diag.code}>
                <Checkbox checked={diagnosisCodes.indexOf(diag.code) > -1} />
                <ListItemText primary={`${diag.code} - ${diag.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "Hospital" && (
          <>
            <TextField
              type="date"
              label="Discharge Date"
              placeholder="dd/mm/yyyy"
              fullWidth
              value={dischargeDate}
              sx={{
                ...textFieldStyles,
                "& input::-webkit-datetime-edit": {
                  opacity: 0,
                },
                "& input:focus::-webkit-datetime-edit": {
                  opacity: 1,
                },
              }}
              onChange={(e) => setDischargeDate(e.target.value)}
            />
            <TextField
              label="Discharge Criteria"
              fullWidth
              value={dischargeCriteria}
              sx={textFieldStyles}
              onChange={(e) => setDischargeCriteria(e.target.value)}
            />
          </>
        )}

        {type === "HealthCheck" && (
          <FormControl fullWidth>
            <InputLabel id="health-check-label">
              Health Check Rating
            </InputLabel>

            <Select
              label="Health Check Rating"
              value={healthCheckRating.toString()}
              sx={textFieldStyles}
              onChange={(e) => setHealthCheckRating(Number(e.target.value))}
            >
              <MenuItem value={HealthCheckRating.Healthy}>Healthy (0)</MenuItem>
              <MenuItem value={HealthCheckRating.LowRisk}>Low Risk (1)</MenuItem>
              <MenuItem value={HealthCheckRating.HighRisk}>High Risk (2)</MenuItem>
              <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk (3)</MenuItem>
            </Select>
          </FormControl>
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer Name"
              fullWidth
              value={employerName}
              sx={textFieldStyles}
              onChange={(e) => setEmployerName(e.target.value)}
            />
            <TextField
              type="date"
              label="Sick Leave Start"
              placeholder="dd/mm/yyyy"
              fullWidth
              value={sickLeaveStart}
              sx={{
                ...textFieldStyles,
                "& input::-webkit-datetime-edit": {
                  opacity: 0,
                },
                "& input:focus::-webkit-datetime-edit": {
                  opacity: 1,
                },
              }}
              onChange={(e) => setSickLeaveStart(e.target.value)}
            />
            <TextField
              type="date"
              label="Sick Leave End"
              placeholder="dd/mm/yyyy"
              fullWidth
              value={sickLeaveEnd}
              sx={{
                ...textFieldStyles,
                "& input::-webkit-datetime-edit": {
                  opacity: 0,
                },
                "& input:focus::-webkit-datetime-edit": {
                  opacity: 1,
                },
              }}
              onChange={(e) => setSickLeaveEnd(e.target.value)}
            />
          </>
        )}

        <Button 
          type="submit"
          variant="contained"
          color="primary"
          sx={{ 
            width: { xs: "100%", sm: "auto" },
            marginTop: "1rem" }}>
          Add Entry
        </Button>
      </form>
    </div>
  );
};

export default AddEntryForm;