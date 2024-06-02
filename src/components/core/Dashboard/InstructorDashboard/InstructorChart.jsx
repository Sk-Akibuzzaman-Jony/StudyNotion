import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function InstructorChart({ instructorDetails }) {
    const [chartType, setChartType] = useState('students');

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgba(${r}, ${g}, ${b}, 0.2)`;
    };

    const getData = () => {
        const backgroundColors = instructorDetails.map(() => getRandomColor());

        if (chartType === 'students') {
            return {
                labels: instructorDetails.map((course) => course.courseName),
                datasets: [
                    {
                        label: 'Number of Students',
                        data: instructorDetails.map((course) => course.studentsEnrolled.length),
                        backgroundColor: backgroundColors,
                        borderWidth: 1,
                    },
                ],
            };
        } else if (chartType === 'income') {
            return {
                labels: instructorDetails.map((course) => course.courseName),
                datasets: [
                    {
                        label: 'Total Income',
                        data: instructorDetails.map((course) => course?.totalIncome),
                        backgroundColor: backgroundColors,                   
                        borderWidth: 1,
                    },
                ],
            };
        }
    };

    const data = getData();

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
        maintainAspectRatio: false,
    };

    return (
        <div className='bg-richblack-800 p-7 rounded-3xl w-[60%] h-full flex flex-col'>
            <div className='mb-5 ml-3 text-richblack-5 font-bold text-2xl'>Visualize</div>
            <div className='flex text-richblack-50 font-bold gap-3 bg-richblack-900 w-fit px-3 py-2 rounded-3xl mb-10'>
                <button
                    onClick={() => setChartType('students')}
                    className={`px-3 py-2 ${chartType === 'students' ? 'underline underline-offset-4 decoration-yellow-50 transition duration-300' : ''}`}
                >
                    Students
                </button>
                <button
                    onClick={() => setChartType('income')}
                    className={`px-3 py-2 ${chartType === 'income' ? 'underline underline-offset-4 decoration-yellow-50 transition duration-300' : ''}`}
                >
                    Income
                </button>
            </div>
            <div className='flex-grow'>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
}

export default InstructorChart;
