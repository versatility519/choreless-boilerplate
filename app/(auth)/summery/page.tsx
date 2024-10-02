"use client";

import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import Logo from "@/public/logo.png";
import SummeryImg from '@/public/_static/summery.png'

import { IoBagHandleOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

import { IoMdInformationCircle, IoMdClose } from "react-icons/io";

interface Plan {
    name: string
    features: string[]
}

interface MemberOption {
    members: number
    description: string
}

interface SwitchProps {
    checked: boolean
    onChange: (checked: boolean) => void
}

interface BillingOption {
    id: string
    title: string
    description: string
    price: number
    installment?: number
}

const plans: Plan[] = [
    {
        name: 'Choreless Unlimited+',
        features: [
            '250 lb / month family laundry base',
            'No limits: Continuous service after monthly quota',
            'Free pickup & delivery - we come to you',
            'Free next day delivery',
            '20% savings on family care services',
            '$20 monthly credit',
            '1 Free comforter cleaning',
        ]
    },
    {
        name: 'Choreless Unlimited',
        features: [
            '200 lb / month family laundry base',
            'Always covered: Guaranteed weekly service',
            'Free pickup & delivery - we come to you',
            '15% savings on family care services'
        ]
    }
]

const lbPerson = 90;
const perPerson = 169;

const memberOptions: MemberOption[] = [
    { members: 1, description: 'Perfect for individuals' },
    { members: 2, description: 'Perfect for couples' },
    { members: 3, description: 'Perfect families' },
    { members: 4, description: 'Perfect families' },
    { members: 5, description: 'Perfect families' },
    { members: 6, description: 'Perfect families' },
    { members: 7, description: 'Perfect families' },
    { members: 8, description: 'Perfect families' },
    { members: 9, description: 'Perfect families' },
    { members: 10, description: 'Perfect families' },
]

const billingOptions: BillingOption[] = [
    {
        id: 'yearly',
        title: 'Get three months FREE with annual billing',
        description: 'Yearly with flex pay',
        price: 1750,
    },
    {
        id: 'yearly-flex',
        title: 'Get two months FREE with annual flex billing',
        description: 'Yearly with flex pay',
        price: 2000,
        installment: 666.66,
    },
]

const Switch = ({ checked, onChange }: SwitchProps) => {
    const [isChecked, setIsChecked] = useState(checked)

    const handleClick = () => {
        setIsChecked(!isChecked)
        onChange(!isChecked)
    }

    return (
        <div
            className={`flex h-4 w-9 cursor-pointer items-center rounded-full border border-white ${isChecked ? 'bg-gray-700' : 'bg-gray-300'}`}
            onClick={handleClick}
        >
            <div
                className={`size-4 rounded-full bg-white shadow-md duration-300 ease-in-out ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}
            ></div>
        </div>
    )
}


const SubscriptionPage: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0])
    const [selectedMembers, setSelectedMembers] = useState<MemberOption>(memberOptions[0])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isYearlyModalOpen, setIsYearlyModalOpen] = useState(false)
    const [isYearly, setIsYearly] = useState(false)
    const [isAddPayment, setIsAddPayment] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string>(billingOptions[0].id)

    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsModalOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const handleAddPaymentClose = () => {
        setIsAddPayment(false);
    }

    const handleAddPaymentOpen = () => {
        setIsAddPayment(true);
    }


    const handleYearlyClose = () => {
        setIsYearlyModalOpen(false);
    }

    const handleYearlyOpen = () => {
        setIsYearlyModalOpen(true);
    }

    const handlePlanChange = (checked: boolean) => {
        setIsYearly(checked)
        if (checked) handleYearlyOpen()
    }

    return (
        <div className="min-h-screen bg-gray-100" >
            <div className="mx-auto flex flex-col md:flex-row">
                <div className="flex w-full items-center justify-center text-center lg:justify-end">
                    <div className="w-full px-4 py-12 sm:px-16  md:min-h-screen md:p-8 lg:max-w-[580px]">
                        <div className="absolute left-8 top-8 md:right-8 ">
                            <Link href="/" className="flex items-center space-x-1.5">
                                <Image src={Logo} alt="logo" className='w-40' />
                            </Link>
                        </div>
                        <div className="hidden  w-full md:flex">
                            <main className='text-left'>
                                <h2 className="mb-2 font-walsheimMedium text-3xl">Laundry Freedom at Your Fingertips</h2>
                                <p className="mb-8 text-gray-600">Choose your time-saving plan below</p>

                                <div className="mb-8 space-y-2">
                                    <div className="flex items-center">
                                        <div className="mr-2 flex size-5 items-center justify-center rounded-full bg-black text-white">1</div>
                                        <span className="font-walsheimMedium">Pay as you go</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-2 flex size-5 items-center justify-center rounded-full bg-black text-white">2</div>
                                        <span className="font-walsheimMedium">Choreless unlimited</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="mr-2 flex size-5 items-center justify-center rounded-full bg-black text-white">3</div>
                                        <span className="font-walsheimMedium">Choreless Unlimited+</span>
                                    </div>
                                </div>

                                <div className=" mb-8">
                                    <Image
                                        src={SummeryImg}
                                        alt="Laundry and Choreless bag"
                                        className="h-[200px] w-full rounded-lg object-cover"
                                    ></Image>
                                </div>

                                <div className="rounded-lg bg-[#d8e4e4] py-3 pr-3">
                                    <div className="flex items-center">
                                        <div className='px-3  '>
                                            <IoMdInformationCircle size={32} />
                                        </div>
                                        <p className="font-walsheimMedium text-base">
                                            Transform your to-do list into quality time – let Choreless handle the laundry while you focus on what matters most.
                                        </p>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>

                <div className='flex w-full flex-col gap-8 bg-gray-100 px-4 shadow-md sm:px-16 md:bg-white md:py-20' >
                    <div className='border-b pb-8'>
                        <h3 className="mb-4 font-walsheimMedium text-[32px]">Select your choreless plan</h3>
                        <p className="mb-4 font-walsheimMedium text-xl">Choose your plan</p>
                        <div className="mb-6 flex w-full flex-col gap-4 sm:flex-row xl:w-[70%]">
                            {plans.map((plan) => {
                                return (
                                    <button
                                        key={plan.name}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`flex-1 rounded-full p-2 text-center font-walsheimMedium ${selectedPlan.name === plan.name
                                            ? 'bg-[#85C6C0] text-white'
                                            : 'bg-gray-200 text-gray-800'}`}
                                    >
                                        {plan.name}
                                    </button>
                                );
                            })}
                        </div>
                        <ul className="space-y-3">
                            {selectedPlan.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <div className='mr-2 rounded-full bg-teal-500 p-0.5'>
                                        <Check className="size-4 text-white" />
                                    </div>
                                    <span className="font-walsheimMedium text-[#595959]">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-walsheimMedium text-xl text-black">Number of Members in your household</h3>
                        <div>
                            <div className='flex w-full flex-row items-center justify-between rounded-xl border border-[#85C6C0] bg-white p-4'
                                onClick={handleOpen}>
                                <button
                                    className="flex w-full items-center justify-between text-left"
                                >
                                    <div className='flex flex-col gap-2'>
                                        <span className="font-walsheimBold text-xl">{selectedMembers.members} members</span>
                                        <p className="text-gray-600">{selectedMembers.description}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="flex font-walsheimBold text-xl">
                                            <p className='text-black'>${(selectedMembers.members - 1) * 50 + perPerson} </p>
                                            <p className='text-gray-600'>/ mo</p>
                                        </span>
                                        <p className="text-gray-600">{(selectedMembers.members - 1) * 40 + lbPerson} lb - ∞</p>
                                    </div>
                                </button>
                                <ChevronDown className="ml-4 size-5 cursor-pointer text-gray-400" />
                            </div>

                            {isModalOpen && (
                                <div className='fixed inset-0 z-10 flex size-full items-center justify-center bg-black bg-opacity-50 ' ref={ref}>
                                    <div className="h-[79%] max-w-md overflow-y-auto rounded-[24px] border border-gray-300 bg-white p-6 shadow-lg" >
                                        <div className='flex w-full items-center justify-between'>
                                            <p className='font-walsheimMedium text-xl'>Number of Member of your household</p>
                                            <IoMdClose className='cursor-pointer rounded-full p-0.5 shadow-md' size={24} onClick={handleClose} />
                                        </div>
                                        <p className='my-2 text-xs'>Choose your family member</p>
                                        {memberOptions.map((option) => (
                                            <button
                                                key={option.members}
                                                onClick={() => {
                                                    setSelectedMembers(option)
                                                    handleClose();
                                                }}
                                                className="mt-4 w-full rounded-xl border-2 border-[#64c2e7] p-4 text-left hover:bg-gray-100"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-walsheimBold text-xl">{option.members} members</span>
                                                        <p className="mt-2 text-[#595959]">{option.description}</p>
                                                    </div>
                                                    <div className="text-right ">
                                                        <span className="text-lg"><b className='font-extrabold'>${(option.members - 1) * 50 + perPerson}</b> / mo</span>
                                                        <p className="mt-2 text-[#595959]">{(option.members - 1) * 40 + lbPerson} lb / mo</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className='mt-4 flex items-center justify-between'>
                            <div className='flex flex-col gap-2'>
                                <p className="text-sm text-gray-600">
                                    <strong>${(selectedMembers.members - 1) * 50 + perPerson}</strong> billed yearly for <strong>{selectedMembers.members} user</strong>
                                </p>
                                <p className='text-xs text-[#6F6F6F]'>
                                    Pay in 4 installment of $3000 with Flex pay.
                                </p>
                            </div>
                            <Switch checked={isYearly} onChange={handlePlanChange}></Switch>
                            {isYearlyModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                                    <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl">
                                        <div className="flex flex-col">
                                            <div className='flex justify-between'>
                                                <h1 className='font-walsheimMedium text-xl'>Save with yearly billing</h1>
                                                <button onClick={handleYearlyClose} className="rounded-full border text-gray-400 shadow-md hover:text-gray-600">
                                                    <IoMdClose size={24} />
                                                </button>
                                            </div>
                                            <p className='my-2 text-xs'>Choose one suitable for you</p>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            {billingOptions.map((option) => (
                                                <label
                                                    key={option.id}
                                                    className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-2 py-4 ${selectedOption === option.id ? 'border-blue-500' : 'border-gray-200'
                                                        }`}
                                                    onClick={handleYearlyClose}
                                                >
                                                    <div className="flex items-center">
                                                        {/* <input
                                                            type="radio"
                                                            name="billing-option"
                                                            value={option.id}
                                                            checked={selectedOption === option.id}
                                                            onChange={() => setSelectedOption(option.id)}
                                                            className="form-radio size-5 text-blue-600"
                                                        /> */}
                                                        <div className="flex flex-col">
                                                            <div className="font-walsheimBold text-xl">{option.title}</div>
                                                            <div className="font-walsheimRegular text-xs text-gray-500">{option.description}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-2 text-nowrap text-right">
                                                        <div className="font-walsheimBold text-xl">${option.price} / year</div>
                                                        {option.installment && (
                                                            <div className=" font-walsheimRegular text-sm text-gray-500">${option.installment.toFixed(2)} / today</div>
                                                        )}
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col  gap-2 rounded-lg py-3">
                            <div className="flex items-center">
                                <IoBagHandleOutline color='#85C6C0' className='size-8 md:size-6' />
                                <p className="ml-2 font-walsheimRegular text-xs md:text-base">
                                    Exceeded 250 lbs? Relax! Enjoy guaranteed multi-bag weekly service. We handle the loads, you focus on what matters most.
                                </p>
                            </div>
                            <div className="flex items-center">
                                <CiSearch color='#85C6C0' className='size-10 md:size-8' />
                                <p className="ml-2  font-walsheimRegular text-xs md:text-base">
                                    Track your laundry progress in the app. We’ll deliver your laundry back to you in 2 business days. Laundry & linens are eligible for next-day delivery!
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-walsheimMedium text-xl">Payment method</h3>
                        <div className='w-full rounded-md border border-gray-300 px-4'>
                            <div className="flex items-center justify-between border-b py-4">
                                <div className='flex flex-col gap-2'>
                                    <span className='font-walsheimMedium text-xl'>Choreless Unlimited+</span>
                                    <span className='text-[#595959]'>{selectedMembers.members} user / month</span>
                                </div>
                                <div className='flex flex-col gap-2 text-end'>
                                    <span className='text-[#595959]'>${(selectedMembers.members - 1) * 50 + perPerson} / month</span>
                                    <span className='text-[#595959]'>${selectedMembers.members} mbr / month</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-b py-4">
                                <span className='text-[#595959]'>Welcome discount</span>
                                <span className="text-teal-500">-$50</span>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <span className='text-[#595959]'>Total due today</span>
                                <span className='font-walsheimBold text-black'>${(selectedMembers.members - 1) * 50 + perPerson - 50}</span>
                            </div>
                        </div>
                    </div>

                    <div className='w-full rounded-md border border-gray-300 p-6'>
                        <p className='cursor-pointer font-walsheimMedium text-xl' onClick={handleAddPaymentOpen}>Add your payment information</p>
                        {isAddPayment && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                                <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                                    <div className="flex flex-col">
                                        <div className='flex justify-between'>
                                            <h1 className='font-walsheimMedium text-xl'>Add payment information</h1>
                                            <button onClick={handleAddPaymentClose} className="rounded-full border text-gray-400 shadow-md hover:text-gray-600">
                                                <IoMdClose size={24} />
                                            </button>
                                        </div>
                                        <p className='my-2 text-xs'>Enter your card details</p>
                                    </div>
                                    <div className='flex items-center justify-between rounded-lg border border-gray-300 p-2'>
                                        <div className='flex items-center gap-2'>
                                            <span className='font-walsheimMedium text-xs'>Card Number</span>
                                            <input type="text" className='border-none bg-white p-2 outline-none' placeholder='' />
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            <span className='font-walsheimMedium text-xs'> MM/YY </span>
                                            <span className='font-walsheimMedium text-xs'> CVV </span>
                                            <span className='font-walsheimMedium text-xs'> ZIP </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mb-8 flex flex-col gap-4 py-4 text-center font-walsheimMedium">
                        <p className="w-full cursor-pointer rounded-full bg-black py-3 text-white" >
                            Pay and start subscription
                        </p>
                        <p className="mt-2 text-center text-xs text-gray-600">
                            Change, pause or cancel anytime
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubscriptionPage