"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

// Register the components to be used by ChartJS
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin
);

interface PriceChartProps {
    initialPrice: number;
    year: string;
    setChartPrice: Dispatch<SetStateAction<number>>;
}

export default function PriceChart({
    initialPrice,
    year,
    setChartPrice,
}: PriceChartProps) {
    //Tried to think of a formula, but couldn`t get satisfactory results, so for now I will generate a random number between 0.01 and 0.5
    useEffect(() => {
        setChartPrice(Math.random() * (0.5 - 0.01) + 0.01);
    }, [setChartPrice]);

    //Generating the years array based on what year the vehicle was created
    function generateYearRange(startYear: number, endYear: number) {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(String(year));
        }
        return years;
    }

    const yearsData = generateYearRange(Number(year), 2024);

    // Generating random random price +/- 5% from the price from the previous year since I cannot collect real data
    const generatePriceData = (initialPrice: number) => {
        let prices = [initialPrice];
        for (let i = 1; i < yearsData.length; i++) {
            const change = (Math.random() - 0.5) * 0.1 * initialPrice;
            prices.push(prices[i - 1] + change);
        }
        return prices;
    };

    const priceData = generatePriceData(initialPrice);

    // Find the min and max values to set the scale accordingly
    const maxPrice = Math.max(...priceData);
    const minPrice = Math.min(...priceData);

    // Calculate margin to display around the price data (above and below the data line)
    const margin = maxPrice - minPrice;

    const data = {
        labels: yearsData,
        datasets: [
            {
                label: "Car Price",
                data: priceData,
                fill: true,
                backgroundColor: "rgb(255, 52, 38)",
                borderColor: "rgba(255, 52, 38, 0.5)",
            },
        ],
    };

    const options: ChartOptions = {
        elements: {
            line: {
                tension: 0.4, // Adds some curve to the line
                borderWidth: 5, // Thickness of the line
            },
            point: {
                radius: 8, // Size of the data point indicators
                hoverRadius: 8, // Size when hovered
                hoverBorderWidth: 2, // Border width when hovered
            },
        },
        scales: {
            y: {
                beginAtZero: false,
                suggestedMax: maxPrice + margin, // Add margin to the max price level of the chart
                suggestedMin: minPrice - margin, // Subtract margin to the max price level of the chart
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                },
                //Ticks for years
                ticks: {
                    color: "black", // Color of the axis labels
                    font: {
                        size: 16, // Font size of labels
                    },
                },
            },
            x: {
                grid: {
                    display: true,
                    drawOnChartArea: true,
                    drawTicks: true,
                },
                // Ticks for prices
                ticks: {
                    color: "black",
                    font: {
                        size: 16,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: "top",
                labels: {
                    color: "rgb(97, 97, 97)",
                    padding: 20,
                    font: {
                        size: 20,
                    },
                },
            },
            tooltip: {
                enabled: true,
                position: "nearest", // 'average', 'nearest', 'point'
                mode: "index",
                intersect: false,
                callbacks: {
                    // With this callback I can format the tooltip text
                    title: (tooltipItems) => {
                        //The label of the dataset will be the year
                        return `Year: ${tooltipItems[0].label}`;
                    },
                    label: (context) => {
                        // Format what is written in the tooltip for each dataset
                        let label = context.dataset.label || "";
                        if (label) {
                            label += ": ";
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(context.parsed.y);
                        }
                        return label;
                    },
                },
            },
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true,
                    },
                    mode: "y", //Zoom in only on the 'y' axis
                },
                pan: {
                    enabled: true,
                    mode: "xy",
                },
            },
        },
        interaction: {
            intersect: false, // This will enable the tooltip and hover effects when the mouse is anywhere on the x-axis
            mode: "index", // This will show the tooltip for all items in the dataset that have the same index
        },
        hover: {
            mode: "index",
            intersect: false,
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="flex flex-col w-full shadow-2xl ml-4 rounded-xl border-2 border-gray-100 p-4">
            <div className="h-[280px]">
                <Line data={data} options={options} />
            </div>
        </div>
    );
}
