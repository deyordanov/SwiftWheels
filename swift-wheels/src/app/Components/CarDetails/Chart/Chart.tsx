import React from "react";
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
}

export default function PriceChart({ initialPrice, year }: PriceChartProps) {
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
                    color: "#555", // Color of the axis labels
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
                    color: "#555",
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
                    mode: "xy",
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
        <div className="flex flex-col w-full">
            <div className="w-full h-[600px] mb-8">
                <Line data={data} options={options} />
            </div>
            {/* TODO: Display a contact form / offer form when the offer button is clicked? */}
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-4xl font-extrabold mb-2">
                    Based on our calculations:
                </h1>
                <h2 className="mb-8 text-xl">
                    The current price of the vehicle is:
                </h2>
                <button className="w-[80%] h-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 flex justify-center items-center p-8 shadow-2xl text-5xl text-white animate-bounce">
                    An amazing offer for you!
                </button>
            </div>
        </div>
    );
}
