import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Aarav Sharma',
        image: doc1,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Aarav specializes in delivering quality medical care with a focus on preventive treatment and early diagnosis.',
        fees: 500,
        address: {
            line1: 'Koregaon Park',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5362,  
        longitude: 73.8936
    },
    {
        _id: 'doc2',
        name: 'Dr. Ananya Gupta',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ananya provides exceptional gynecological care, offering both preventive and curative solutions.',
        fees: 600,
        address: {
            line1: 'Baner Road',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5645,  
        longitude: 73.7759
    },
    {
        _id: 'doc3',
        name: 'Dr.Kabir Verma',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Kabir is known for his expertise in treating various skin conditions and providing personalized skin care plans.',
        fees: 300,
        address: {
            line1: 'Magarpatta City',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5167,  
        longitude: 73.9335
    },
    {
        _id: 'doc4',
        name: 'Dr. Mehir Nair',
        image: doc4,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Mehir has a strong passion for pediatric care, ensuring children’s health and well-being.',
        fees: 400,
        address: {
            line1: 'Kothrud',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5074,  
        longitude: 73.8077
    },
    {
        _id: 'doc5',
        name: 'Dr. Isha Desai',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Isha is an expert in diagnosing and managing neurological disorders with a patient-centric approach.',
        fees: 500,
        address: {
            line1: 'Hinjewadi IT Park',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5974,  
        longitude: 73.7186
    },
    {
        _id: 'doc6',
        name: 'Dr. Siddhesh Kapoor',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Siddhesh is well-regarded for his innovative treatments in neurology and excellent patient care.',
        fees: 500,
        address: {
            line1: 'Pimpri-Chinchwad',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.6298,  
        longitude:  73.7997
    },
    {
        _id: 'doc7',
        name: 'Dr. Aditya Kulkarni',
        image: doc7,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Aditya is dedicated to comprehensive medical care, focusing on prevention and effective treatment.',
        fees: 500,
        address: {
            line1: 'Camp Area',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5158,  
        longitude: 73.8791
    },
    {
        _id: 'doc8',
        name: 'Dr. Pranav Reddy',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Pranav is a compassionate gynecologist who offers excellent maternal and women’s health care.',
        fees: 600,
        address: {
            line1: 'Viman Nagar',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5646,  
        longitude: 73.9143
    },
    {
        _id: 'doc9',
        name: 'Dr. Riya Mehta',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Riya is a skilled dermatologist offering personalized treatment for all skin concerns.',
        fees: 300,
        address: {
            line1: 'Aundh',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5581,  
        longitude:  73.8037
    },
    {
        _id: 'doc10',
        name: 'Dr. Nishant Rao',
        image: doc10,
        speciality: 'Pediatrician',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Nishant is passionate about delivering high-quality pediatric care to children of all ages.',
        fees: 400,
        address: {
            line1: 'Hadapsar',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5089,  
        longitude: 73.9259
    },
    {
        _id: 'doc11',
        name: 'Dr. Nisha Singh',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Nisha is dedicated to diagnosing complex neurological conditions with a comprehensive approach.',
        fees: 500,
        address: {
            line1: 'Balewadi',
            line2: 'Pune, Maharashtra', 
        },
        latitude: 18.5786,  
        longitude: 73.7701
    },
    {
        _id: 'doc12',
        name: 'Dr. Rohan Joshi',
        image: doc12,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Rohan is known for her expertise in women’s health and personalized patient care.',
        fees: 600,
        address: {
            line1: 'Shivajinagar',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5308,  
        longitude: 73.8470
    },
    {
        _id: 'doc13',
        name: 'Dr. Kavya Tiwari',
        image: doc13,
        speciality: 'General Physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Kavya is known for his holistic approach to general healthcare and treatment.',
        fees: 500,
        address: {
            line1: 'Wakad',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5983,  
        longitude: 73.7603
    },
    {
        _id: 'doc14',
        name: 'Dr. Raj Malhotra',
        image: doc14,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Raj provides excellent solutions for gastroenterological conditions and personalized care.',
        fees: 300,
        address: {
            line1: 'Kharadi',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5515,  
        longitude: 73.9400
    },
    {
        _id: 'doc15',
        name: 'Dr. Sneh Shetty',
        image: doc15,
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Sneh Shetty has over 2 years of experience in providing comprehensive gastroenterological care. She specializes in the diagnosis and treatment of digestive disorders.',
        fees: 400,
        address: {
            line1: 'Bavdhan',
            line2: 'Pune, Maharashtra',
        },
        latitude: 18.5121,  
        longitude: 73.7729
    },
];
