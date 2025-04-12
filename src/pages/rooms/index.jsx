import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms, deleteRoomById } from "../../store/roomSlice"; // Corrected import
import Link from "next/link";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Typography,
  Paper,
} from "@mui/material";

export default function RoomsPage() {
  const dispatch = useDispatch();
  const { rooms, loading } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete this room?")) {
      dispatch(deleteRoomById(id)); // Corrected to use deleteRoomById
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Rooms
      </Typography>
      <Link href="/rooms/create" passHref>
        <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
          Create Room
        </Button>
      </Link>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room Name</TableCell>
                <TableCell>Room Number</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.name}</TableCell>
                  <TableCell>{room.roomNumber}</TableCell>
                  <TableCell>{room.status}</TableCell>
                  <TableCell>{room.description}</TableCell>
                  <TableCell>
                    <Link href={`/rooms/${room._id}`} passHref>
                      <Button variant="outlined" sx={{ marginRight: 1 }}>
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(room._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}
