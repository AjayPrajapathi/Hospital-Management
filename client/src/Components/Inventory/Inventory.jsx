import React, { useState, useEffect } from "react";
import { inventoryData } from "../DummyData/inventory";

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setInventoryItems(inventoryData);
    setFilteredItems(inventoryData); // Initialize filtered items with all items
  }, []);

  useEffect(() => {
    let updatedItems = inventoryItems;

    if (selectedCategory) {
      updatedItems = updatedItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    if (selectedStatus) {
      updatedItems = updatedItems.filter(
        (item) => item.availabilityStatus === selectedStatus
      );
    }

    setFilteredItems(updatedItems); // Update the filtered list
  }, [selectedCategory, selectedStatus, inventoryItems]);

  return (
    <div className="Item">
      <div>
        <select
          id="Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="PPE">PPE</option>
          <option value="Sanitizer">Sanitizer</option>
          <option value="Mask">Mask</option>
          <option value="Medical Equipment">Medical Equipment</option>
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
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Availability Status</th>
              <th>Qty In Stock</th>
              <th>Qty In Order</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <img src={item.image} alt={item.name} style={{ width: "50px", height: "50px" }} />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.availabilityStatus}</td>
                <td>{item.qtyInStock}</td>
                <td>{item.qtyInOrder}</td>
                <td>{item.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
