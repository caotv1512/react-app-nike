import * as React from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData("00:00", 0),
  createData("03:00", 300),
  createData("06:00", 600),
  createData("09:00", 800),
  createData("12:00", 1500),
  createData("15:00", 2000),
  createData("18:00", 2400),
  createData("21:00", 2400),
  createData("24:00", undefined),
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const formattedValue = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

    return (
      <div className="custom-tooltip">
        <p className="label">{`Time: ${label}`}</p>
        <p className="value">{`Amount: ${formattedValue}`}</p>
      </div>
    );
  }

  return null;
};

export default function Chart() {
  const [users, setUsers] = useState([]);
  const isStatus = useSelector((state) => state.status);

  useEffect(() => {
    axios
      .get("https://db-nike.onrender.com/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
  }, [isStatus]);

  const today = new Date().toLocaleDateString();
  console.log(today);
  const totalAmount = users.reduce((total, user) => {
    const userTotalByDay = user.bill.reduce((subtotal, bill) => {
      if (bill.date === today) {
        return subtotal + bill.totalPrice;
      } else {
        return subtotal;
      }
    }, 0);

    return total + userTotalByDay;
  }, 0);

  const theme = useTheme();

  const chartData = data.map((item) => ({
    time: item.time,
    amount: item.amount * (totalAmount / 2400), // Chia cho 2400 để đưa về khoảng giá trị tương đối
  }));

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            tickFormatter={(value) =>
              new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(value)
            }
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            ></Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
