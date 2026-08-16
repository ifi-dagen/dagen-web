export type StandDefinition = {
  id: string;
  name: string;
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

// The coordinates are extracted from the 2026 vector stand map. Keep the
// company name as display text; data matching happens through a normalized key.
export const STANDS: StandDefinition[] = [
  { id: "stand-01", name: "Cheffelo", x: 1892.25, y: 358.125, width: 64.875, height: 64.875 },
  { id: "stand-02", name: "Optio Incentives", x: 1960.125, y: 358.5, width: 64.5, height: 64.5 },
  { id: "stand-03", name: "Cisco", x: 1825.5, y: 432.375, width: 64.875, height: 64.5 },
  { id: "stand-04", name: "NAV", x: 1825.5, y: 499.5, width: 64.875, height: 64.875 },
  { id: "stand-05", name: "Kantega", x: 1960.5, y: 546, width: 64.875, height: 64.5 },
  { id: "stand-06", name: "BearingPoint", x: 1825.5, y: 567.375, width: 64.875, height: 64.125 },
  { id: "stand-07", name: "Gjensidige", x: 1960.5, y: 613.5, width: 64.875, height: 64.875 },
  { id: "stand-08", name: "Blank", x: 1825.5, y: 634.5, width: 64.875, height: 64.875 },
  { id: "stand-09", name: "Xledger", x: 1960.5, y: 681, width: 64.875, height: 64.5 },
  { id: "stand-10", name: "Norgesgruppen", x: 1898.625, y: 741, width: 64.875, height: 64.5 },
  { id: "stand-11", name: "Nasjonalbiblioteket", x: 780.375, y: 650.25, width: 64.875, height: 64.875 },
  { id: "stand-12", name: "NR", x: 847.875, y: 650.25, width: 64.5, height: 64.875 },
  { id: "stand-13", name: "Tripletex", x: 915.75, y: 650.625, width: 64.875, height: 64.5 },
  { id: "stand-14", name: "Visma", x: 983.25, y: 650.25, width: 64.5, height: 64.875 },
  { id: "stand-15", name: "Twoday", x: 1101, y: 650.25, width: 64.5, height: 63.75 },
  { id: "stand-16", name: "Appear", x: 1168, y: 650.25, width: 64.5, height: 63.75 },
  { id: "stand-17", name: "Statens Vegvesen", x: 1234.5, y: 650.25, width: 64.125, height: 63.75 },
  { id: "stand-18", name: "Genus", x: 1300.875, y: 650.25, width: 64.5, height: 63.75 },
  { id: "stand-19", name: "Storebrand", x: 1367.625, y: 649.5, width: 64.875, height: 64.875 },
  { id: "stand-20", name: "Netcompany", x: 1435, y: 649.5, width: 64.5, height: 64.875 },
  { id: "stand-21", name: "Fremtind", x: 1187, y: 1035.375, width: 62, height: 90 },
  { id: "stand-22", name: "Loop Academy", x: 1252, y: 1035.375, width: 62, height: 90 },
  { id: "stand-23", name: "Stingray", x: 1187, y: 1129.125, width: 62, height: 90 },
  { id: "stand-24", name: "Kommando", x: 1252, y: 1129.125, width: 62, height: 90 },
  { id: "stand-25", name: "Sopra Steria", x: 1190.25, y: 1227.75, width: 120, height: 62.25 },
  { id: "stand-26", name: "Computas", x: 1436.625, y: 1025.25, width: 62.625, height: 62.625 },
  { id: "stand-27", name: "Autodesk", x: 1436.625, y: 1090.125, width: 62.625, height: 62.25 },
  { id: "stand-28", name: "DNB", x: 1436.625, y: 1155, width: 62.625, height: 62.25 },
  { id: "stand-29", name: "Bekk", x: 1436.625, y: 1228.125, width: 62.625, height: 91.125 },
  { id: "stand-30", name: "Thales", x: 2089.125, y: 1134.375, width: 62.25, height: 62.625 },
  { id: "stand-31", name: "Skatteetaten", x: 2155.5, y: 1134.375, width: 62.25, height: 62.625 },
  { id: "stand-32", name: "FFI", x: 2089.125, y: 1199.625, width: 62.25, height: 62.25 },
  { id: "stand-33", name: "Tieto", x: 2155.5, y: 1199.625, width: 62.625, height: 62.25 },
  { id: "stand-34", name: "NSM", x: 2089.125, y: 1264.5, width: 62.25, height: 62.625 },
  { id: "stand-35", name: "Vend", x: 2155.5, y: 1264.5, width: 62.25, height: 62.625 },
  { id: "stand-36", name: "Forte Digital", x: 2272.875, y: 1131.75, width: 62.25, height: 62.25 },
  { id: "stand-37", name: "Lime", x: 2272.875, y: 1196.625, width: 62.25, height: 62.25 },
  { id: "stand-38", name: "IF", x: 2272.875, y: 1261.5, width: 62.25, height: 62.625 },
  { id: "stand-39", name: "Knowit", x: 2272.875, y: 1326.375, width: 62.25, height: 62.625 },
  { id: "stand-40", name: "Netlight", x: 8, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-41", name: "Exitec", x: 72.375, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-42", name: "Accenture", x: 137.25, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-43", name: "NBIM", x: 222.375, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-44", name: "Tet Digital", x: 318, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-45", name: "Sparebank1", x: 433.875, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-46", name: "Eika", x: 498.75, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-47", name: "Intility", x: 617.625, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-48", name: "Statnett", x: 682.5, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-49", name: "Capgemini", x: 747.375, y: 1403.25, width: 62.625, height: 62.625 },
  { id: "stand-50", name: "KLP", x: 837.375, y: 1402.875, width: 62.625, height: 62.625 },
  { id: "stand-51", name: "Squarehead", x: 901.875, y: 1402.875, width: 62.625, height: 62.625 },
  { id: "stand-52", name: "Telenor", x: 972.75, y: 1403.25, width: 61.875, height: 61.875 },
  { id: "stand-53", name: "PST", x: 1054.125, y: 1403.25, width: 62.25, height: 61.875 },
  { id: "stand-54", name: "Økokrim", x: 1119, y: 1403.25, width: 62.25, height: 61.875 },
  { id: "stand-55", name: "Politiets IT-enhet", x: 1183.875, y: 1403.25, width: 91.125, height: 61.875 },
  { id: "stand-56", name: "Bouvet", x: 1938.75, y: 1408.125, width: 62.625, height: 62.625 },
  { id: "stand-57", name: "Axaz", x: 2023.25, y: 1408.125, width: 62.625, height: 62.625 },
];
