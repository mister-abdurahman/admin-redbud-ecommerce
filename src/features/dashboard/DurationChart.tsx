import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import { useDarkMode } from "../../context/DarkModeContext";
import { useEffect, useState } from "react";
import { IProductWithBrandName } from "../../utils/types";
import { getRandomHexColor } from "../../utils/helpers";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
  @media only screen and (max-width: 1024px) {
    padding: 1.6rem 1.8rem;
  }
  @media only screen and (max-width: 500px) {
    grid-column: 1 / 2;
    padding: 1rem 1.2rem;
    /* max-width: 50rem; */
  }
`;

const StyledResponsiveContainer = styled(ResponsiveContainer)`
  max-width: 60rem;
  height: auto;

  @media only screen and (max-width: 1024px) {
    max-width: 50rem;
  }
  @media only screen and (max-width: 500px) {
    max-width: 100%;
    /* width: 36rem; */
    margin: 0 auto;
    padding: 0;
  }
`;

const StyledLegend = styled(Legend)`
  align-self: "right";
  width: 10rem;
  display: flex;
  flex-direction: column;
  /* layout: "vertical"; */
  /* iconsize: 15; */
  /* icontype: "circle";*/
`;

const StyledPieChart = styled(PieChart)`
  max-width: 100%;
  /* max-width: 26rem; */
  /* margin-left:  1.2rem; */
  /* margin: 0; */
  /* margin: 0 auto; */

  @media only screen and (max-width: 500px) {
    min-width: 100%;
    /* max-width: 80%; */
    margin: 0 auto;
    // margin-left: 2.5rem;
    font-size: 1rem;
  }
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

// how the fn works:
// loop through the "confirmedStays" and according to the numNights, increase the involved startData by 1. so the real deal is the startData, we just use the confirmedStays to achieve our desired result. ✔
function prepareData(startData: any, stays: any) {
  // A bit ugly code, but sometimes this is what it takes when working with real data 😅

  function incArrayValue(arr: any, field: any) {
    return arr.map((obj: { duration: string; value: string }) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = stays
    .reduce((arr: any, cur: { numNights: number }) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj: { value: number }) => obj.value > 0);

  return data;
}

const ProductsByBrand = ({
  productsWithBrandName,
}: {
  productsWithBrandName: IProductWithBrandName[];
}) => {
  const { isDarkMode } = useDarkMode();
  const startData = isDarkMode ? startDataDark : startDataLight;

  // const data = prepareData(startData, confirmedStays);
  const data = Object.entries(
    productsWithBrandName.reduce((acc: any, item) => {
      const name = item.brands?.name; // Extract the name property
      if (name) {
        acc[name] = (acc[name] || 0) + 1; // Increment the count
      }
      return acc;
    }, {})
  ).map(([key, value]) => {
    return { brand: key, value, color: getRandomHexColor() };
  });

  console.log(data);
  return (
    <ChartBox>
      <Heading as="h2">Products By Brand</Heading>

      <ResponsiveContainer width={"100%"} height={240}>
        <StyledResponsiveContainer>
          <StyledPieChart>
            <Pie
              data={data}
              nameKey={"brand"}
              dataKey={"value"}
              innerRadius={85}
              outerRadius={100}
              cx="50%"
              cy="50%"
              paddingAngle={3}
            >
              {data?.map((entry: { color: string; brand: string }) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.brand}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="middle"
              align="right"
              width={window.innerWidth < 500 ? 80 : 125}
              layout="vertical"
              iconSize={10}
              iconType="circle"
            />
          </StyledPieChart>
        </StyledResponsiveContainer>
      </ResponsiveContainer>
    </ChartBox>
  );
};

export default ProductsByBrand;
