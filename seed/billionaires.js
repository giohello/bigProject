import mongoose from "mongoose";
import { Billionaire } from "../models/Billionaire.js";

await mongoose.connect(
  "mongodb+srv://gio2009bero:night_witches@cluster0.cxn3dew.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const billionaires = [
  {
    display: "Elon Musk $195 billion",
    netWorth: 195_000_000_000,
    img_url:
      "/img/richy pfp/elon-musk-gettyimages-2147789844-web-675b2c17301ea.png",
  },
  {
    display: "Jeff Bezos $194 billion",
    netWorth: 194_000_000_000,
    img_url: "/img/richy pfp/2974.webp",
  },
  {
    display: "Bernard Arnault $180 billion",
    netWorth: 180_000_000_000,
    img_url: "/img/richy pfp/IMG3534BA_large.png",
  },
  {
    display: "Mark Zuckerberg $177 billion",
    netWorth: 177_000_000_000,
    img_url: "/img/richy pfp/1721292950344.jpg",
  },
  {
    display: "Larry Ellison $141 billion",
    netWorth: 141_000_000_000,
    img_url: "/img/richy pfp/GettyImages-1183284106-e1737651356102.webp",
  },
  {
    display: "Warren Buffett $133 billion",
    netWorth: 133_000_000_000,
    img_url: "/img/richy pfp/warren-buffett-1719825048.jpg",
  },
  {
    display: "Bill Gates $128 billion",
    netWorth: 128_000_000_000,
    img_url: "/img/richy pfp/0x0.webp",
  },
  {
    display: "Steve Ballmer $121 billion",
    netWorth: 121_000_000_000,
    img_url: "/img/richy pfp/ballmer-msft.jpg",
  },
  {
    display: "Mukesh Ambani $116 billion",
    netWorth: 116_000_000_000,
    img_url: "/img/richy pfp/qC7Y5hfYRDNBfHqOpJQFLicYUd4cfJf-ySqS2Yj8Sg0.jpg",
  },
  {
    display: "Larry Page $114 billion",
    netWorth: 114_000_000_000,
    img_url: "/img/richy pfp/failures-of-larry-page.jpg",
  },
];

await Billionaire.insertMany(billionaires);
console.log("Seed complete");
process.exit();
