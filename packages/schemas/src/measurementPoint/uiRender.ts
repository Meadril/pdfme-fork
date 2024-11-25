import type * as CSS from 'csstype';
import { UIRenderProps } from '@pdfme/common';
import { MeasurementPointSchema } from './types';
import 'chart.js/auto';
import { Chart, ChartConfiguration } from 'chart.js';

const fullSize = { width: '100%', height: '100%' };

// Function to create a line chart
function createLineChart(ctx: CanvasRenderingContext2D | null, data: ChartConfiguration['data']): Chart | null {
    if (!ctx) return null;
    return new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            scales: {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            },
            plugins: { legend: { display: false } }
        },
    });
}

// Function to generate random data
function generateRandomData(length: number): number[] {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
}

// Function to create a chart element
function createChartElement(id: string): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.id = id;
    return canvas;
}

export const uiRender = async (arg: UIRenderProps<MeasurementPointSchema>): Promise<void> => {
    const { schema, rootElement } = arg;
    rootElement.style.display = 'flex';
    rootElement.style.flexWrap = 'wrap';
    rootElement.style.width = '200px';
    rootElement.style.height = '2px';
    const chartContainer = document.createElement('div');
    chartContainer.style.display = 'flex';
    chartContainer.style.flexWrap = 'wrap';
    chartContainer.style.width = '100%';
    chartContainer.style.height = '100%';
    if (schema.appRender.measurements) {
        const measurements = schema.appRender.measurements;

        for (const [index, measurement] of measurements.entries()) {
            const chart = document.createElement('div');
            chart.style.width = '100%';
            chart.style.height = '100%';
            chart.style.backgroundColor = 'black';
            chart.style.borderColor = 'white';
            chart.style.borderWidth = '2';
            chart.style.borderStyle = 'solid';
            chart.style.padding = '5px';
            chartContainer.appendChild(chart);
        }
    }
    rootElement.appendChild(chartContainer);
};
