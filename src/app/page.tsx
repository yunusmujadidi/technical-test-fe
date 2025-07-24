"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { CardGroup } from "./component/card-group";
import { Navbar } from "./component/navbar";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task } from "@/lib/types";

const HomePage = () => {
  const [data, setData] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://mocki.io/v1/282222c9-43cf-4d92-9ba0-0e0d1447f403"
        );
        console.log("Data received:", response.data.data);
        setData(response.data.data || []);
        setLoading(false);
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskTitle = active.id as string;
    const newStatus = over.id as string;

    setData((prevData) =>
      prevData.map((task) =>
        task.title === taskTitle ? { ...task, status: newStatus } : task
      )
    );
  };

  // filter data by search
  const filteredData = data.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // group data by status
  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.status]) {
      acc[item.status] = [];
    }
    acc[item.status].push(item);
    return acc;
  }, {} as Record<string, Task[]>);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4">
        {Object.entries(groupedData).map(([status, tasks]) => (
          <CardGroup key={status} status={status} tasks={tasks} />
        ))}
      </div>
    </DndContext>
  );
};

export default HomePage;
