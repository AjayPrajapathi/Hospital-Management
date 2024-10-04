import React, { useState, useEffect } from "react";
import { doctorData } from "../../DummyData/doctorData";
import '../../Styles/doctorsList.css'

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setDoctors(doctorData);
    setFilteredDoctors(doctorData); // Initialize filtered doctors with all doctors
  }, []);

  useEffect(() => {
    let updatedDoctors = doctors;

    if (selectedDepartment) {
      updatedDoctors = updatedDoctors.filter(
        (doctor) => doctor.department === selectedDepartment
      );
    }

    if (selectedSpecialist) {
      updatedDoctors = updatedDoctors.filter(
        (doctor) => doctor.specialist === selectedSpecialist
      );
    }

    if (selectedStatus) {
      updatedDoctors = updatedDoctors.filter(
        (doctor) => doctor.availabiltyStatus === selectedStatus
      );
    }

    setFilteredDoctors(updatedDoctors);
  }, [selectedDepartment, selectedSpecialist, selectedStatus, doctors]);

  return (
    <div className="Doctor">
      <div>
        <select
          id="Department"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="">All Departments</option>
          <option value="cardiologist">Cardiologist</option>
          <option value="neurology">Neurology</option>
        </select>

        <select
          id="Specialist"
          value={selectedSpecialist}
          onChange={(e) => setSelectedSpecialist(e.target.value)}
        >
          <option value="">All Specialists</option>
          <option value="migrant">Migrant</option>
          <option value="stroke">Stroke</option>
        </select>

        <select
          id="Status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      <div>
        <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Department</th>
              <th>Specialist</th>
              <th>Total Appointments</th>
              <th>Total Patients</th>
              <th>Availability Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.id}</td>
                <td>{doctor.name}</td>
                <td>{doctor.department}</td>
                <td>{doctor.specialist}</td>
                <td>{doctor.totalApointments}</td>
                <td>{doctor.totalPatients}</td>
                <td>{doctor.availabiltyStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorsList;
