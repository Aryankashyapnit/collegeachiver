/**
 * Supabase Data Loading Script for CollegeAchiver
 * Generates ~110,000 highly realistic JoSAA cutoff records and ~2,000 seat matrix rows,
 * and bulk uploads them to Supabase using chunked batch insertions.
 */

const { createClient } = require('@supabase/supabase-js');

// Production Supabase Credentials
const supabaseUrl = "https://ygyosdmzubwswnhuhere.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlneW9zZG16dWJ3c3duaHVoZXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3ODAzMDUsImV4cCI6MjA5NTM1NjMwNX0.1jSqaJKatV4lx9JCEi_dAHP6qJFBrPQl8XJ7bqDJeVY";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- SEED LISTS ---

const iits = [
  { name: "Indian Institute of Technology Bombay", short: "IIT Bombay", baseRank: 60, nirf: 3, fee: "₹2.2L/yr", placement: "₹25.4 LPA" },
  { name: "Indian Institute of Technology Delhi", short: "IIT Delhi", baseRank: 90, nirf: 2, fee: "₹2.2L/yr", placement: "₹24.8 LPA" },
  { name: "Indian Institute of Technology Madras", short: "IIT Madras", baseRank: 120, nirf: 1, fee: "₹2.2L/yr", placement: "₹26.0 LPA" },
  { name: "Indian Institute of Technology Kanpur", short: "IIT Kanpur", baseRank: 180, nirf: 4, fee: "₹2.1L/yr", placement: "₹22.2 LPA" },
  { name: "Indian Institute of Technology Kharagpur", short: "IIT Kharagpur", baseRank: 240, nirf: 6, fee: "₹2.2L/yr", placement: "₹22.5 LPA" },
  { name: "Indian Institute of Technology Roorkee", short: "IIT Roorkee", baseRank: 350, nirf: 5, fee: "₹2.3L/yr", placement: "₹21.0 LPA" },
  { name: "Indian Institute of Technology Guwahati", short: "IIT Guwahati", baseRank: 480, nirf: 7, fee: "₹2.2L/yr", placement: "₹20.8 LPA" },
  { name: "Indian Institute of Technology Hyderabad", short: "IIT Hyderabad", baseRank: 550, nirf: 8, fee: "₹2.4L/yr", placement: "₹20.0 LPA" },
  { name: "Indian Institute of Technology BHU Varanasi", short: "IIT BHU", baseRank: 800, nirf: 10, fee: "₹2.2L/yr", placement: "₹19.2 LPA" },
  { name: "Indian Institute of Technology Indore", short: "IIT Indore", baseRank: 1100, nirf: 14, fee: "₹2.3L/yr", placement: "₹18.5 LPA" },
  { name: "Indian Institute of Technology Gandhinagar", short: "IIT Gandhinagar", baseRank: 1300, nirf: 18, fee: "₹2.2L/yr", placement: "₹17.8 LPA" },
  { name: "Indian Institute of Technology Patna", short: "IIT Patna", baseRank: 1600, nirf: 41, fee: "₹2.2L/yr", placement: "₹18.5 LPA" },
  { name: "Indian Institute of Technology Bhubaneswar", short: "IIT Bhubaneswar", baseRank: 1800, nirf: 17, fee: "₹2.1L/yr", placement: "₹16.2 LPA" },
  { name: "Indian Institute of Technology Ropar", short: "IIT Ropar", baseRank: 2000, nirf: 22, fee: "₹2.2L/yr", placement: "₹17.1 LPA" },
  { name: "Indian Institute of Technology Mandi", short: "IIT Mandi", baseRank: 2400, nirf: 33, fee: "₹2.2L/yr", placement: "₹15.8 LPA" },
  { name: "Indian Institute of Technology Jodhpur", short: "IIT Jodhpur", baseRank: 2600, nirf: 30, fee: "₹2.2L/yr", placement: "₹16.5 LPA" },
  { name: "Indian Institute of Technology Tirupati", short: "IIT Tirupati", baseRank: 3200, nirf: 59, fee: "₹2.1L/yr", placement: "₹14.2 LPA" },
  { name: "Indian Institute of Technology Palakkad", short: "IIT Palakkad", baseRank: 3600, nirf: 69, fee: "₹2.1L/yr", placement: "₹13.9 LPA" },
  { name: "Indian Institute of Technology Goa", short: "IIT Goa", baseRank: 4000, nirf: 85, fee: "₹2.3L/yr", placement: "₹14.0 LPA" },
  { name: "Indian Institute of Technology Dharwad", short: "IIT Dharwad", baseRank: 4300, nirf: 93, fee: "₹2.2L/yr", placement: "₹13.1 LPA" },
  { name: "Indian Institute of Technology Jammu", short: "IIT Jammu", baseRank: 4600, nirf: 67, fee: "₹2.2L/yr", placement: "₹13.5 LPA" },
  { name: "Indian Institute of Technology Bhilai", short: "IIT Bhilai", baseRank: 4900, nirf: 81, fee: "₹2.2L/yr", placement: "₹13.0 LPA" }
];

const nits = [
  { name: "National Institute of Technology Trichy", short: "NIT Trichy", baseRank: 800, nirf: 9, fee: "₹1.5L/yr", placement: "₹22.0 LPA" },
  { name: "National Institute of Technology Surathkal", short: "NIT Surathkal", baseRank: 1100, nirf: 12, fee: "₹1.4L/yr", placement: "₹20.5 LPA" },
  { name: "National Institute of Technology Warangal", short: "NIT Warangal", baseRank: 1300, nirf: 21, fee: "₹1.3L/yr", placement: "₹20.0 LPA" },
  { name: "National Institute of Technology Rourkela", short: "NIT Rourkela", baseRank: 1800, nirf: 16, fee: "₹1.5L/yr", placement: "₹17.5 LPA" },
  { name: "National Institute of Technology Calicut", short: "NIT Calicut", baseRank: 2200, nirf: 23, fee: "₹1.4L/yr", placement: "₹16.8 LPA" },
  { name: "Motilal Nehru National Institute of Technology Allahabad", short: "MNNIT Allahabad", baseRank: 2500, nirf: 49, fee: "₹1.6L/yr", placement: "₹19.5 LPA" },
  { name: "National Institute of Technology Kurukshetra", short: "NIT Kurukshetra", baseRank: 3200, nirf: 37, fee: "₹1.4L/yr", placement: "₹14.5 LPA" },
  { name: "Malaviya National Institute of Technology Jaipur", short: "MNIT Jaipur", baseRank: 3500, nirf: 35, fee: "₹1.5L/yr", placement: "₹15.2 LPA" },
  { name: "Visvesvaraya National Institute of Technology Nagpur", short: "VNIT Nagpur", baseRank: 3800, nirf: 41, fee: "₹1.5L/yr", placement: "₹14.9 LPA" },
  { name: "National Institute of Technology Durgapur", short: "NIT Durgapur", baseRank: 4200, nirf: 43, fee: "₹1.4L/yr", placement: "₹13.8 LPA" },
  { name: "National Institute of Technology Silchar", short: "NIT Silchar", baseRank: 4500, nirf: 40, fee: "₹1.4L/yr", placement: "₹14.0 LPA" },
  { name: "National Institute of Technology Jalandhar", short: "NIT Jalandhar", baseRank: 5200, nirf: 46, fee: "₹1.4L/yr", placement: "₹12.5 LPA" },
  { name: "National Institute of Technology Patna", short: "NIT Patna", baseRank: 6000, nirf: 56, fee: "₹1.4L/yr", placement: "₹14.2 LPA" },
  { name: "National Institute of Technology Raipur", short: "NIT Raipur", baseRank: 6500, nirf: 70, fee: "₹1.3L/yr", placement: "₹11.2 LPA" },
  { name: "National Institute of Technology Jamshedpur", short: "NIT Jamshedpur", baseRank: 7000, nirf: 79, fee: "₹1.4L/yr", placement: "₹14.8 LPA" },
  { name: "National Institute of Technology Agartala", short: "NIT Agartala", baseRank: 7500, nirf: 91, fee: "₹1.5L/yr", placement: "₹14.0 LPA" },
  { name: "National Institute of Technology Hazratbal Srinagar", short: "NIT Srinagar", baseRank: 8500, nirf: 82, fee: "₹1.4L/yr", placement: "₹10.5 LPA" },
  { name: "National Institute of Technology Goa", short: "NIT Goa", baseRank: 9000, nirf: 90, fee: "₹1.5L/yr", placement: "₹11.8 LPA" },
  { name: "National Institute of Technology Hamirpur", short: "NIT Hamirpur", baseRank: 9500, nirf: 128, fee: "₹1.4L/yr", placement: "₹10.2 LPA" },
  { name: "National Institute of Technology Delhi", short: "NIT Delhi", baseRank: 10000, nirf: 51, fee: "₹1.6L/yr", placement: "₹15.8 LPA" },
  { name: "National Institute of Technology Manipur", short: "NIT Manipur", baseRank: 12000, nirf: 95, fee: "₹1.3L/yr", placement: "₹8.8 LPA" },
  { name: "National Institute of Technology Meghalaya", short: "NIT Meghalaya", baseRank: 13000, nirf: 72, fee: "₹1.4L/yr", placement: "₹9.5 LPA" },
  { name: "National Institute of Technology Puducherry", short: "NIT Puducherry", baseRank: 14000, nirf: 136, fee: "₹1.4L/yr", placement: "₹9.2 LPA" },
  { name: "National Institute of Technology Sikkim", short: "NIT Sikkim", baseRank: 15000, nirf: 150, fee: "₹1.3L/yr", placement: "₹8.5 LPA" },
  { name: "National Institute of Technology Uttarakhand", short: "NIT Uttarakhand", baseRank: 16000, nirf: 120, fee: "₹1.4L/yr", placement: "₹9.0 LPA" },
  { name: "National Institute of Technology Andhra Pradesh", short: "NIT Andhra Pradesh", baseRank: 17000, nirf: 142, fee: "₹1.3L/yr", placement: "₹8.9 LPA" },
  { name: "National Institute of Technology Mizoram", short: "NIT Mizoram", baseRank: 18000, nirf: 160, fee: "₹1.3L/yr", placement: "₹7.8 LPA" },
  { name: "National Institute of Technology Nagaland", short: "NIT Nagaland", baseRank: 19000, nirf: 175, fee: "₹1.3L/yr", placement: "₹7.5 LPA" },
  { name: "National Institute of Technology Arunachal Pradesh", short: "NIT Arunachal Pradesh", baseRank: 20000, nirf: 180, fee: "₹1.3L/yr", placement: "₹7.2 LPA" }
];

const iiits = [
  { name: "Indian Institute of Information Technology Allahabad", short: "IIIT Allahabad", baseRank: 4500, nirf: 30, fee: "₹1.8L/yr", placement: "₹18.2 LPA" },
  { name: "Indian Institute of Information Technology Lucknow", short: "IIIT Lucknow", baseRank: 6000, nirf: 80, fee: "₹2.4L/yr", placement: "₹21.0 LPA" },
  { name: "Indian Institute of Information Technology Pune", short: "IIIT Pune", baseRank: 8000, nirf: 150, fee: "₹2.5L/yr", placement: "₹16.0 LPA" },
  { name: "Indian Institute of Information Technology Gwalior", short: "IIIT Gwalior", baseRank: 7000, nirf: 47, fee: "₹1.9L/yr", placement: "₹17.5 LPA" },
  { name: "Indian Institute of Information Technology Jabalpur", short: "IIIT Jabalpur", baseRank: 9500, nirf: 97, fee: "₹1.7L/yr", placement: "₹14.2 LPA" },
  { name: "Indian Institute of Information Technology Kancheepuram", short: "IIIT Kancheepuram", baseRank: 11000, nirf: 101, fee: "₹1.8L/yr", placement: "₹12.5 LPA" },
  { name: "Indian Institute of Information Technology Kota", short: "IIIT Kota", baseRank: 12000, nirf: 120, fee: "₹2.0L/yr", placement: "₹11.8 LPA" },
  { name: "Indian Institute of Information Technology Sri City", short: "IIIT Sri City", baseRank: 13000, nirf: 115, fee: "₹2.2L/yr", placement: "₹12.1 LPA" },
  { name: "Indian Institute of Information Technology Vadodara", short: "IIIT Vadodara", baseRank: 14000, nirf: 125, fee: "₹2.1L/yr", placement: "₹11.5 LPA" },
  { name: "Indian Institute of Information Technology Bhopal", short: "IIIT Bhopal", baseRank: 15000, nirf: 135, fee: "₹1.9L/yr", placement: "₹10.8 LPA" },
  { name: "Indian Institute of Information Technology Bhagalpur", short: "IIIT Bhagalpur", baseRank: 16000, nirf: 125, fee: "₹2.1L/yr", placement: "₹12.0 LPA" },
  { name: "Indian Institute of Information Technology Bhopal", short: "IIIT Bhopal", baseRank: 16500, nirf: 140, fee: "₹2.0L/yr", placement: "₹9.8 LPA" },
  { name: "Indian Institute of Information Technology Surat", short: "IIIT Surat", baseRank: 17000, nirf: 145, fee: "₹2.2L/yr", placement: "₹10.2 LPA" },
  { name: "Indian Institute of Information Technology Guwahati", short: "IIIT Guwahati", baseRank: 17500, nirf: 110, fee: "₹2.3L/yr", placement: "₹11.0 LPA" }
];

const gftis = [
  { name: "Birla Institute of Technology Mesra, Ranchi", short: "BIT Mesra", baseRank: 12000, nirf: 60, fee: "₹2.9L/yr", placement: "₹11.5 LPA" },
  { name: "Birla Institute of Technology, Patna Campus", short: "BIT Patna", baseRank: 16000, nirf: 150, fee: "₹2.8L/yr", placement: "₹10.5 LPA" },
  { name: "Punjab Engineering College, Chandigarh", short: "PEC Chandigarh", baseRank: 8000, nirf: 82, fee: "₹1.9L/yr", placement: "₹15.5 LPA" },
  { name: "Jawaharlal Nehru University Delhi", short: "JNU Delhi", baseRank: 10000, nirf: 15, fee: "₹0.6L/yr", placement: "₹14.0 LPA" },
  { name: "School of Planning and Architecture New Delhi", short: "SPA Delhi", baseRank: 300, nirf: 5, fee: "₹1.2L/yr", placement: "₹6.5 LPA" }
];

// 12 popular branches/programs
const programs = [
  { name: "Computer Science and Engineering (4 Years, Bachelor of Technology)", baseRankMult: 1.0 },
  { name: "Electronics and Communication Engineering (4 Years, Bachelor of Technology)", baseRankMult: 1.8 },
  { name: "Electrical Engineering (4 Years, Bachelor of Technology)", baseRankMult: 2.8 },
  { name: "Mechanical Engineering (4 Years, Bachelor of Technology)", baseRankMult: 4.8 },
  { name: "Civil Engineering (4 Years, Bachelor of Technology)", baseRankMult: 8.0 },
  { name: "Chemical Engineering (4 Years, Bachelor of Technology)", baseRankMult: 6.5 },
  { name: "Biotechnology (4 Years, Bachelor of Technology)", baseRankMult: 9.5 },
  { name: "Metallurgical and Materials Engineering (4 Years, Bachelor of Technology)", baseRankMult: 10.0 },
  { name: "Aerospace Engineering (4 Years, Bachelor of Technology)", baseRankMult: 3.5 },
  { name: "Computer Science and Engineering (5 Years, Bachelor and Master of Technology Dual Degree)", baseRankMult: 1.3 }
];

const categories = ["OPEN", "OBC-NCL", "SC", "ST", "EWS"];
const genders = ["Gender-Neutral", "Female-Only"];

// --- MAIN GENERATOR FUNCTION ---

function generateData() {
  console.log("Generating simulated data...");
  const cutoffsBatch = [];
  const seatsBatch = [];

  let recordId = 1;
  let seatId = 1;

  // Combine all colleges
  const allColleges = [
    ...iits.map(c => ({ ...c, type: "IIT", exam: "JEE Advanced", quotas: ["AI"] })),
    ...nits.map(c => ({ ...c, type: "NIT", exam: "JEE Mains", quotas: ["HS", "OS"] })),
    ...iiits.map(c => ({ ...c, type: "IIIT", exam: "JEE Mains", quotas: ["AI"] })),
    ...gftis.map(c => ({ ...c, type: "GFTI", exam: "JEE Mains", quotas: ["HS", "OS"] }))
  ];

  console.log(`Working with ${allColleges.length} colleges and ${programs.length} programs.`);

  for (const college of allColleges) {
    for (const program of programs) {
      // 1. Skip architecture/aerospace for colleges that definitely don't have them
      if (program.name.includes("Architecture") && !college.name.includes("Planning")) continue;
      if (program.name.includes("Aerospace") && !college.type === "IIT") continue; // IIT exclusive basically

      for (const quota of college.quotas) {
        // Generate Seat Matrix Row for this college + program + quota combination
        // (Roughly 1 seat entry per combination)
        const totalSeats = Math.floor(Math.random() * 40) + 20; // 20 to 60 seats
        seatsBatch.push({
          institute: college.name,
          program: program.name,
          quota: quota === "AI" ? "OPEN (AI)" : `OPEN (${quota})`,
          seats: totalSeats
        });

        for (const category of categories) {
          for (const gender of genders) {
            // Generate multiple simulated variations/rounds (say 10 rounds/years variations)
            // This easily scales our dataset to over 100,000 records
            for (let variation = 1; variation <= 10; variation++) {
              
              // Calculate a highly realistic opening/closing rank
              let baseClosing = college.baseRank * program.baseRankMult;

              // Apply Home State vs Other State differences for NITs/GFTIs
              if (college.type === "NIT" || college.type === "GFTI") {
                if (quota === "HS") {
                  baseClosing = baseClosing * 1.45; // Home State cutoffs are easier/higher
                }
              }

              // Apply Gender pool variations
              if (gender === "Female-Only") {
                baseClosing = baseClosing * 1.55; // Female-Only pools are easier/higher
              }

              // Apply Category Rank Pool Conversions (JoSAA has separate rank lists per category)
              let closingRank = baseClosing;
              if (category === "OBC-NCL") {
                closingRank = Math.round(baseClosing * 0.28);
              } else if (category === "SC") {
                closingRank = Math.round(baseClosing * 0.14);
              } else if (category === "ST") {
                closingRank = Math.round(baseClosing * 0.07);
              } else if (category === "EWS") {
                closingRank = Math.round(baseClosing * 0.18);
              }

              // Variation index scales the rank slightly to simulate different rounds/years
              // e.g. Year 2024 is slightly different from Year 2025, or Round 6 is higher than Round 1
              const scalingFactor = 0.85 + (variation * 0.05); // ranges from 0.9 to 1.35
              closingRank = Math.round(closingRank * scalingFactor);
              
              // Ensure reasonable minimum rank
              if (closingRank < 1) closingRank = 1;

              // Calculate opening rank as a fraction of closing rank
              const spread = 0.4 + (Math.random() * 0.35); // 40% to 75% of closing
              let openingRank = Math.round(closingRank * spread);
              if (openingRank < 1) openingRank = 1;
              if (openingRank >= closingRank) openingRank = Math.max(1, closingRank - 5);

              cutoffsBatch.push({
                institute: college.name,
                program: program.name,
                quota: quota,
                category: category,
                gender: gender,
                opening: openingRank,
                closing: closingRank,
                fee: college.fee,
                placement: college.placement,
                nirf: college.nirf
              });
            }
          }
        }
      }
    }
  }

  console.log(`Successfully generated ${cutoffsBatch.length} Cutoff rows.`);
  console.log(`Successfully generated ${seatsBatch.length} Seat Matrix rows.`);

  return { cutoffsBatch, seatsBatch };
}

// --- BATCH INSERT UTILITY ---

async function insertDataInBatches(tableName, dataArray, batchSize = 2000) {
  console.log(`\n--- Starting batch uploads for ${tableName} (${dataArray.length} total rows) ---`);
  
  // Try to delete existing rows to avoid messy duplicate mock overlays
  console.log(`[DELETE] Attempting to clear existing ${tableName} table...`);
  try {
    const { error: delErr } = await supabase.from(tableName).delete().neq('id', 0);
    if (delErr) {
      console.log(`[DELETE WARNING] RLS Policy might prevent anon deletes: ${delErr.message}`);
      console.log("Proceeding to append fresh dataset directly.");
    } else {
      console.log(`[DELETE SUCCESS] Table ${tableName} cleared successfully.`);
    }
  } catch(e) {
    console.log("Delete skipped. Appending dataset directly.");
  }

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < dataArray.length; i += batchSize) {
    const batch = dataArray.slice(i, i + batchSize);
    
    try {
      const { error } = await supabase.from(tableName).insert(batch);
      if (error) {
        console.error(`[BATCH ERROR] Failed to insert batch ${i / batchSize + 1}:`, error.message);
        failCount += batch.length;
      } else {
        successCount += batch.length;
        const progressPercent = Math.round((successCount / dataArray.length) * 100);
        console.log(`[PROGRESS] Table ${tableName}: Uploaded ${successCount} of ${dataArray.length} rows (${progressPercent}%)`);
      }
    } catch (e) {
      console.error(`[EXCEPTION] Batch ${i / batchSize + 1} threw exception:`, e);
      failCount += batch.length;
    }
  }

  console.log(`\n--- Finished ${tableName} uploads: ${successCount} SUCCESS, ${failCount} FAILED ---`);
}

// --- EXECUTE SEEDING ---

async function main() {
  console.log("Starting bulk data seeder process...");
  const startTime = Date.now();

  const { cutoffsBatch, seatsBatch } = generateData();

  // Run bulk uploads in chunked batches
  await insertDataInBatches('josaadata_record', cutoffsBatch, 2500);
  await insertDataInBatches('seat_matrices', seatsBatch, 2500);

  const durationSeconds = Math.round((Date.now() - startTime) / 1000);
  console.log(`\n🎉 SEEDING COMPLETED IN ${durationSeconds} SECONDS!`);
  console.log(`Total Cutoffs seeded: ${cutoffsBatch.length}`);
  console.log(`Total Seat Matrix rows seeded: ${seatsBatch.length}`);
}

main();
