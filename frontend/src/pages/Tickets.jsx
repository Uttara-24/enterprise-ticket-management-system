import { useEffect, useState } from "react";
import API from "../services/api";

function Tickets() {

  const [tickets, setTickets] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "other",
  });

  const fetchTickets = async () => {

    try {

      const response = await API.get("/tickets/");

      setTickets(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/tickets/",
        formData
      );

      alert("Ticket Created");

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        category: "other",
      });

      fetchTickets();

    } catch (error) {

      console.log(error);

      alert("Failed to create ticket");
    }
  };

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-6">
        Tickets
      </h1>

      {/* CREATE TICKET FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mb-10"
      >

        <h2 className="text-xl font-bold mb-4">
          Create Ticket
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Ticket Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
          rows="4"
          required
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="critical">Critical</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded mb-4"
        >
          <option value="other">Other</option>
          <option value="login">Login</option>
          <option value="network">Network</option>
          <option value="database">Database</option>
          <option value="payment">Payment</option>
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Create Ticket
        </button>

      </form>

      {/* TICKET LIST */}

      <div className="grid gap-6">

        {tickets.map((ticket) => (

          <div
            key={ticket.id}
            className="bg-white shadow-lg rounded-lg p-6"
          >

            <h2 className="text-xl font-bold">
              {ticket.title}
            </h2>

            <p className="mt-2 text-gray-700">
              {ticket.description}
            </p>

            <div className="mt-4 flex gap-4">

              <span className="bg-yellow-200 px-3 py-1 rounded">
                {ticket.priority}
              </span>

              <span className="bg-green-200 px-3 py-1 rounded">
                {ticket.status}
              </span>

              <span className="bg-blue-200 px-3 py-1 rounded">
                {ticket.category}
              </span>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Tickets;