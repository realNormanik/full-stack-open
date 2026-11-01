import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  AddRounded,
  SearchRounded,
  PeopleAltRounded,
  ArrowForwardIosRounded,
  PersonOutlineRounded,
} from "@mui/icons-material";

import type { Patient, PatientFormValues } from "../../types";

import AddPatientModal from "../AddPatientModal";
import patientService from "../../services/patients";

interface Props {
  patients: Patient[];
  setPatients: React.Dispatch<React.SetStateAction<Patient[]>>;
}

const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

const PatientListPage = ({ patients, setPatients }: Props) => {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string>();

  const openModal = () => {
    setError(undefined);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewPatient = async (values: PatientFormValues) => {
    try {
      const patient = await patientService.create(values);

      setPatients((current) => [...current, patient]);
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data: unknown = e.response?.data;

        if (typeof data === "string") {
          setError(
            data.replace("Something went wrong. Error: ", ""),
          );
        } else if (
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
        ) {
          setError(data.error);
        } else {
          setError("Could not create patient. Please try again.");
        };
      } else {
        setError("An unexpected error occurred.");
      };
    };
  };

  const filteredPatients = useMemo(() => {
    const query = search.trim().toLowerCase();

    return patients.filter((patient) =>
      [
        patient.name,
        patient.occupation,
        patient.gender,
      ].some((value) =>
        value.toLowerCase().includes(query),
      ),
    );
  }, [patients, search]);

  return (
    <Stack spacing={3.5}>
      {/* Page heading */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
      >
        <Box style={{ flex: "1" }}>
          <Stack direction="row" spacing={1.25}>
            <Box
              sx={{
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "primary.contrastText",
              }}
            >
              <PeopleAltRounded />
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 750,
                letterSpacing: "-0.045em",
              }}
            >
              Patients
            </Typography>
          </Stack>

          <Typography
            color="text.secondary"
            sx={{ mt: 1, ml: { xs: 0, sm: 0.25 } }}
          >
            Manage your patient directory and health records.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddRounded />}
          onClick={openModal}
          sx={{
            alignSelf: { xs: "stretch", sm: "center" },
            minHeight: 44,
            px: 2.5,
            borderRadius: 2.5,
            boxShadow: "none",
            fontWeight: 650,
            "&:hover": { boxShadow: "none" },
          }}
        >
          Add patient
        </Button>
      </Stack>

      {/* Directory */}
      <Card
        elevation={0}
        sx={{
          overflow: "hidden",
          border: 1,
          borderColor: "divider",
          borderRadius: 4,
          bgcolor: "background.paper",
        }}
      >
        {/* Search and count */}
        <Box sx={{ p: { xs: "25px 16px", sm: 3 } }}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
          >
            <Box>
              <Typography variant="h6">
                Patient directory
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {search.trim() ? 
                  `${filteredPatients.length} matching ${filteredPatients.length === 1 ? "patient" : "patients"}`
                  : 
                  `${patients.length} ${patients.length === 1 ? "patient" : "patients"} registered`
                }
              </Typography>
            </Box>

            <TextField
              size="small"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search patients..."
              sx={{
                width: { xs: "100%", sm: 300 },
                justifyContent: "center",
                alignItems: { xs: "normal", sm: "center" },
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2.5,
                  bgcolor: "background.default",
                },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRounded
                        fontSize="small"
                        color="action"
                      />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Box>

        <Divider />

        {/* Column headings */}
        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: "minmax(220px, 1.7fr) 1fr 1.4fr auto",
            gap: 2,
            px: 3,
            py: 1.5,
            bgcolor: "action.hover",
          }}
        >
          {["Patient", "Gender", "Occupation", ""].map((heading) => (
            <Typography
              key={heading || "actions"}
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                letterSpacing: "0.07em",
              }}
            >
              {heading}
            </Typography>
          ))}
        </Box>

        {/* Patient rows */}
        {filteredPatients.length > 0 ? (
          <Stack divider={<Divider flexItem />}>
            {filteredPatients.map((patient) => (
              <Box
                key={patient.id}
                component={Link}
                to={`/patients/${patient.id}`}
                sx={{
                  display: "grid",
                  alignItems: "center",
                  gridTemplateColumns: {
                    xs: "minmax(0, 1fr) auto",
                    md: "minmax(220px, 1.7fr) 1fr 1.4fr auto",
                  },
                  gap: { xs: 1.5, md: 2 },
                  px: { xs: 2, sm: 3 },
                  py: 2,
                  color: "text.primary",
                  textDecoration: "none",
                  transition: "background-color 150ms ease",
                  "&:hover": {
                    bgcolor: "action.hover",
                    "& .patient-arrow": {
                      color: "primary.main",
                      transform: "translateX(2px)",
                    },
                  },
                  "&:focus-visible": {
                    outline: "2px solid",
                    outlineColor: "primary.main",
                    outlineOffset: -2,
                  },
                }}
              >
                {/* Name */}
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ minWidth: 0 }}
                >
                  <Avatar
                    sx={{
                      width: 44,
                      height: 44,
                      flexShrink: 0,
                      bgcolor: "action.selected",
                      color: "primary.main",
                      fontSize: "0.9rem",
                      fontWeight: 700,
                    }}
                  >
                    {getInitials(patient.name) || (
                      <PersonOutlineRounded />
                    )}
                  </Avatar>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      noWrap
                      sx={{ lineHeight: 1.5 }}
                    >
                      {patient.name}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Patient profile
                    </Typography>
                  </Box>
                </Stack>

                {/* Mobile: compact metadata */}
                <Box
                  sx={{
                    display: { xs: "flex", md: "none" },
                    flexDirection: "row",
                    gap: 1.5,
                    alignItems: "center"
                  }}
                >
                  <Chip
                    label={patient.gender}
                    size="small"
                    variant="outlined"
                    sx={{ borderRadius: 1.5 }}
                  />

                  <ArrowForwardIosRounded
                    className="patient-arrow"
                    sx={{
                      fontSize: 12,
                      color: "text.disabled",
                      transition: "all 150ms ease",
                    }}
                  />
                </Box>

                {/* Desktop: gender */}
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Chip
                    label={patient.gender}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderRadius: 1.5,
                      fontWeight: 500,
                    }}
                  />
                </Box>

                {/* Desktop: occupation */}
                <Typography
                  variant="body2"
                  color={ patient.occupation ? "text.primary" : "text.secondary" }
                  sx={{
                    display: { xs: "none", md: "block" },
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {patient.occupation || "Not specified"}
                </Typography>

                {/* Desktop: navigation */}
                <ArrowForwardIosRounded
                  className="patient-arrow"
                  sx={{
                    display: { xs: "none", md: "block" },
                    fontSize: 13,
                    color: "text.disabled",
                    transition: "all 150ms ease"
                  }}
                />
              </Box>
            ))}
          </Stack>
        ) : (
          <Stack
            spacing={1.5}
            sx={{ 
              px: 3,
              py: 8, 
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Avatar
              sx={{
                width: 56,
                height: 56,
                bgcolor: "action.hover",
                color: "text.secondary",
              }}
            >
              <SearchRounded />
            </Avatar>

            <Typography variant="h6">
              No patients found
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ maxWidth: 320 }}
            >
              {search.trim() ? "Try another name, gender, or occupation." : "Your directory is empty. Add a patient to get started."}
            </Typography>

            {!search.trim() && (
              <Button
                variant="outlined"
                startIcon={<AddRounded />}
                onClick={openModal}
                sx={{ mt: 1, borderRadius: 2.5 }}
              >
                Add your first patient
              </Button>
            )}
          </Stack>
        )}
      </Card>

      {/* Add patient modal */}
      <AddPatientModal
        modalOpen={modalOpen}
        onSubmit={submitNewPatient}
        error={error}
        onClose={closeModal}
      />
    </Stack>
  );
};

export default PatientListPage;