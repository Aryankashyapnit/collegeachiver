import bulkCutoffs from './bulkCutoffs.json';

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
  // --- ORIGINAL DATA RETAINED (1 to 20) ---
  { id: 1, institute: "Indian Institute of Technology Bombay", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 1, closing: 68, fee: "2.3L/yr", placement: "25.0 LPA", nirf: 3 },
  { id: 2, institute: "Indian Institute of Technology Bombay", program: "Electrical Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 150, closing: 480, fee: "2.3L/yr", placement: "21.5 LPA", nirf: 3 },
  { id: 3, institute: "Indian Institute of Technology Bombay", program: "Mechanical Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 500, closing: 1700, fee: "2.3L/yr", placement: "18.0 LPA", nirf: 3 },
  { id: 4, institute: "Indian Institute of Technology Delhi", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 20, closing: 115, fee: "2.2L/yr", placement: "24.5 LPA", nirf: 2 },
  { id: 5, institute: "Indian Institute of Technology Delhi", program: "Electrical Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 200, closing: 580, fee: "2.2L/yr", placement: "21.0 LPA", nirf: 2 },
  { id: 6, institute: "Indian Institute of Technology Delhi", program: "Civil Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 2200, closing: 4400, fee: "2.2L/yr", placement: "16.5 LPA", nirf: 2 },
  { id: 7, institute: "National Institute of Technology Agartala", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 14000, closing: 19500, fee: "1.5L/yr", placement: "14.0 LPA", nirf: 91 },
  { id: 8, institute: "National Institute of Technology Agartala", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 20000, closing: 28500, fee: "1.5L/yr", placement: "11.5 LPA", nirf: 91 },
  { id: 9, institute: "National Institute of Technology Agartala", program: "Electrical Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 27000, closing: 36000, fee: "1.5L/yr", placement: "9.0 LPA", nirf: 91 },
  { id: 10, institute: "National Institute of Technology Agartala", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 35000, closing: 55000, fee: "1.5L/yr", placement: "14.0 LPA", nirf: 91 },
  { id: 11, institute: "National Institute of Technology Agartala", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 48000, closing: 78000, fee: "1.5L/yr", placement: "11.5 LPA", nirf: 91 },
  { id: 12, institute: "National Institute of Technology Agartala", program: "Civil Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 60000, closing: 120000, fee: "1.5L/yr", placement: "7.5 LPA", nirf: 91 },
  { id: 13, institute: "Motilal Nehru National Institute of Technology Allahabad", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 2500, closing: 4800, fee: "1.6L/yr", placement: "19.5 LPA", nirf: 49 },
  { id: 14, institute: "Motilal Nehru National Institute of Technology Allahabad", program: "Electronics & Communication Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 5500, closing: 9200, fee: "1.6L/yr", placement: "14.2 LPA", nirf: 49 },
  { id: 15, institute: "International Institute of Information Technology Hyderabad", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 300, closing: 950, fee: "3.6L/yr", placement: "30.0 LPA", nirf: 102 },
  { id: 16, institute: "International Institute of Information Technology Delhi", program: "Computer Science and Artificial Intelligence (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 800, closing: 3200, fee: "4.0L/yr", placement: "22.0 LPA", nirf: 110 },
  { id: 17, institute: "National Institute of Technology Agartala", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OBC-NCL", gender: "Gender-Neutral", opening: 4000, closing: 6200, fee: "1.5L/yr", placement: "14.0 LPA", nirf: 91 },
  { id: 18, institute: "National Institute of Technology Agartala", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OBC-NCL", gender: "Gender-Neutral", opening: 6500, closing: 8900, fee: "1.5L/yr", placement: "11.5 LPA", nirf: 91 },
  { id: 19, institute: "Indian Institute of Technology Bombay", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "SC", gender: "Gender-Neutral", opening: 1, closing: 25, fee: "2.3L/yr", placement: "25.0 LPA", nirf: 3 },
  { id: 20, institute: "National Institute of Technology Agartala", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "SC", gender: "Gender-Neutral", opening: 1500, closing: 3200, fee: "1.5L/yr", placement: "14.0 LPA", nirf: 91 },

  // --- NEW BIHAR COLLEGES & NATIONAL ADDITIONS ---

  // --- IIT PATNA (BIHAR IIT - JEE Advanced Ranks) ---
  { id: 21, institute: "Indian Institute of Technology Patna", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 1200, closing: 2800, fee: "2.2L/yr", placement: "18.5 LPA", nirf: 41 },
  { id: 22, institute: "Indian Institute of Technology Patna", program: "Electrical and Electronics Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 3500, closing: 6200, fee: "2.2L/yr", placement: "14.8 LPA", nirf: 41 },
  { id: 23, institute: "Indian Institute of Technology Patna", program: "Mechanical Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 5500, closing: 8800, fee: "2.2L/yr", placement: "12.0 LPA", nirf: 41 },
  { id: 24, institute: "Indian Institute of Technology Patna", program: "Civil Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 8000, closing: 12500, fee: "2.2L/yr", placement: "10.2 LPA", nirf: 41 },
  { id: 25, institute: "Indian Institute of Technology Patna", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Female-Only", opening: 2200, closing: 4900, fee: "2.2L/yr", placement: "18.5 LPA", nirf: 41 },
  { id: 26, institute: "Indian Institute of Technology Patna", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OBC-NCL", gender: "Gender-Neutral", opening: 500, closing: 1100, fee: "2.2L/yr", placement: "18.5 LPA", nirf: 41 },
  { id: 27, institute: "Indian Institute of Technology Patna", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "SC", gender: "Gender-Neutral", opening: 200, closing: 650, fee: "2.2L/yr", placement: "18.5 LPA", nirf: 41 },
  { id: 28, institute: "Indian Institute of Technology Patna", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "ST", gender: "Gender-Neutral", opening: 100, closing: 380, fee: "2.2L/yr", placement: "18.5 LPA", nirf: 41 },

  // --- NIT PATNA (BIHAR NIT - JEE Mains Ranks) ---
  { id: 29, institute: "National Institute of Technology Patna", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 8000, closing: 14500, fee: "1.4L/yr", placement: "14.2 LPA", nirf: 56 },
  { id: 30, institute: "National Institute of Technology Patna", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 6000, closing: 11000, fee: "1.4L/yr", placement: "14.2 LPA", nirf: 56 },
  { id: 31, institute: "National Institute of Technology Patna", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 13000, closing: 19500, fee: "1.4L/yr", placement: "11.8 LPA", nirf: 56 },
  { id: 32, institute: "National Institute of Technology Patna", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 10000, closing: 15500, fee: "1.4L/yr", placement: "11.8 LPA", nirf: 56 },
  { id: 33, institute: "National Institute of Technology Patna", program: "Electrical Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 18000, closing: 24500, fee: "1.4L/yr", placement: "9.5 LPA", nirf: 56 },
  { id: 34, institute: "National Institute of Technology Patna", program: "Electrical Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 15000, closing: 20500, fee: "1.4L/yr", placement: "9.5 LPA", nirf: 56 },
  { id: 35, institute: "National Institute of Technology Patna", program: "Civil Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 25000, closing: 38000, fee: "1.4L/yr", placement: "7.8 LPA", nirf: 56 },
  { id: 36, institute: "National Institute of Technology Patna", program: "Civil Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 20000, closing: 32000, fee: "1.4L/yr", placement: "7.8 LPA", nirf: 56 },
  { id: 37, institute: "National Institute of Technology Patna", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OBC-NCL", gender: "Gender-Neutral", opening: 2500, closing: 4800, fee: "1.4L/yr", placement: "14.2 LPA", nirf: 56 },
  { id: 38, institute: "National Institute of Technology Patna", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OBC-NCL", gender: "Gender-Neutral", opening: 1800, closing: 3600, fee: "1.4L/yr", placement: "14.2 LPA", nirf: 56 },

  // --- IIIT BHAGALPUR (BIHAR IIIT - JEE Mains Ranks) ---
  { id: 39, institute: "Indian Institute of Information Technology Bhagalpur", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 14000, closing: 29500, fee: "2.1L/yr", placement: "12.0 LPA", nirf: 125 },
  { id: 40, institute: "Indian Institute of Information Technology Bhagalpur", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 22000, closing: 36000, fee: "2.1L/yr", placement: "9.8 LPA", nirf: 125 },
  { id: 41, institute: "Indian Institute of Information Technology Bhagalpur", program: "Mechatronics Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 26000, closing: 42000, fee: "2.1L/yr", placement: "9.2 LPA", nirf: 125 },
  { id: 42, institute: "Indian Institute of Information Technology Bhagalpur", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 16000, closing: 32000, fee: "2.1L/yr", placement: "12.0 LPA", nirf: 125 },
  { id: 43, institute: "Indian Institute of Information Technology Bhagalpur", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 15000, closing: 30000, fee: "2.1L/yr", placement: "12.0 LPA", nirf: 125 },
  { id: 44, institute: "Indian Institute of Information Technology Bhagalpur", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OBC-NCL", gender: "Gender-Neutral", opening: 5500, closing: 9800, fee: "2.1L/yr", placement: "12.0 LPA", nirf: 125 },

  // --- BIT PATNA (BIHAR GFTI - JEE Mains Ranks) ---
  { id: 45, institute: "Birla Institute of Technology, Patna Campus", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 18000, closing: 45000, fee: "2.8L/yr", placement: "10.5 LPA", nirf: 150 },
  { id: 46, institute: "Birla Institute of Technology, Patna Campus", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 16000, closing: 38000, fee: "2.8L/yr", placement: "10.5 LPA", nirf: 150 },
  { id: 47, institute: "Birla Institute of Technology, Patna Campus", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 28000, closing: 58000, fee: "2.8L/yr", placement: "8.2 LPA", nirf: 150 },
  { id: 48, institute: "Birla Institute of Technology, Patna Campus", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 24000, closing: 48000, fee: "2.8L/yr", placement: "8.2 LPA", nirf: 150 },

  // --- NATIONAL ADDITIONS (IITs, NITs, IIITs, GFTIs) ---
  // IIT Madras (Top IIT)
  { id: 49, institute: "Indian Institute of Technology Madras", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 40, closing: 145, fee: "2.2L/yr", placement: "26.0 LPA", nirf: 1 },
  // IIT Kharagpur (Top IIT)
  { id: 50, institute: "Indian Institute of Technology Kharagpur", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 100, closing: 280, fee: "2.2L/yr", placement: "22.5 LPA", nirf: 6 },
  // NIT Trichy (Top NIT)
  { id: 51, institute: "National Institute of Technology Trichy", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 800, closing: 1500, fee: "1.5L/yr", placement: "22.0 LPA", nirf: 9 },
  { id: 52, institute: "National Institute of Technology Trichy", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "HS", category: "OPEN", gender: "Gender-Neutral", opening: 1200, closing: 4200, fee: "1.5L/yr", placement: "22.0 LPA", nirf: 9 },
  // IIIT Allahabad (Top IIIT)
  { id: 53, institute: "Indian Institute of Information Technology Allahabad", program: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 4500, closing: 9200, fee: "1.8L/yr", placement: "18.2 LPA", nirf: 30 },
  // IIIT Lucknow
  { id: 54, institute: "Indian Institute of Information Technology Lucknow", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 6000, closing: 11800, fee: "2.4L/yr", placement: "21.0 LPA", nirf: 80 },
  // NIFFT Ranchi (GFTI)
  { id: 55, institute: "National Institute of Advanced Manufacturing Technology, Ranchi", program: "Mechanical Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 32000, closing: 55000, fee: "0.8L/yr", placement: "7.0 LPA", nirf: 140 },
  // PEC Chandigarh (Top GFTI)
  { id: 56, institute: "Punjab Engineering College, Chandigarh", program: "Computer Science & Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 8000, closing: 14000, fee: "1.9L/yr", placement: "15.5 LPA", nirf: 82 },
  // SPA New Delhi (Top Architecture GFTI)
  { id: 57, institute: "School of Planning and Architecture, New Delhi", program: "Bachelor of Architecture (5 Years, Bachelor of Architecture)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 100, closing: 950, fee: "1.2L/yr", placement: "6.5 LPA", nirf: 5 },
  // FRESH NEW DATA 2026
  { id: 58, institute: "Indian Institute of Technology Roorkee", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 250, closing: 412, fee: "2.2L/yr", placement: "22.5 LPA", nirf: 7 },
  { id: 59, institute: "Indian Institute of Technology Guwahati", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 400, closing: 601, fee: "2.1L/yr", placement: "21.0 LPA", nirf: 8 },
  { id: 60, institute: "National Institute of Technology Surathkal", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 900, closing: 1600, fee: "1.4L/yr", placement: "20.5 LPA", nirf: 12 },
  { id: 61, institute: "National Institute of Technology Warangal", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "OS", category: "OPEN", gender: "Gender-Neutral", opening: 1000, closing: 2000, fee: "1.3L/yr", placement: "20.0 LPA", nirf: 21 },
  { id: 62, institute: "Indian Institute of Information Technology Pune", program: "Computer Science and Engineering (4 Years, Bachelor of Technology)", quota: "AI", category: "OPEN", gender: "Gender-Neutral", opening: 12000, closing: 16000, fee: "2.5L/yr", placement: "16.0 LPA", nirf: 150 },
  ...(bulkCutoffs as CollegeData[])
];
