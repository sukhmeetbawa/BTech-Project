import Chart from "chart.js/auto";
import React, { useEffect, useRef } from "react";

interface BarGraphProps {
    data: number[];
    labels: string[];
    label: string;
}

const BarGraph: React.FC<BarGraphProps> = ({ data, labels, label }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    const createChart = () => {
        // Destroy the existing chart if it exists
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        // Create a new chart
        if (chartRef.current) {
            const ctx = chartRef.current.getContext("2d");
            if (ctx) {
                chartInstance.current = new Chart(ctx, {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: label,
                                data: data,
                                borderWidth: 1,
                                hoverBorderWidth: 2,
                            },
                        ],
                    },
                    options: {
                        indexAxis: "y",
                        responsive: true, // Make the chart responsive
                        maintainAspectRatio: false, // Disable aspect ratio to allow resizing
                        scales: {
                            x: {
                                beginAtZero: true,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        }
    };

    useEffect(() => {
        createChart();

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, labels]);

    return (
        <div
            className="chart-container"
            style={{ position: "relative", height: "100%", width: "100%" }} // Set height and width to 100% for responsiveness
        >
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default BarGraph;
