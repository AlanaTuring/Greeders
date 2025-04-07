import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("role", role);
    navigate(role === "student" ? "/home" : "/organizer");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-2xl font-bold mb-4">Are you a Student or Organizer?</h1>
      <button onClick={() => handleRoleSelect("student")} className="bg-blue-500 text-white px-4 py-2 rounded">Student</button>
      <button onClick={() => handleRoleSelect("organizer")} className="bg-green-500 text-white px-4 py-2 rounded">Organizer</button>
    </div>
  );
}

export default RoleSelection;
