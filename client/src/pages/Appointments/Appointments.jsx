import React, { useState, useEffect } from "react";
import { appointment } from "../DummyData/appointment";

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointmentStatus, setAppointmentStatus] = useState("");

  useEffect(() => {
    setAppointments(appointment);
    setFilteredAppointments(appointment); // Initialize filtered appointments with all items
  }, []);

  useEffect(() => {
    let updatedAppointments = appointments;

    if (appointmentStatus) {
      updatedAppointments = updatedAppointments.filter(
        (appointment) => appointment.status === appointmentStatus
      );
    }

    // If no status is selected, show all appointments
    if (!appointmentStatus) {
      updatedAppointments = appointments;
    }

    setFilteredAppointments(updatedAppointments); // Update the filtered list
  }, [appointmentStatus, appointments]);

  return (
    <div className="Appointment">
      <div>
        <button onClick={() => setAppointmentStatus("")}>All</button> {/* All Button */}
        <button onClick={() => setAppointmentStatus("pending")}>Pending</button>
        <button onClick={() => setAppointmentStatus("cancelled")}>Cancelled</button>
        <button onClick={() => setAppointmentStatus("confirmed")}>Confirmed</button>
      </div>

      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Treatment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.doctor}</td>
                <td>{appointment.treatment}</td>
                <td>{appointment.status}</td>
                <td>{appointment.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
