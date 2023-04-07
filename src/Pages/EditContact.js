import React, { useEffect, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const EditContact = ({ setEdit, editInfo }) => {
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    const [contactList, setContactList] = useState({});
    const [render, setRender] = useState(false);



    const onSubmit = data => {
        setContactList({ name: data.name.trim(), contact: data.contact.trim() });
        let getLocalItems = localStorage.getItem("contact");
        getLocalItems = JSON.parse(getLocalItems);

        if (!getLocalItems) {
            return;
        }

        const ContactInfo = [data.name.trim(), data.contact.trim()];
        const currentContactInfo = [editInfo.name, editInfo.contact];

        const AlreadyAdded = getLocalItems.findIndex(user => {
            const result = currentContactInfo.includes((user.contact)) || currentContactInfo.includes(user.name);
            if (result) {
                return false;
            }
            return ContactInfo.includes((user.contact)) || ContactInfo.includes(user.name)
        })

        if (AlreadyAdded !== -1) {
            reset()
            toast.error("Contact Info Already Used");
            setRender(false)
            return setContactList({});
        }

        setRender(true);
        reset();
    };

    useEffect(() => {
        if (!render) {
            return;
        }
        let getLocalItems = JSON.parse(localStorage.getItem("contact"));

        if (!getLocalItems) {
            return;
        }

        const index = getLocalItems.findIndex(userInfo => userInfo.contact === editInfo.contact);

        if (index !== -1) {
            getLocalItems[index].contact = contactList.contact;
            getLocalItems[index].name = contactList.name;
            localStorage.setItem("contact", JSON.stringify(getLocalItems));
            toast.success("Contact Updated Successfully")
            setContactList({})
            setEdit(false)
        }

    }, [contactList])

    return (
        <div className='absolute top-0 inset-0 flex justify-center items-center w-screen min-h-screen bg-black bg-opacity-60'>

            <div className="form-control bg-white p-5 rounded-lg shadow-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <h1 className="text-3xl text-center font-bold bg-opacity-1 mb-4">Edit Contact</h1>

                    <div className="border shadow p-6 rounded-lg">
                        <div>
                            <div><label>Name</label></div>
                            <input {...register("name", { required: "Name is required", pattern: { value: /^[a-zA-Z][a-zA-Z0-9\s\-]{2,}$/, message: "Name should have at least 3 character" }, value: `${editInfo.name}` })} type='text' className="input h-8 input-bordered w-full max-w-xs" name="name" placeholder="Name" />
                        </div>
                        <small className="text-red">{errors?.name?.message}</small>

                        <div className="mt-4">
                            <div><label>Contact</label></div>
                            <input {...register("contact", { required: "Contact is required", pattern: { value: /^(\+)?\d{6,15}$/, message: "Please enter a valid phone number between 6 and 15 digits" }, value: `${editInfo.contact}` })} type='tel' className="input h-8  input-bordered w-full max-w-xs" name="contact" placeholder="Contact" />

                        </div>
                        <small className="text-red-700 text-[10px]">{errors?.contact?.message}</small>
                        <div className="mt-4">
                            <button className="btn capitalize bg-[green] border-none btn-sm" type="submit">Update Contact</button>
                        </div>
                    </div>
                </form>
            </div>
            <GrClose title='close' onClick={() => setEdit(false)} className='text-3xl p-1 inset-0 mb-32 cursor-pointer rounded-full bg-white' />
        </div>
    );
};

export default EditContact;