import { useDispatch } from "react-redux";
import { createNewRoom } from "../../store/roomSlice";
import RoomForm from "../../components/RoomForm";
import { useRouter } from "next/router";

export default function CreateRoom() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    await dispatch(createNewRoom(formData));
    router.push("/rooms");
  };

  return <RoomForm onSubmit={handleSubmit} />;
}
