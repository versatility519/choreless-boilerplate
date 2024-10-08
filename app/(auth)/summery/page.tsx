"use client";

import React, { useEffect, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import Logo from "@/public/logo.png";
import ModalImg from '@/public/_static/modal.png'
import SummeryImg from '@/public/_static/summery.png'

import { CiSearch } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
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
    typeName: string
    title: string
    description: string
    price: number
    installment?: number
}

const plans: Plan[] = [
    {
        name: 'Choreless Unlimited +',
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
            'Free $9.95 next day delivery',
            'Standard 2 day delivery',
            '15% savings on family care services',
            '$20 monthly credit',
            '1 Free comforter cleaning',
        ]
    }
]

const memberOptions: MemberOption[] = [
    { members: 1, description: 'Perfect for individuals' },
    { members: 2, description: 'Perfect for couples' },
    { members: 3, description: 'Perfect for families' },
    { members: 4, description: 'Perfect for families' },
    { members: 5, description: 'Perfect for families' },
    { members: 6, description: 'Perfect for families' },
    { members: 7, description: 'Perfect for families' },
    { members: 8, description: 'Perfect for families' },
    { members: 9, description: 'Perfect for families' },
    { members: 10, description: 'Perfect for families' },
]

const billingOptions: BillingOption[] = [
    {
        id: 'yearly',
        title: '3 FREE Months: Premium Annual',
        typeName: 'Premum Annual',
        description: 'Pay once, save more | Save $300 annually',
        price: 1750,
    },
    {
        id: 'yearly-flex',
        title: '2 FREE Months: Flex Annual',
        typeName: 'Flex Annual',
        description: 'Pay once, save more | Save $200 annually',
        price: 2000,
        installment: 1690,
    },
]

const Switch: React.FC<SwitchProps> = ({ checked, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked)

    const handleClick = () => {
        setIsChecked(!isChecked)
        onChange(!isChecked)
    }

    return (
        <div
            className={` flex h-5 w-10 cursor-pointer items-center rounded-full border border-white ${isChecked ? 'bg-gray-700' : 'bg-gray-300'}`}
            onClick={handleClick}
        >
            <div
                className={`-z-0 size-5 rounded-full bg-white shadow-md duration-300 ease-in-out ${isChecked ? 'translate-x-5' : 'translate-x-0'}`}
            ></div>
        </div>
    )
}

const SubscriptionPage: React.FC = () => {
    const [lbPerson, setLbPerson] = useState(90);
    const [perPerson, setPerPerson] = useState(169);
    const [stepPerPerson, setStepPerPerson] = useState(50);
    const [basePerPerson, setBasePerPerson] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0])
    const [selectedMembers, setSelectedMembers] = useState<MemberOption>(memberOptions[0])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isYearlyModalOpen, setIsYearlyModalOpen] = useState(false)
    const [isYearly, setIsYearly] = useState(false)
    const [isAddPayment, setIsAddPayment] = useState(false)
    const [selectedBudget, setSelectedBudget] = useState<string>('')
    const [showNotificationModal, setShowNotificationModal] = useState(false)

    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: ''
    })

    const [showTooltip, setShowTooltip] = useState(false)

    const formatCardNumber = (value: string) => {
        // Remove all non-digit characters
        value = value.replace(/\D/g, '');
        // Format the value by adding spaces every 4 digits
        const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        return formattedValue;
    }

    const handleCardDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target
        let formattedValue = value.replace(/[^0-9]/g, '');

        if (id === 'cardNumber') {
            formattedValue = formatCardNumber(value)
        } else if (id === 'expiryMonth') {
            if (Number(formattedValue) > 12) {
                formattedValue = '12'
            } else if (Number(formattedValue) < 1) {
            }
        } else if (id === 'expiryYear') {

        } else if (id === 'cvv') {
        }

        setCardDetails(prev => ({ ...prev, [id]: formattedValue }))
    }

    const handleModalToggle = (modalState: string, value: boolean) => {
        switch (modalState) {
            case 'isModalOpen':
                setIsModalOpen(value)
                break
            case 'isAddPayment':
                setIsAddPayment(value)
                if (!value) {
                    setCardDetails({ cardNumber: '', expiryMonth: '', expiryYear: '', cvv: '' })
                }
                break
            case 'isYearlyModalOpen':
                setIsYearlyModalOpen(value)
                break
            case 'showNotificationModal':
                setShowNotificationModal(value)
                break
            default:
                break
        }
    }

    const handlePlanChange = (checked: boolean) => {
        setIsYearly(checked)
        if (checked) handleModalToggle('isYearlyModalOpen', true)
        else {
            setBasePerPerson(0)
            setPerPerson(169)
            setStepPerPerson(50)
            setSelectedBudget('')
        }
    }

    const handleYearlyClicked = (option: BillingOption) => {
        setBasePerPerson(2028)
        setPerPerson(0)
        setStepPerPerson(600)
        setSelectedBudget(option.id)
        handleModalToggle('isYearlyModalOpen', false)
    }

    useEffect(() => {
        setShowNotificationModal(true)
    }, [])

    const handleAddPaymentClose = () => {
        handleModalToggle('isAddPayment', false)
    }

    const handleAddPaymentOpen = () => {
        handleModalToggle('isAddPayment', true)
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {showNotificationModal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => setShowNotificationModal(false)}>
                    <div className="w-full max-w-xl rounded-lg bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="scrollbar-hide my-1 max-h-[92vh] w-full overflow-y-auto rounded-lg  bg-white px-6 py-4" style={{ scrollbarWidth: 'none' }}>
                            <div className="mb-4 flex items-start justify-between">
                                <h2 className="font-walsheimMedium text-xl ">Flex Pay: Simplify Your Yearly Subscription</h2>
                                <IoMdClose size={24} onClick={() => setShowNotificationModal(false)} className="cursor-pointer rounded-full border text-gray-400 shadow-sm hover:text-[#595959]" />
                            </div>

                            <div className="mb-6 font-walsheimRegular ">
                                That&apos;s why we offer Easy Pay for our yearly subscriptions.
                                It&apos;s a flexible payment option that lets you enjoy a full year of laundry freedom without the upfront cost.
                                Spread your payments over three months, keep your cash flow smooth, and still get all the benefits of our premium service right away.
                                It&apos;s just another way we&apos;re taking the load off your shoulders.
                            </div>
                            <div className="mb-6">
                                <Image
                                    src={ModalImg}
                                    alt="Laundry basket with 'Wash & Fold' bag"
                                    className="h-48 w-full rounded-lg object-cover"
                                />
                            </div>
                            <div className="mb-6">
                                <h3 className="mb-2 font-walsheimMedium text-xl">How Flex Pay Works</h3>
                                <ul className="list-inside list-disc space-y-2 font-walsheimRegular ">
                                    <li>Split your yearly subscription into 3 easy monthly installments at no extra charge.</li>
                                    <li>First payment due at checkout, followed by 2 monthly payments.</li>
                                    <li>Available for yearly subscriptions only.</li>
                                    <li>Pay with your credit card or PayPal account.</li>
                                </ul>
                            </div>
                            <div className="mb-6">
                                <h3 className="mb-2 font-walsheimMedium text-xl">0% Interest</h3>
                                <ul className="list-inside list-disc space-y-2 font-walsheimRegular ">
                                    <li>Choreless does not charge interest or fees for Easy Pay.</li>
                                    <li>Credit card terms may apply; check with your card issuer.</li>
                                </ul>
                            </div>
                            <p className="mb-4 font-walsheimRegular text-sm text-gray-500">
                                Easy Pay subject to approval. Prepaid cards not accepted for Easy Pay. Cannot be combined with other offers or applied to past purchases.
                            </p>
                            <p className="text-sm text-gray-500">
                                Questions? Contact our Customer Care team at (823) 296-3986
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mx-auto flex flex-col overflow-y-auto  md:flex-row">
                <div className="sticky flex w-full items-center justify-center text-center md:h-screen lg:justify-end">
                    <div className="absolute  w-full flex-col px-4 sm:px-16 md:py-12 lg:max-w-[580px]">
                        <div className="top-44 hidden max-w-[480px] px-4 md:flex">
                            <main className='w-full text-left'>
                                <div className="hidden py-6 md:flex">
                                    <Link href="/" className="flex items-center space-x-1.5">
                                        <Image src={Logo} alt="logo" className='w-40' />
                                    </Link>
                                </div>
                                <h2 className="mb-2 font-walsheimMedium text-3xl">Laundry Freedom at Your Fingertips</h2>
                                <p className="mb-8 text-[#595959]">Choose your time-saving plan below</p>

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

                                <Image
                                    src={SummeryImg}
                                    alt="Laundry and Choreless bag"
                                    className="h-[200px] w-full rounded-lg object-cover"
                                />

                                <div className="mt-8 flex items-center rounded-lg bg-[#d8e4e4] py-3 pr-3">
                                    <div className='px-3'>
                                        <IoMdInformationCircle size={32} />
                                    </div>
                                    <p className="font-walsheimMedium text-base">
                                        Transform your to-do list into quality time – let Choreless handle the laundry while you focus on what matters most.
                                    </p>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>

                <div className='flex w-full flex-col gap-8   bg-gray-100 shadow-md sm:px-12 md:bg-white md:pb-4 md:pt-12 lg:justify-start' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <Link href="/" className="visible  z-30  flex w-full items-center bg-gray-100 p-4 md:right-8 md:hidden">
                        <Image src={Logo} alt="logo" className='w-40' />
                    </Link>
                    <div className="  w-full flex-col px-4  lg:max-w-[580px] lg:px-4">
                        <div className=' '>
                            <div className='border-b border-gray-300 pb-8'>
                                <h3 className="mb-4 font-walsheimMedium text-2xl sm:text-3xl">Select your choreless plan</h3>
                                <p className="mb-4 font-walsheimMedium text-xl">Choose your plan</p>
                                <div className="mb-6 flex w-full flex-row gap-4 xl:w-[70%]">
                                    {plans.map((plan) => (
                                        <button
                                            key={plan.name}
                                            onClick={() => setSelectedPlan(plan)}
                                            className={`flex-1 rounded-full p-2 text-center font-walsheimMedium ${selectedPlan.name === plan.name
                                                ? 'bg-[#85C6C0] text-white'
                                                : 'bg-gray-200 text-gray-800'}`}
                                        >
                                            {plan.name}
                                        </button>
                                    ))}
                                </div>

                                {plans.map((plan) => (
                                    <div key={plan.name} className={selectedPlan.name === plan.name ? 'block' : 'hidden'}>
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <div>
                                                        {plan.name === 'Choreless Unlimited' && index >= plan.features.length - 2 ? (
                                                            <IoMdClose size={20} className=" rounded-full bg-orange-600 text-white" />
                                                        ) : (
                                                            <Check size={20} className=" rounded-full bg-teal-500 text-white" />
                                                        )}
                                                    </div>
                                                    <span className={`ml-2 flex w-full items-center justify-between font-walsheimMedium ${plan.name === 'Choreless Unlimited' && index >= plan.features.length - 2 ? 'text-gray-400 line-through' : 'text-[#595959] '}`}>
                                                        <p>{plan.name === 'Choreless Unlimited' && index === 3 ? (
                                                            <>
                                                                <span className="text-gray-400 line-through">{feature.slice(0, 4)}</span>
                                                                {feature.slice(4)}
                                                            </>
                                                        ) : feature}</p>
                                                        <p>
                                                            {index === 1 && (
                                                                <FaInfoCircle color='#85C6C0' size={20} />
                                                            )}
                                                        </p>
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className='border-b border-gray-300 py-8'>
                                <h3 className="mb-4 font-walsheimMedium text-xl ">Select your family size</h3>
                                <div className='flex flex-row items-center justify-between gap-1 rounded-xl border border-[#85C6C0] bg-white p-4'
                                    onClick={() => handleModalToggle('isModalOpen', true)}>
                                    <button
                                        className="flex w-full flex-col items-center justify-between text-left"
                                    >
                                        <div className='flex w-full justify-between'>
                                            <div className='flex flex-col gap-1'>
                                                <span className="font-walsheimBold text-xl">{selectedMembers.members} members</span>
                                                <p className="text-[#595959]">{selectedMembers.description}</p>
                                            </div>

                                            <div className='flex items-center'>
                                                <div className="flex flex-col gap-1 text-right">
                                                    <span className="flex font-walsheimBold text-xl">
                                                        <p className='text-black'>${(selectedMembers.members - 1) * stepPerPerson + perPerson + basePerPerson}</p>
                                                        <p className='text-[#595959]'>/ mo</p>
                                                    </span>
                                                    <p className="text-[#595959]">{(selectedMembers.members - 1) * 40 + lbPerson} lb/ mo</p>
                                                </div>
                                                <div className='items-center'>
                                                    <ChevronDown className="size-10 cursor-pointer " />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="w-full font-walsheimRegular text-sm text-[#595959]">
                                            Exceeded {(selectedMembers.members - 1) * 40 + lbPerson} lbs? Relax! Enjoy {selectedMembers.members} bags/week guaranteed service.
                                        </p>
                                    </button>
                                </div>
                                {isModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => handleModalToggle('isModalOpen', false)}>
                                        <div className="w-full max-w-xl rounded-lg bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                                            <div className='flex w-full items-center justify-between'>
                                                <p className='font-walsheimMedium text-xl'>Choose Your Family Plan</p>
                                                <IoMdClose size={24} onClick={() => handleModalToggle('isModalOpen', false)} className="cursor-pointer rounded-full border text-gray-400 shadow-sm hover:text-[#595959]" />
                                            </div>
                                            <p className='mt-2 text-xs'>Unlimited Laundry, Tailored to Your Household</p>
                                            <div className='my-2  max-h-[60vh] overflow-y-auto' style={{ scrollbarWidth: 'none' }}>
                                                {memberOptions.map((option) => (
                                                    <button
                                                        key={option.members}
                                                        onClick={() => {
                                                            setSelectedMembers(option)
                                                            handleModalToggle('isModalOpen', false)
                                                        }}
                                                        className="hide-scrollbar my-2 w-full rounded-xl border-2 border-teal-500 p-4 text-left hover:bg-gray-100"
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <span className="font-walsheimBold text-xl">{option.members} members</span>
                                                                <p className="mt-2 font-walsheimRegular text-base text-[#595959]">{option.description}</p>
                                                            </div>
                                                            <div className="text-right ">
                                                                <span className=" "><b className='font-walsheimBold text-xl'>${(option.members - 1) * stepPerPerson + perPerson + basePerPerson}</b> / mo</span>
                                                                <p className="mt-2 font-walsheimRegular text-base text-[#595959]">{(option.members - 1) * 40 + lbPerson} lb / mo</p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className='mt-4 flex cursor-pointer items-center justify-between' >
                                    <div className='flex flex-col gap-2'>
                                        <p className="text-sm text-[#595959]">
                                            {selectedBudget !== ''
                                                ? billingOptions.find(option => option.id === selectedBudget)?.title
                                                : 'Get up to three months FREE with yearly'}
                                        </p>
                                        <p className='text-sm text-[#6F6F6F]' onClick={() => handleModalToggle('showNotificationModal', true)}>
                                            {selectedBudget !== ''
                                                ? billingOptions.find(option => option.id === selectedBudget)?.description
                                                : 'Pay in 4 installments with Flex pay'}
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        {!isYearly ? (
                                            <Switch checked={isYearly} onChange={handlePlanChange} />
                                        ) : (
                                            <BsTrash3
                                                size={18}
                                                onClick={() => handlePlanChange(false)}
                                                className="cursor-pointer text-gray-400 hover:text-[#595959]"
                                            />
                                        )}
                                    </div>
                                </div>

                                {isYearlyModalOpen && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={() => handleModalToggle('isYearlyModalOpen', false)}>
                                        <div className="w-full max-w-xl rounded-lg bg-white px-6 py-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
                                            <div className='flex items-center  justify-between pt-2'>
                                                <p className=' font-walsheimMedium text-xl'>Unlock Annual Savings</p>
                                                <IoMdClose size={24} onClick={() => handleModalToggle('isYearlyModalOpen', false)} className="cursor-pointer rounded-full border text-gray-400 shadow-sm hover:text-[#595959]" />
                                            </div>
                                            <p className='my-1 font-walsheimRegular text-sm'>Choose the plan that fits your budget</p>
                                            <div className='flex flex-col gap-2'>
                                                {billingOptions.map((option) => (
                                                    <label
                                                        key={option.id}
                                                        className={`flex cursor-pointer items-center justify-between gap-2 rounded-lg border px-2 py-4 ${selectedBudget === option.id ? 'border-blue-500' : 'border-gray-200'
                                                            }`}
                                                        onClick={() => {
                                                            handleYearlyClicked(option);
                                                        }}
                                                    >
                                                        <div className="flex flex-col">
                                                            <p className="font-walsheimBold text-xl">{option.title}</p>
                                                            <p className="font-walsheimRegular text-xs text-[#595959]">{option.description}</p>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2 text-nowrap text-right">
                                                            <p className="font-walsheimBold text-xl">${option.price} / year</p>
                                                        </div>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center gap-2 rounded-lg py-3">
                                    <div className=' pr-1 '>
                                        <CiSearch color='#85C6C0' size={30} />
                                    </div>

                                    <p className="ml-2 font-walsheimRegular text-xs md:text-base">
                                        Track your laundry progress in the app. We&apos;ll deliver your laundry back to you in 2 business days. Laundry & linens are eligible for next-day delivery!
                                    </p>
                                </div>
                            </div>

                            <div className='py-4'>
                                <h3 className="my-4 font-walsheimMedium text-xl">Payment method</h3>
                                <div className='w-full rounded-md border border-gray-300 px-4'>
                                    <div className="flex flex-col items-center justify-between border-b py-4">
                                        <p className='w-full py-1 font-walsheimMedium text-xl'>Choreless Unlimited+</p>

                                        <div className='flex w-full items-center justify-between'>
                                            <div className='flex flex-col gap-2 text-start font-walsheimRegular text-[#595959]'>
                                                <span className=''>
                                                    {selectedBudget !== ''
                                                        ? billingOptions.find(option => option.id === selectedBudget)?.typeName
                                                        : ''
                                                    }

                                                    &nbsp;{selectedMembers.members} mbr /
                                                    {selectedBudget == ''
                                                        ? 'mo'
                                                        : 'yr'
                                                    }
                                                </span>

                                                <div className="relative flex w-full items-center">
                                                    <span className=''>Unlimited guarantee</span>
                                                    <span
                                                        className="relative ml-1 cursor-pointer underline decoration-dotted"
                                                        onMouseEnter={() => setShowTooltip(true)}
                                                        onMouseLeave={() => setShowTooltip(false)}
                                                    >
                                                        <FaInfoCircle color='#85C6C0' />
                                                        {showTooltip && (
                                                            <div
                                                                className="absolute bottom-full left-1/2 z-10 mb-2 w-64 -translate-x-1/2 rounded-lg bg-white p-2 text-black shadow-lg"
                                                            >
                                                                <p className='font-walsheimMedium'>Exceed Allotment</p>
                                                                <p className="w-full text-justify font-walsheimMedium text-xs">Exceeded 250 lbs? Relax! Enjoy guaranteed multi-bag weekly service. We handle the loads, you focus on what matters most.</p>
                                                            </div>
                                                        )}
                                                    </span>
                                                </div>

                                            </div>
                                            <div className='flex flex-col gap-2 text-end font-walsheimRegular text-[#595959]'>
                                                <span className=' '>${(selectedMembers.members - 1) * stepPerPerson + perPerson + basePerPerson} / mo</span>
                                                <span className=' '>{selectedMembers.members} bags / wk</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between border-b py-4">
                                        <span className='font-walsheimRegular text-[#595959]'>Welcome discount</span>
                                        <span className="font-walsheimBold text-teal-500">-$50</span>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <span className='font-walsheimRegular text-[#595959]'>Total due today</span>
                                        <span className='font-walsheimBold text-black'>${(selectedMembers.members - 1) * 50 + perPerson + basePerPerson - 50}</span>
                                    </div>
                                </div>
                            </div>

                            <div className=''>
                                <p className='w-full cursor-pointer rounded-lg border p-4 font-walsheimMedium text-xl text-black'
                                    onClick={handleAddPaymentOpen}>
                                    Add your payment information
                                </p>
                                {isAddPayment && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4" onClick={handleAddPaymentClose}>
                                        <Card className="mx-auto w-full max-w-md border-none bg-white text-black shadow-xl" onClick={(e) => e.stopPropagation()}>
                                            <CardHeader>
                                                <div className='flex justify-between'>
                                                    <CardTitle>Add payment information</CardTitle>
                                                    <IoMdClose size={24} onClick={handleAddPaymentClose} className="cursor-pointer rounded-full border text-gray-400 shadow-sm hover:text-[#595959]" />
                                                </div>
                                                <CardDescription>Enter your Card details</CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <form className="space-y-2">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="cardNumber">Card Number</Label>
                                                        <Input
                                                            id="cardNumber"
                                                            type='text'
                                                            placeholder="1234 5678 9012 3456"
                                                            value={cardDetails.cardNumber}
                                                            onChange={(e) => handleCardDetailChange(e)}
                                                            maxLength={19}
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-3 gap-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="expiryMonth">Month</Label>
                                                            <Input
                                                                id="expiryMonth"
                                                                placeholder="MM"
                                                                value={cardDetails.expiryMonth}
                                                                onChange={(e) => handleCardDetailChange(e)}
                                                                maxLength={2}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="expiryYear">Year</Label>
                                                            <Input
                                                                id="expiryYear"
                                                                placeholder="YY"
                                                                value={cardDetails.expiryYear}
                                                                onChange={(e) => handleCardDetailChange(e)}
                                                                maxLength={4}
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label htmlFor="cvv">CVV</Label>
                                                            <Input
                                                                id="cvv"
                                                                placeholder="123"
                                                                value={cardDetails.cvv}
                                                                onChange={(e) => handleCardDetailChange(e)}
                                                                maxLength={3}
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </CardContent>
                                        </Card>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-4 py-4 text-center font-walsheimMedium">
                                <p className="w-full cursor-pointer rounded-full bg-black py-3 text-white">
                                    Pay and start subscription
                                </p>
                                <p className="mt-2 text-center text-xs text-[#595959]">
                                    Change, pause or cancel anytime
                                </p>
                            </div>
                        </div>
                    </div>
                </div >
            </div >
        </div>
    )
}

export default SubscriptionPage