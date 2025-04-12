import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { motion } from "framer-motion";

export default function RoomForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    status: "available", // Default status
    description: "",
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Create/Edit Room</h2>
      <TextField
        label="Room Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <TextField
        label="Room Number"
        name="roomNumber"
        value={formData.roomNumber}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
      />
      <FormControl fullWidth required margin="normal">
        <InputLabel>Status</InputLabel>
        <Select name="status" value={formData.status} onChange={handleChange}>
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="booked">Booked</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        margin="normal"
        multiline
        rows={4}
      />
      <Button variant="contained" type="submit" fullWidth>
        Submit
      </Button>
    </motion.form>
  );
}
