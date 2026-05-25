export interface CollegeData {
  id: number;
  institute: string;
  program: string;
  quota: string;
  category: string;
  gender: string;
  opening: number;
  closing: number;
  fee: string;
  placement: string;
  nirf: number;
}

export const massiveJosaaData: CollegeData[] = [
  // --- IIT BOMBAY ---
  { id: 1, institute: "Indian Institute of Technology Bombay", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 1, closing: 68, fee: "2.3L/yr", placement: "25.0 LPA", nirf: 3 },
  { id: 2, institute: "Indian Institute of Technology Bombay", program: "Electrical Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 150, closing: 480, fee: "2.3L/yr", placement: "21.5 LPA", nirf: 3 },
  { id: 3, institute: "Indian Institute of Technology Bombay", program: "Mechanical Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 500, closing: 1700, fee: "2.3L/yr", placement: "18.0 LPA", nirf: 3 },

  // --- IIT DELHI ---
  { id: 4, institute: "Indian Institute of Technology Delhi", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 20, closing: 115, fee: "2.2L/yr", placement: "24.5 LPA", nirf: 2 },
  { id: 5, institute: "Indian Institute of Technology Delhi", program: "Electrical Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 200, closing: 580, fee: "2.2L/yr", placement: "21.0 LPA", nirf: 2 },
  { id: 6, institute: "Indian Institute of Technology Delhi", program: "Civil Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 2200, closing: 4400, fee: "2.2L/yr", placement: "16.5 LPA", nirf: 2 },

  // --- NIT AGARTALA (Home State & Other State Combo) ---
  { id: 7, institute: "National Institute of Technology Agartala", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 14000, closing: 19500, fee: "1.5L/yr", placement: "14.0 LPA", nirf: 91 },
  { id: 8, institute: "National Institute of Technology Agartala", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 20000, closing: 28500, fee: "1.5L/yr", placement: "11.5 LPA", nirf: 91 },
  { id: 9, institute: "National Institute of Technology Agartala", program: "Electrical Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 27000, closing: 36000, fee: "1.5L/yr", placement: "9.0 LPA", nirf: 91 },
  { id: 10, institute: "National Institute of Technology Agartala", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 35000, closing: 55000, fee: "1.5L/yr", placement: "14.0 LPA", nirf: 91 },
  { id: 11, institute: "National Institute of Technology Agartala", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 48000, closing: 78000, fee: "1.5L/yr", placement: "11.5 LPA", nirf: 91 },
  { id: 12, institute: "National Institute of Technology Agartala", program: "Civil Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 60000, closing: 120000, fee: "1.5L/yr", placement: "7.5 LPA", nirf: 91 },

  // --- MNNIT ALLAHABAD ---
  { id: 13, institute: "Motilal Nehru National Institute of Technology Allahabad", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 2500, closing: 4800, fee: "1.6L/yr", placement: "19.5 LPA", nirf: 49 },
  { id: 14, institute: "Motilal Nehru National Institute of Technology Allahabad", program: "Electronics & Communication Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 5500, closing: 9200, fee: "1.6L/yr", placement: "14.2 LPA", nirf: 49 },

  // --- IIIT HYDERABAD & DELHI ---
  { id: 15, institute: "International Institute of Information Technology Hyderabad", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 300, closing: 950, fee: "3.6L/yr", placement: "30.0 LPA", nirf: 102 },
  { id: 16, institute: "International Institute of Information Technology Delhi", program: "Computer Science and Artificial Intelligence (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 800, closing: 3200, fee: "4.0L/yr", placement: "22.0 LPA", nirf: 110 },

  // --- CATEGORY RESERVATION DATA SAMPLES (OBC / SC / ST) ---
  { id: 17, institute: "National Institute of Technology Agartala", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OBC-NCL", gender: "Gender-Neutral", opening: 4000, closing: 6200, fee: "1.5L/yr", placement: "14.0 LPA", nirf: 91 },
  { id: 18, institute: "National Institute of Technology Agartala", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OBC-NCL", gender: "Gender-Neutral", opening: 6500, closing: 8900, fee: "1.5L/yr", placement: "11.5 LPA", nirf: 91 },
  { id: 19, institute: "Indian Institute of Technology Bombay", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "SC", gender: "Gender-Neutral", opening: 1, closing: 25, fee: "2.3L/yr", placement: "25.0 LPA", nirf: 3 },
  { id: 20, institute: "National Institute of Technology Agartala", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "SC", gender: "Gender-Neutral", opening: 1500, closing: 3200, fee: "1.5L/yr", placement: "14.0 LPA", nirf: 91 }
];