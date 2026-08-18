export type StandDefinition = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type StandMapViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export const STAND_MAP_VIEW_BOX = {
  x: 0,
  y: 250,
  width: 2381.25,
  height: 1275,
} as const;

export const FIRST_FLOOR_VIEW_BOX = {
  x: 0,
  y: 900,
  width: 2381.25,
  height: 625,
} as const;

export function getStandMapViewBox(
  hasSecondFloor: boolean
): StandMapViewBox {
  return hasSecondFloor ? STAND_MAP_VIEW_BOX : FIRST_FLOOR_VIEW_BOX;
}

// Geometry only. Company names and occupancy come exclusively from the CSV.
export const STANDS: StandDefinition[] = [
  { id: "2009", x: 1892.25, y: 358.125, width: 64.875, height: 64.875 },
  { id: "2010", x: 1960.125, y: 358.5, width: 64.5, height: 64.5 },
  { id: "2008", x: 1825.5, y: 432.375, width: 64.875, height: 64.5 },
  { id: "2007", x: 1825.5, y: 499.5, width: 64.875, height: 64.875 },
  { id: "2004", x: 1960.5, y: 546, width: 64.875, height: 64.5 },
  { id: "2006", x: 1825.5, y: 567.375, width: 64.875, height: 64.125 },
  { id: "2003", x: 1960.5, y: 613.5, width: 64.875, height: 64.875 },
  { id: "2005", x: 1825.5, y: 634.5, width: 64.875, height: 64.875 },
  { id: "2002", x: 1960.5, y: 681, width: 64.875, height: 64.5 },
  { id: "2001", x: 1898.625, y: 741, width: 64.875, height: 64.5 },
  { id: "2110", x: 780.375, y: 650.25, width: 64.875, height: 64.875 },
  { id: "2109", x: 847.875, y: 650.25, width: 64.5, height: 64.875 },
  { id: "2108", x: 915.75, y: 650.625, width: 64.875, height: 64.5 },
  { id: "2107", x: 983.25, y: 650.25, width: 64.5, height: 64.875 },
  { id: "2106", x: 1101, y: 650.25, width: 64.5, height: 63.75 },
  { id: "2105", x: 1168, y: 650.25, width: 64.5, height: 63.75 },
  { id: "2104", x: 1234.5, y: 650.25, width: 64.125, height: 63.75 },
  { id: "2103", x: 1300.875, y: 650.25, width: 64.5, height: 63.75 },
  { id: "2102", x: 1367.625, y: 649.5, width: 64.875, height: 64.875 },
  { id: "2101", x: 1435, y: 649.5, width: 64.5, height: 64.875 },
  { id: "1005", x: 1187, y: 1035.375, width: 62, height: 90 },
  { id: "1004", x: 1252, y: 1035.375, width: 62, height: 90 },
  { id: "1003", x: 1187, y: 1129.125, width: 62, height: 90 },
  { id: "1002", x: 1252, y: 1129.125, width: 62, height: 90 },
  { id: "1001", x: 1190.25, y: 1227.75, width: 120, height: 62.25 },
  { id: "1009", x: 1436.625, y: 1025.25, width: 62.625, height: 62.625 },
  { id: "1008", x: 1436.625, y: 1090.125, width: 62.625, height: 62.25 },
  { id: "1007", x: 1436.625, y: 1155, width: 62.625, height: 62.25 },
  { id: "1006", x: 1436.625, y: 1228.125, width: 62.625, height: 91.125 },
  { id: "1207", x: 2089.125, y: 1134.375, width: 62.25, height: 62.625 },
  { id: "1208", x: 2155.5, y: 1134.375, width: 62.25, height: 62.625 },
  { id: "1205", x: 2089.125, y: 1199.625, width: 62.25, height: 62.25 },
  { id: "1206", x: 2155.5, y: 1199.625, width: 62.625, height: 62.25 },
  { id: "1203", x: 2089.125, y: 1264.5, width: 62.25, height: 62.625 },
  { id: "1204", x: 2155.5, y: 1264.5, width: 62.25, height: 62.625 },
  { id: "1209", x: 2272.875, y: 1131.75, width: 62.25, height: 62.25 },
  { id: "1210", x: 2272.875, y: 1196.625, width: 62.25, height: 62.25 },
  { id: "1211", x: 2272.875, y: 1261.5, width: 62.25, height: 62.625 },
  { id: "1212", x: 2272.875, y: 1326.375, width: 62.25, height: 62.625 },
  { id: "1116", x: 8, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1115", x: 72.375, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1114", x: 137.25, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1113", x: 222.375, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1112", x: 318, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1111", x: 433.875, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1110", x: 498.75, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1109", x: 617.625, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1108", x: 682.5, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1107", x: 747.375, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "1106", x: 837.375, y: 1402.875, width: 62.625, height: 62.625 },
  { id: "1105", x: 901.875, y: 1402.875, width: 62.625, height: 62.625 },
  { id: "1104", x: 972.75, y: 1403.25, width: 61.875, height: 61.875 },
  { id: "1103", x: 1054.125, y: 1403.25, width: 62.25, height: 61.875 },
  { id: "1102", x: 1119, y: 1403.25, width: 62.25, height: 61.875 },
  { id: "1101", x: 1183.875, y: 1403.25, width: 91.125, height: 61.875 },
  { id: "1201", x: 1938.75, y: 1408.125, width: 62.625, height: 62.625 },
  { id: "1202", x: 2023.25, y: 1408.125, width: 62.625, height: 62.625 },
];
