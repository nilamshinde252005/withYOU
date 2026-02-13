import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/ToDoList.css";
import NavBar from "./NavBar";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const API = "http://localhost:8080";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const getToken = () => localStorage.getItem("token"); // ✅ standard key

  // Fetch tasks
  const fetchTasks = async () => {
    const token = getToken();
    if (!token) {
      console.error("❌ No token found. Login first.");
      return;
    }

    try {
      const res = await axios.get(`${API}/login/data`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(
        "Error fetching tasks:",
        err.response?.data?.message || err.message
      );
    }
  };

  // Add task
  const handleAdd = async () => {
    const token = getToken();
    if (!token) {
      alert("You are not logged in. Please login again.");
      return;
    }
    if (!newTask.trim()) return;

    try {
      await axios.post(
        `${API}/tasks`,
        { task: newTask, status: "Working", dueDate: null },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setNewTask("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding task");
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    const token = getToken();
    if (!token) {
      alert("You are not logged in. Please login again.");
      return;
    }

    try {
      await axios.delete(`${API}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting task");
    }
  };

  // Update task text
  const handleUpdate = async (id) => {
    const token = getToken();
    if (!token) {
      alert("You are not logged in. Please login again.");
      return;
    }

    try {
      await axios.put(
        `${API}/tasks/${id}`,
        { task: editedTask },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setEditingId(null);
      setEditedTask("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data?.message || "Error updating task");
    }
  };

  // Update status
  const handleStatusChange = async (id, newStatus) => {
    const token = getToken();
    if (!token) return;

    try {
      await axios.put(
        `${API}/tasks/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err.response?.data || err.message);
    }
  };

  // Update due date
  const handleDateChange = async (id, date) => {
    const token = getToken();
    if (!token) return;

    try {
      const formattedDate = date ? date.toISOString().split("T")[0] : null;
      await axios.put(
        `${API}/tasks/${id}`,
        { dueDate: formattedDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating due date:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="homepage">
      <NavBar />

      <div className="todo-layout">
        {/* LEFT: toolbox / input — compact, pixel tile */}
        <aside className="todo-left" aria-label="task toolbox">
          <div>
            <div className="task-title">To-Do Toolbox</div>

            <div className="task-input-wrapper" style={{ marginTop: "11%" }}>
              <input
                placeholder="New task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={handleAdd} style={{ marginTop: "1%" }}>
                Add
                <img
                  src="/icons/lightList.png"
                  alt="add"
                  width="20"
                  style={{ marginLeft: 6 }}
                />
              </button>
            </div>

            <div className="motivation-box" style={{ marginTop: "52%" }}>
              "Stay sharp, gamer. Small wins stack up."
            </div>

            <div className="pixel-icons" aria-hidden="true">
              <img src="/decor/3.jpg" alt="flower" />
              <img src="/decor/bunny2.jpg" alt="bunny" />
              <img src="/decor/3.jpg" alt="mushroom" />
              <img src="/decor/bunny2.jpg" alt="controller" />
              <img src="/decor/3.jpg" alt="heavy" />
            </div>
          </div>
        </aside>

        {/* RIGHT: main tasks table — center stage */}
        <main className="todo-right" aria-label="task list">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 className="task-title">To-Do</h2>

            {/* extra pixel icons on the right */}
            <div className="pixel-icons" aria-hidden="true" style={{ margin: 0 }}>
              <img src="/decor/2.jpg" alt="coin" />
              <img src="/decor/4.jpg" alt="heart" />
              <img src="/decor/2.jpg" alt="shield" />
              <img src="/decor/4.jpg" alt="potion" />
              <img src="/decor/2.jpg" alt="coin" />
            </div>
          </div>

          <Table responsive bordered hover className="table-custom" role="table" aria-label="tasks table">
            <thead>
              <tr>
                <th><img src="/icons/pencil.png" alt="edit" /></th>
                <th><img src="/icons/flag.png" alt="status" /></th>
                <th><img src="/icons/calendar.png" alt="date" /></th>
                <th><img src="/icons/trash.png" alt="delete" /></th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((t) => (
                <tr key={t.id}>
                  {/* Task column */}
                  <td style={{ color: "#000" }}>
                    {editingId === t.id ? (
                      <>
                        <input
                          value={editedTask}
                          onChange={(e) => setEditedTask(e.target.value)}
                        />
                        <button onClick={() => handleUpdate(t.id)}>
                          Save <img src="/icons/check.png" alt="save" width="20" />
                        </button>
                      </>
                    ) : (
                      <span
                        onClick={() => {
                          setEditingId(t.id);
                          setEditedTask(t.task);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {t.task} <img src="/icons/back.png" alt="arrow" width="20" />
                      </span>
                    )}
                  </td>

                  {/* Status column */}
                  <td
                    className={
                      t.status === "Working"
                        ? "status-working"
                        : t.status === "Done"
                        ? "status-done"
                        : t.status === "Stuck"
                        ? "status-stuck"
                        : ""
                    }
                  >
                    <Form.Select
                      value={t.status || ""}
                      onChange={(e) => handleStatusChange(t.id, e.target.value)}
                      className="status-select"
                    >
                      <option value="">Select status</option>
                      <option value="Working">Working on it</option>
                      <option value="Done">Done</option>
                      <option value="Stuck">Stuck</option>
                    </Form.Select>
                  </td>

                  {/* Due date */}
                  <td>
                    <DatePicker
                      selected={t.dueDate ? new Date(t.dueDate) : null}
                      onChange={(date) => handleDateChange(t.id, date)}
                      dateFormat="do MMMM"
                      placeholderText="Pick date"
                      className="date-picker-no-border"
                    />
                  </td>

                  {/* Action */}
                  <td>
                    <button onClick={() => handleDelete(t.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </main>
      </div>
    </div>
  );
}

export default TaskList;
