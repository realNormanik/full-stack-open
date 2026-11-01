import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent, FormControl } from "@mui/material";

import { PatientFormValues, Gender } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: PatientFormValues) => void;
};

interface GenderOption{
  value: Gender;
  label: string;
};

const genderOptions: GenderOption[] = Object.values(Gender).map(v => ({
  value: v, label: v.toString()
}));

const textFieldStyles = {
  mb: 2,
  "& .MuiInputLabel-root": {
    lineHeight: "1.7em"
  },
  "& .MuiInputBase-input": {
    padding: "11px 14px"
  }
};

const AddPatientForm = ({ onCancel, onSubmit }: Props) => {
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [ssn, setSsn] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState(Gender.Other);

  const onGenderChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const gender = Object.values(Gender).find(g => g.toString() === value);
      
      if (gender) {
        setGender(gender);
      };
    };
  };

  const addPatient = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      name,
      occupation,
      ssn,
      dateOfBirth,
      gender
    });
  };

  return (
    <div>
      <form onSubmit={addPatient}>
        <TextField
          label="Name"
          fullWidth 
          value={name}
          sx={textFieldStyles}
          onChange={({ target }) => setName(target.value)}
        />
        <TextField
          label="Social security number"
          fullWidth
          value={ssn}
          sx={textFieldStyles}
          onChange={({ target }) => setSsn(target.value)}
        />
        <TextField
          label="Date of birth"
          placeholder="dd/mm/yyyy"
          fullWidth
          value={dateOfBirth}
          sx={textFieldStyles}
          onChange={({ target }) => setDateOfBirth(target.value)}
        />
        <TextField
          label="Occupation"
          fullWidth
          value={occupation}
          sx={textFieldStyles}
          onChange={({ target }) => setOccupation(target.value)}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="gender-label">
            Gender
          </InputLabel>

          <Select
            labelId="gender-label"
            id="gender"
            value={gender}
            label="Gender"
            onChange={onGenderChange}
            sx={textFieldStyles}
          >
            {genderOptions.map(option => (
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid>
          <Grid>
            <Button
              color="error"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddPatientForm;