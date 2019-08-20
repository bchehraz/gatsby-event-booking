import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Bar as BarChart } from 'react-chartjs';

const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BOOKINGS_CHART_BUCKETS = {
  'Free': { min: 0, max: 0, color: 'green' },
  '$': { min: 0, max: 9.99, color: 'yellow' },
  '$$': { min: 10, max: 99.99, color: 'orange' },
  '$$$': { min: 100.00, max: 999999999, color: 'red' }
}

const BookingsChart = ({ bookings }) => {
  const chartData = { labels: [], datasets: [] };
  let values = [];
  let colors = [];
  // let i = 0;
  for (const bucket in BOOKINGS_CHART_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      let price = Math.ceil(current.event.price);
      const { min, max } = BOOKINGS_CHART_BUCKETS[bucket];
      if (price >= min && price <= max) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);

    values.push(filteredBookingsCount);
    colors.push(BOOKINGS_CHART_BUCKETS[bucket].color);
    chartData.labels.push(bucket);
  }

  chartData.datasets.push({
    data: values,
    fillColor: colors,
    strokeColor: colors,
    borderWidth: 1,
  });

  return (
    <ChartContainer>
      <BarChart data={chartData} />
    </ChartContainer>
  );
}

BookingsChart.propTypes = {
  bookings: PropTypes.array.isRequired,
  style: PropTypes.object,
}

export default BookingsChart;
