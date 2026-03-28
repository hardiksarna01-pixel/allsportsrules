export const diagrams = {
  cricket: {
    title: "Cricket Pitch Layout",
    desc: "22 yards (20.12 m) between creases, stumps at each end",
    elements: [
      { id: "pitch", type: "rect", x: 35, y: 10, w: 30, h: 80, label: "Pitch" },
      { id: "crease1", type: "line", x1: 38, y1: 18, x2: 62, y2: 18, label: "Popping Crease" },
      { id: "crease2", type: "line", x1: 38, y1: 82, x2: 62, y2: 82, label: "Popping Crease" },
      { id: "stumps1", type: "point", x: 50, y: 15, label: "Stumps" },
      { id: "stumps2", type: "point", x: 50, y: 85, label: "Stumps" },
    ],
  },
  football: {
    title: "Football Pitch",
    desc: "100-110 m long, 64-75 m wide with two goal areas",
    elements: [
      { id: "field", type: "rect", x: 5, y: 5, w: 90, h: 90, label: "Pitch" },
      { id: "centre", type: "circle", x: 50, y: 50, r: 10, label: "Centre Circle" },
      { id: "box1", type: "rect", x: 25, y: 5, w: 50, h: 16, label: "Penalty Area" },
      { id: "box2", type: "rect", x: 25, y: 79, w: 50, h: 16, label: "Penalty Area" },
      { id: "goal1", type: "rect", x: 38, y: 2, w: 24, h: 3, label: "Goal" },
      { id: "goal2", type: "rect", x: 38, y: 95, w: 24, h: 3, label: "Goal" },
    ],
  },
  basketball: {
    title: "Basketball Court",
    desc: "94 x 50 ft (28.7 x 15.2 m) with two baskets",
    elements: [
      { id: "court", type: "rect", x: 5, y: 5, w: 90, h: 90, label: "Court" },
      { id: "3pt1", type: "arc", x: 50, y: 12, r: 24, label: "3-Point Line" },
      { id: "3pt2", type: "arc", x: 50, y: 88, r: 24, label: "3-Point Line" },
      { id: "key1", type: "rect", x: 35, y: 5, w: 30, h: 18, label: "Key / Paint" },
      { id: "key2", type: "rect", x: 35, y: 77, w: 30, h: 18, label: "Key / Paint" },
      { id: "hoop1", type: "point", x: 50, y: 8, label: "Basket" },
      { id: "hoop2", type: "point", x: 50, y: 92, label: "Basket" },
    ],
  },
  tennis: {
    title: "Tennis Court",
    desc: "78 ft (23.77 m) long, 36 ft wide for doubles",
    elements: [
      { id: "court", type: "rect", x: 10, y: 5, w: 80, h: 90, label: "Court" },
      { id: "net", type: "line", x1: 10, y1: 50, x2: 90, y2: 50, label: "Net" },
      { id: "service1", type: "rect", x: 22, y: 25, w: 56, h: 25, label: "Service Box" },
      { id: "service2", type: "rect", x: 22, y: 50, w: 56, h: 25, label: "Service Box" },
    ],
  },
  baseball: {
    title: "Baseball Diamond",
    desc: "90 ft between bases, 60 ft 6 in to pitcher's mound",
    elements: [
      { id: "diamond", type: "diamond", x: 50, y: 50, size: 60, label: "Infield" },
      { id: "home", type: "point", x: 50, y: 85, label: "Home Plate" },
      { id: "first", type: "point", x: 75, y: 60, label: "1st Base" },
      { id: "second", type: "point", x: 50, y: 35, label: "2nd Base" },
      { id: "third", type: "point", x: 25, y: 60, label: "3rd Base" },
      { id: "mound", type: "point", x: 50, y: 60, label: "Pitcher's Mound" },
    ],
  },
  nfl: {
    title: "NFL Field",
    desc: "100 yards long, 53 1/3 yards wide with end zones",
    elements: [
      { id: "field", type: "rect", x: 5, y: 10, w: 90, h: 80, label: "Field" },
      { id: "ez1", type: "rect", x: 5, y: 5, w: 90, h: 10, label: "End Zone" },
      { id: "ez2", type: "rect", x: 5, y: 85, w: 90, h: 10, label: "End Zone" },
      { id: "50yd", type: "line", x1: 5, y1: 50, x2: 95, y2: 50, label: "50-Yard Line" },
    ],
  },
  rugby: {
    title: "Rugby Pitch",
    desc: "100 m between try lines, max 70 m wide",
    elements: [
      { id: "field", type: "rect", x: 5, y: 10, w: 90, h: 80, label: "Pitch" },
      { id: "iga1", type: "rect", x: 5, y: 2, w: 90, h: 10, label: "In-Goal Area" },
      { id: "iga2", type: "rect", x: 5, y: 88, w: 90, h: 10, label: "In-Goal Area" },
      { id: "22m", type: "line", x1: 5, y1: 28, x2: 95, y2: 28, label: "22m Line" },
      { id: "half", type: "line", x1: 5, y1: 50, x2: 95, y2: 50, label: "Halfway" },
    ],
  },
};

export default diagrams;
