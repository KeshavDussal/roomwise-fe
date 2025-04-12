import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { updateExistingRoom } from "../../store/roomSlice";
import { useDispatch } from "react-redux";
import RoomForm from "../../components/RoomForm";
import { fetchRoomById } from "../../services/roomService";

export default function EditRoom() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (router.isReady && id) {
      fetchRoomById(id)
        .then((data) => {
          console.log("My Fetched room:", data); // ✅ Check what's coming
          setInitialData(data);
        })
        .catch((err) => console.error("Failed to fetch room:", err));
    }
  }, [router.isReady, id]);

  const handleSubmit = async (formData) => {
    await dispatch(updateExistingRoom({ id, data: formData }));
    router.push("/rooms");
  };

  if (!initialData) return <p>Loading...</p>;

  return <RoomForm onSubmit={handleSubmit} initialData={initialData} />;
}
