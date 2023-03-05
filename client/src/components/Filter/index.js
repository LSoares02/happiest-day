import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function BasicSelect({ category, setCategory }) {
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const selectTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#e2bb88",
      },
      secondary: {
        main: "#faebd7",
      },
    },
  });

  return (
    <Box>
      <ThemeProvider theme={selectTheme}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Categoria</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            value={category}
            label="Categoria"
            onChange={handleChange}
          >
            <MenuItem value={"all"}>Todas</MenuItem>
            <MenuItem value={"kitchen"}>Cozinha</MenuItem>
            <MenuItem value={"dinner"}>Jantar</MenuItem>
            <MenuItem value={"bedroom"}>Quarto</MenuItem>
            <MenuItem value={"appliances"}>Aparelhos Domésticos</MenuItem>
          </Select>
        </FormControl>
      </ThemeProvider>
    </Box>
  );
}
