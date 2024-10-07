"use client"

import { MouseEventHandler, useEffect, useState } from "react";
import Link from "next/link";
import { LuChevronLeft } from "react-icons/lu";
import Image from "next/image";
import Logo from "@/public/logo.png";
import axios from "axios";
import { toast } from "sonner";

export default function PersonalInfoPage() {
    const [showAddress, setShowAddress] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        address: '',
        aptNumber: '',

        phone: '',
        homePhone: '',
        workPhone: '',
        payee: 'card',
        billing: 'instant',
        managed: false,
        source: 'api',
        currentPriceList: 1,
        codeId: 0,
        referralSourceId: 0,
        keyTag: '',
        taxCode: '',
        taxExemptExpiry: 0,
        taxGroup: 0,
        primaryZip: '',
        deliveryStreet: '',
        deliveryUnit: '',
        deliveryCity: '',
        deliveryState: '',
        deliveryZip: '',
        deliveryCountry: '',
        deliveryInstructions: '',
        mailingStreet: '',
        mailingUnit: '',
        mailingCity: '',
        mailingState: '',
        mailingZip: '',
        creditCardName: '',
        creditCardNumber: '',
        creditCardExpiry: '',
        creditCardCvv: '',
        creditCardZip: '',
        providerId: 0,
        newOrderEmail: true,
        newOrderSMS: true,
        orderIsReadyEmail: true,
        orderIsReadySMS: true,
        orderPickedUpEmail: true,
        orderPickedUpSMS: true,
        marketingEmail: true,
        marketingSMS: true,
        firstNameAuthPersonOne: '',
        lastNameAuthPersonOne: '',
        keyTagAuthPersonOne: '',
        phone1AuthPersonOne: '',
        phone2AuthPersonOne: '',
        phone3AuthPersonOne: '',
        emailAuthPersonOne: '',
        firstNameAuthPersonTwo: '',
        lastNameAuthPersonTwo: '',
        keyTagAuthPersonTwo: '',
        phone1AuthPersonTwo: '',
        phone2AuthPersonTwo: '',
        phone3AuthPersonTwo: '',
        emailAuthPersonTwo: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phone: '',
        address: '',
        aptNumber: '',
        deliveryInstructions: ''
    });

    const validateField = (name: string, value: string) => {
        let error = '';
        switch (name) {
            case 'email':
                if (!/\S+@\S+\.\S+/.test(value)) {
                    error = 'Invalid email address';
                }
                break;
            case 'firstName':
            case 'lastName':
                if (value.trim().length < 2) {
                    error = 'Name must be at least 2 characters long';
                }
                break;
            case 'password':
                if (value.length < 8) {
                    error = 'Password must be at least 8 characters long';
                }
                break;
            case 'phone':
                if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
                    error = 'Invalid phone number';
                }
                break;
            case 'address':
                if (value.trim().length < 5) {
                    error = 'Please enter a valid address';
                }
                break;
            // Add more validations as needed
        }
        return error;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
        const error = validateField(name, value);
        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: error
        }));
        console.log(`Input ${name} changed:`, value);
    };

    const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newErrors = {
            email: validateField('email', personalInfo.email),
            firstName: validateField('firstName', personalInfo.firstName),
            lastName: validateField('lastName', personalInfo.lastName),
            password: validateField('password', personalInfo.password),
            phone: validateField('phone', personalInfo.phone)
        };
        setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));

        if (Object.values(newErrors).every(error => error === '')) {
            setShowAddress(true);
            console.log("Continuing to address section. Current personal info:", personalInfo);
        }
    };

    const handleBack = () => {
        setShowAddress(false);
        console.log("Going back to personal info section");
    };

    useEffect(() => {
        const handleFetch = async () => {
            const response = await axios.post('https://api.starchup.com/api/StarchupUsers/login', {
                "email": 'wallace@getchoreless.com',
                "password": '512300wdT'
            });
            const token = response.data.id;
            localStorage.setItem('token', token);
        }
        handleFetch();
    }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = {
            address: validateField('address', personalInfo.address),
            aptNumber: validateField('aptNumber', personalInfo.aptNumber),
            deliveryInstructions: validateField('deliveryInstructions', personalInfo.deliveryInstructions)
        };
        setErrors(prevErrors => ({ ...prevErrors, ...newErrors }));

        if (Object.values(newErrors).every(error => error === '')) {
            try {
                const token = localStorage.getItem('token');
                console.log("============================>", personalInfo);
                const newCustomer = await fetch('https://api.starchup.com/api/v2/qCustomers', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                    },
                    body: JSON.stringify(personalInfo)
                });
                if (newCustomer.ok) {
                    console.log('New customer created:', newCustomer.status);
                    toast.success("Account created successfully!", {
                        position: "top-right"
                    });
                } else {
                    const errorData = await newCustomer.json();
                    console.error('Failed to create customer:', errorData);
                    toast.error("Failed to create account. Please try again.", {
                        position: "top-right"
                    });
                }
            } catch (error) {
                console.error('Error sending data to API:', error);
                toast.error("Failed to create account. Please try again.", {
                    position: "top-right"
                });
            }
        }
    };

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center px-4 sm:px-0">
            <div className="absolute left-8 top-8 md:right-8 ">
                <Link href="/" className="flex items-center space-x-1.5">
                    <Image src={Logo} alt="logo" className='w-40' />
                </Link>
            </div>

            <div className="z-40 mx-4 flex w-full max-w-lg flex-col gap-3 rounded-3xl bg-white p-8 shadow-xl sm:mx-auto lg:my-16">
                <div className=" flex flex-col gap-4">
                    <div className="flex w-full items-center py-4 text-start">
                        <button onClick={handleBack} className="">
                            <LuChevronLeft size={40} className="text-black" />
                        </button>
                        <p className="font-walsheim-medium mr-2 px-2 text-center text-3xl text-black sm:px-8 md:px-16">
                            {showAddress ? "Add your address" : "Let's get started"}
                        </p>
                    </div>
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        {!showAddress ? (
                            <>
                                <div className="flex w-full gap-3">
                                    <div className="w-full">
                                        <input type="text" name="firstName" value={personalInfo.firstName} onChange={handleInputChange} placeholder="First Name" className={`w-full rounded-md border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} bg-white p-2`} />
                                        {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
                                    </div>
                                    <div className="w-full">
                                        <input type="text" name="lastName" value={personalInfo.lastName} onChange={handleInputChange} placeholder="Last Name" className={`w-full rounded-md border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} bg-white p-2`} />
                                        {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
                                    </div>
                                </div>
                                <div>
                                    <input type="tel" name="phone" value={personalInfo.phone} onChange={handleInputChange} placeholder="Phone Number" className={`w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} bg-white p-2`} />
                                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                                </div>
                                <div>
                                    <input type="email" name="email" value={personalInfo.email} onChange={handleInputChange} placeholder="Email" className={`w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-white p-2`} />
                                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                                </div>
                                <div>
                                    <input type="password" name="password" value={personalInfo.password} onChange={handleInputChange} placeholder="Create password" className={`w-full rounded-md border ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-white p-2`} />
                                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                                </div>

                                <p className="px-2 py-4 text-center text-sm text-gray-600">
                                    By selecting continue, you agree to receive service and marketing auto-sent texts from Choreless. Opt-out anytime on your &quot;My Account&quot; page or text &quot;STOP&quot;. Message &amp; data rates may apply. By continuing, you also agree to our Terms and Privacy Policy.
                                </p>

                                <button onClick={handleContinue} className="w-full rounded-full bg-black p-3 text-center text-lg text-white">
                                    Continue
                                </button>
                            </>
                        ) : (
                            <>
                                <div>
                                    <input type="text" name="address" value={personalInfo.address} onChange={handleInputChange} placeholder="Address" className={`w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} bg-white p-2`} />
                                    {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                                </div>
                                <p className="font-walsheim text-sm uppercase">Add more address details</p>
                                <div>
                                    <input type="text" name="aptNumber" value={personalInfo.aptNumber} onChange={handleInputChange} placeholder="Apt # (Optional)" className={`w-full rounded-md border ${errors.aptNumber ? 'border-red-500' : 'border-gray-300'} bg-white p-2`} />
                                    {errors.aptNumber && <p className="mt-1 text-xs text-red-500">{errors.aptNumber}</p>}
                                </div>
                                <div>
                                    <textarea
                                        style={{ scrollbarWidth: 'none' }}
                                        cols={8}
                                        rows={5}
                                        name="deliveryInstructions"
                                        value={personalInfo.deliveryInstructions}
                                        onChange={handleInputChange}
                                        placeholder="Pickup & delivery instructions"
                                        className={`w-full rounded-md border ${errors.deliveryInstructions ? 'border-red-500' : 'border-gray-300'} bg-white p-2`}>
                                    </textarea>
                                    {errors.deliveryInstructions && <p className="mt-1 text-xs text-red-500">{errors.deliveryInstructions}</p>}
                                </div>
                                <button type="submit" className="w-full rounded-full  bg-black p-3 text-center text-lg text-white">
                                    Continue
                                </button>
                            </>
                        )}
                    </form>
                </div>
            </div>

            <footer className="absolute bottom-4">
                <p className="mt-8 text-sm text-gray-500">
                    © {new Date().getFullYear()} Choreless. All rights reserved.
                </p>
            </footer>
        </div>
    );
}