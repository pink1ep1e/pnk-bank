import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AreaChartComponentProps {
    data: { date: string; value: number }[];
}

export const AreaChartComponent: React.FC<AreaChartComponentProps> = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#000" fill="#000" fillOpacity={0.3} />
            </AreaChart>
        </ResponsiveContainer>
    );
}; 