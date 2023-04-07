import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import ShowContact from './ShowContact';
import { TiContacts } from "react-icons/ti";

const AddContact = () => {
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const [contactList, setContactList] = useState({});

    const onSubmit = data => {
        setContactList({ name: data.name.trim(), contact: data.contact.trim(), address: data.address });
        reset();
    };
    const getLocalItems = JSON.parse(localStorage.getItem("contact"));

    useEffect(() => {
        if (Object.entries(contactList).length === 0) {
            return;
        }
        const getLocalItems = JSON.parse(localStorage.getItem("contact"));
        const UserObject = { name: contactList.name, contact: contactList.contact, address: contactList.address }

        if (!getLocalItems) {
            localStorage.setItem("contact", JSON.stringify([UserObject]));
            setContactList({})
            toast.success("Contact Added Successfully")
        }

        if (!getLocalItems) {
            return;
        }
        const userInfo = [contactList.name, contactList.contact]
        const AlreadyAdded = getLocalItems.find(user => {
            return userInfo.includes((user.contact)) || userInfo.includes(user.name)
        })

        if (!AlreadyAdded) {
            localStorage.setItem("contact", JSON.stringify([...getLocalItems, UserObject]));
            setContactList({})
            toast.success("Contact Added Successfully")
        }
        if (AlreadyAdded) {
            setContactList({})
            toast.error("Contact Info Already Used")
        }
    }, [contactList])

    return (
        <div className="min-h-screen pt-10 bg-[#f6f6f6]">
            <h1 className="text-3xl text-center font-extrabold">Address Book Manager</h1>

            <div className="flex flex-col items-center md:items-start md:flex-row justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="mt-20">

                    <div className="border shadow p-5 rounded-lg">
                        <h1 className="flex justify-center items-center space-x-1 text-xl text-center font-bold bg-opacity-1 mb-2">
                            <TiContacts />
                            <span> Add Contact</span></h1>
                        <div>
                            <div><label>Name</label></div>
                            <input {...register("name", { required: "Name is required", pattern: { value: /^[a-zA-Z][a-zA-Z0-9\s\-]{2,}$/, message: "Name should have at least 3 character" } })} type='text' className="input h-8 input-bordered w-full max-w-xs" name="name" placeholder="Name" />
                        </div>
                        <small className="text-red-700">{errors?.name?.message}</small>

                        <div className="mt-4">
                            <div><label>Contact</label></div>
                            <input {...register("contact", { required: "Contact is required", pattern: { value: /^(\+)?\d{6,12}$/, message: "Please enter a valid phone number between 6 & 12 digits" } })} type='tel' className="input h-8 input-bordered w-full max-w-xs" name="contact" placeholder="Contact" />

                        </div>
                        <small className="text-red-700 text-[10px]">{errors?.contact?.message}</small>
                        <div className="mt-4">
                            <div><label>Address</label></div>
                            <input {...register("address", { required: "Address is required", pattern: { value: /^[^\d][\w\s.,!?@#$%^&*()-]+$/i, message: "Address must have 4 character" } })} type="text" className="input h-8 input-bordered w-full max-w-xs" name="address" placeholder="Address" />

                        </div>
                        <small className="text-red-700">{errors?.address?.message}</small>
                        <div className="mt-4">
                            <button className="btn capitalize bg-[green] border-none btn-sm" type="submit">Add Contact</button>
                        </div>
                    </div>
                </form>
                <ShowContact contactList={getLocalItems} ></ShowContact>
            </div>
        </div>
    );
};

export default AddContact;