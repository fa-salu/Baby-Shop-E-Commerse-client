import useFetch from "../../utils/Api";
import { useNavigate, useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const {
    data: user,
    isPending,
    error,
  } = useFetch(`http://localhost:8000/user/${id}`);
  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:8000/user/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
    navigate("/customers");
  };

  if (isPending) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4">Error: {error}</div>;
  if (!user) return <div className="p-4">User not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <div className="border p-4 rounded shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">User: {user.username}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Order List</h2>
          <div className="mb-2">Item: </div>
          <div className="mb-2">Item: </div>
          <div className="mb-2">Item: </div>
        </div>
        <button
          onClick={handleDeleteUser}
          className="px-4 py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-700"
        >
          Delete User
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
