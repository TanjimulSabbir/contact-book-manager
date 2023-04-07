import React, { useEffect, useState } from 'react';
import { HiUserCircle } from "react-icons/hi";
import { BiMessageAltEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import EditContact from './EditContact';
import { FiSearch } from "react-icons/fi";


const ShowContact = ({ contactList }) => {
    const [deleteContact, setDeleteContact] = useState("");
    const [edit, setEdit] = useState(false);
    const [editInfo, setEditInfo] = useState("");
    const [search, setSearch] = useState("");
    const [ContactShow, setContactShow] = useState([]);

    // Delete Function
    const handleDelete = (contactInfo) => {
        setDeleteContact(contactInfo)
    }

    // Delete contact
    useEffect(() => {
        const getLocalItems = JSON.parse(localStorage.getItem("contact"))
        const index = getLocalItems?.findIndex(userInfo => userInfo.contact === deleteContact);
        // Removing the object from the array
        if (index !== -1) {
            getLocalItems.splice(index, 1);
        }
        // Store the updated array in local storage
        localStorage.setItem('contact', JSON.stringify(getLocalItems));
        setDeleteContact("")
    }, [deleteContact])

    const getLocalItems = JSON.parse(localStorage.getItem("contact"));
    console.log(getLocalItems, "getLocalItems")

    // Searching
    useEffect(() => {
        const getLocalItems = JSON.parse(localStorage.getItem("contact"));
        const searchResult = getLocalItems.filter(item => {
            return Object.keys(item).some(key => {
                const value = item[key].toString().toLowerCase();
                return value.includes(search.toLowerCase());
            })
        });

        if (searchResult.length) {
            return setContactShow(searchResult);
        }
        setContactShow(getLocalItems);
    }, [search, deleteContact, edit, contactList]);

    // Handle Edit Function
    const handleEdit = (info) => {
        setEdit(true);
        setEditInfo(info)
    }

    // If No contact Found
    if (!ContactShow?.length) {
        return <div className="mt-20 md:ml-10">
            <p className="font-bold card-body">No Contact Found</p>
        </div>
    }

    return (
        <div className="pb-14 md:ml-10 w-[400px]">

            <input onChange={(e) => setSearch(e.target.value)} type="search" className="mt-20 input h-10 input-bordered w-full max-w-[400px] mb-8" placeholder="Search Contact" />

            <div className="space-y-4">
                {
                    ShowContact && ContactShow.map(userList => {
                        return (
                            <div key={userList.contact} className="relative flex items-center border p-2 space-x-4 rounded-lg">
                                <div className="text-4xl">
                                    <HiUserCircle />
                                </div>
                                <div>
                                    <p className='text-black'>{userList.name}</p>
                                    <p className="text-black">{userList.contact}</p>
                                    <p className="text-green-600 mt-1">{userList.address}</p>
                                </div>

                                <div className="absolute right-2 flex items-center space-x-2">
                                    <p onClick={() => handleEdit({ contact: userList.contact, name: userList.name })} className="text-2xl text-green-600 cursor-pointer mt-1">
                                        <BiMessageAltEdit /></p>

                                    <p onClick={() => handleDelete(userList.contact)} className="text-2xl cursor-pointer text-red-600"><MdDeleteForever /></p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {edit && <EditContact editInfo={editInfo} edit={edit} setEdit={setEdit}></EditContact>}
        </div>
    );
};

export default ShowContact;