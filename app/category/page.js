"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

export default function Home() {
  const [category, setCategory] = useState([]);
  const { register, handleSubmit } = useForm();
  async function fetchCategory() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/category`) 
    const c = await data.json();
    setCategory(c);
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  function createCategory(data) {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE}api/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchCategory());
  }

  return (
    <main>
      <form onSubmit={handleSubmit(createCategory)}>
        <div className="Grid Grid-cols-2 gap-4 w-fit m-4 border-red-600 p-1 m-1">
          <div>Category Name:</div>
          <div>
            <input
              name="name"
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>Order:</div>
          <div>
            <input
              name="order"
              type="number"
              {...register("order", { required: true })}
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="col-span-2">
            <input
              type="submit"
              value="Add"
              className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            />
          </div>
        </div>
      </form>
      <div>
        <h1>Category {category.length}</h1>
        {category.map((category) => (
          <ul>
          <li key={category._id}>
            <Link href={`/product/category/${category._id}`} className="text-red-600">
              {category.name} [{category.order}]
            </Link>
          </li>
          </ul>
        ))}
      </div>
    </main>
  );
}
