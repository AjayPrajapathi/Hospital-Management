import React, { useState, useEffect } from "react";
import { patientsData } from "../DummyData/patientData";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setPatients(patientsData); // Initialize patients data
    setFilteredPatients(patientsData); // Initialize filtered patients with all patients
  }, []);

  useEffect(() => {
    let updatedPatients = patients;

    if (selectedTreatment) {
      updatedPatients = updatedPatients.filter(
        (patient) => patient.treatment === selectedTreatment
      );
    }

    if (selectedStatus) {
      updatedPatients = updatedPatients.filter(
        (patient) => patient.availabilityStatus === selectedStatus
      );
    }

    setFilteredPatients(updatedPatients); // Update the filtered list
  }, [selectedTreatment, selectedStatus, patients]);

  return (
    <div className="Patient">
      <div>
        <select
          id="Treatment"
          value={selectedTreatment}
          onChange={(e) => setSelectedTreatment(e.target.value)}
        >
          <option value="">All Treatments</option>
          <option value="cardiac consultation">Cardiac Consultation</option>
          <option value="neurology">Neurology</option>
        </select>

        <select
          id="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="new patient">New Patient</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Check-In</th>
              <th>Treatment</th>
              <th>Doctor Assigned</th>
              <th>Availability Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.checkIn}</td>
                <td>{patient.treatment}</td>
                <td>{patient.doctorAssigned}</td>
                <td>{patient.availabilityStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
