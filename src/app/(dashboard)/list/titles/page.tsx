"use client";

import TableSearch from "@/components/TableSearch";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import { role, teachersData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { GlobalContext } from "@/context";
import { getTitles } from "@/services/title";

type Title = {
  id: number;
  title: string;
  // phone: string;
  // email?: string;
  photo: string;
  // subjects: string[];
  // classes: string[];
  // address: string;
};

const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Title ID",
    accessor: "titleId",
    className: "hidden md:table-cell",
  },
  {
    header: "Subjects",
    accessor: "subjects",
    className: "hidden md:table-cell",
  },
  {
    header: "Classes",
    accessor: "classes",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const TitleListPage = () => {
  // const userId = localStorage.getItem("user");
  const {user, isAuthUser} = useContext(GlobalContext);
  const userId = localStorage.getItem("loggedinUserId");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 

  const fetchTitles = async () => {
    try {
      const titles = await getTitles(userId); // Fetch titles from the API
      setData(titles); // Update state with fetched titles
    } catch (error) {
      console.error('Error fetching titles:', error);
      setData([]); // Set to empty array if there's an error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // const data: any[] = titlesData();

  useEffect(() => {
    fetchTitles();
  }, [userId]); // Fetch titles whenever userId changes

  if (loading) {
    return <div>Loading titles...</div>; // Show loading state
  }

  const staticPhoto = "https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200";

  const renderRow: React.FC<Title> = (item) => {
    return (
      <tr key={JSON.stringify(item.id)} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-schPurpleLight">
        <td className="flex items-center gap-4 p-4">
          <Image
            src={staticPhoto}
            alt=""
            width={40}
            height={40}
            className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold">{item.title}</h3>
            <span className="text-xs text-gray-500">{item.title}</span>
          </div>
        </td>
        <td className="hidden md:table-cell">{item.title}</td>
        <td className="hidden md:table-cell">{item.title}</td>
        <td className="hidden md:table-cell">{item.title}</td>
        <td className="hidden md:table-cell">{item.title}</td>
        <td className="hidden md:table-cell">{item.title}</td>
        <td>
          <div className="flex items-center gap-2">
            <Link href={`/list/teachers/${item.id}`} className="">
              <button className="w-7 h-7 rounded-full flex items-center justify-center bg-sky">
                <Image src="/view.png" alt="" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <>
                <FormModal table="teacher" type="update" data={item} />
                <FormModal table="teacher" type="delete" id={item.id} />
              </>
            )}
          </div>
        </td>
      </tr>
    );
  };
  return (
    <div className="p-4 bg-white rounded-md m-4 mt-0 flex-1">
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold hidden md:block">All Titles</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-schYellow">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-schYellow">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormModal table="title" type="create"/>
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default TitleListPage;
