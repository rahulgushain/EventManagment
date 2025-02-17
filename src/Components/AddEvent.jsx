import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function AddEvent() {
  const { register, handleSubmit } = useForm();
  
  const URL = "http://localhost:3003/v2/AddEvent";

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(URL, data);
      console.log(res);
      toast.success("Event added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add event.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">Add Event</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            min={new Date().toISOString().split("T")[0]}
            max={new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().split("T")[0]}
            {...register("date", { required: "Date is required" })}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Task</label>
          <textarea
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            placeholder="Type Your Task"
            {...register("task", { required: "Task is required" })}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddEvent;
