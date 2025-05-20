import { FaDoorOpen } from "react-icons/fa";
import { useUserContext } from "@/context/user";

const Logout = () => {
  const { handleLogout } = useUserContext();
  return (
    <FaDoorOpen
      onClick={handleLogout}
      style={{
        border: "1px solid gray",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        padding: "10px",
        display: "flex",
        cursor: "pointer",
        fontSize: "24px",
        color: "red", // Change this to your desired color
      }}
    />
  );
};

export default Logout;
