import { useNavigate } from "react-router-dom";
import "./deleteClub.css";
const DeleteClub = ({ onClose }, id) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3005/api/v1/deleteClub?id=${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(id);

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.error) {
        alert(`Error: ${data.error}`);
      } else {
        alert(`${data.deletedCount} document(s) were deleted`);
        navigate("/"); // Redirect after successful deletion
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="delete-main-container">
      <div className="delete-container">
        <div className="top-section">
          <div className="delete-logo">
            <span className="material-symbols-outlined">delete</span>
          </div>
          <div className="data-section">
            <h1 className="heading">delete club</h1>
            <span>
              Are you sure want to delete this Club? This can not be undone
            </span>
          </div>
          <span
            className="material-symbols-outlined"
            style={{ cursor: "pointer" }}
            onClick={onClose}
          >
            close
          </span>
        </div>
        <div className="bottom-section">
          <button className="cancel" onClick={onClose}>
            cancel
          </button>
          <button
            className="delete"
            onClick={() => {
              handleDelete(id);
            }}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteClub;
