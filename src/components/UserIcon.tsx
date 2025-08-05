import { User2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const UserIcon = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("bokirToken");
    router.push("/dashboard/login");
  };

  return (
    <button onClick={handleLogout}>
      <User2Icon />
    </button>
  );
};

export default UserIcon;
