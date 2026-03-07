// ============================================================
// KRISHI MITRA — Real Indian Agricultural Data
// Sources: Ministry of Agriculture, SMAM Portal, IMD, eNAM
// ============================================================

// ---- MSP Rates (Minimum Support Price) ----
// Source: Commission for Agricultural Costs & Prices (CACP)
// Year: 2024-25

window.D = window.D || {};
window.D.MSP_KHARIF = [
    { crop: 'Paddy (Common)', msp: 2300, unit: '₹/qtl', prevMsp: 2183, icon: '🌾' },
    { crop: 'Paddy (Grade A)', msp: 2320, unit: '₹/qtl', prevMsp: 2203, icon: '🌾' },
    { crop: 'Jowar (Hybrid)', msp: 3371, unit: '₹/qtl', prevMsp: 3180, icon: '🌿' },
    { crop: 'Jowar (Maldandi)', msp: 3421, unit: '₹/qtl', prevMsp: 3225, icon: '🌿' },
    { crop: 'Bajra', msp: 2625, unit: '₹/qtl', prevMsp: 2500, icon: '🌾' },
    { crop: 'Ragi', msp: 4290, unit: '₹/qtl', prevMsp: 3846, icon: '🌱' },
    { crop: 'Maize', msp: 2225, unit: '₹/qtl', prevMsp: 2090, icon: '🌽' },
    { crop: 'Tur (Arhar)', msp: 7550, unit: '₹/qtl', prevMsp: 7000, icon: '🫘' },
    { crop: 'Moong', msp: 8682, unit: '₹/qtl', prevMsp: 8558, icon: '🫘' },
    { crop: 'Urad', msp: 7400, unit: '₹/qtl', prevMsp: 6950, icon: '🫘' },
    { crop: 'Groundnut', msp: 6783, unit: '₹/qtl', prevMsp: 6377, icon: '🥜' },
    { crop: 'Sunflower Seed', msp: 7280, unit: '₹/qtl', prevMsp: 6760, icon: '🌻' },
    { crop: 'Soybean (Yellow)', msp: 4892, unit: '₹/qtl', prevMsp: 4600, icon: '🫘' },
    { crop: 'Sesamum', msp: 9267, unit: '₹/qtl', prevMsp: 8635, icon: '🌱' },
    { crop: 'Niger Seed', msp: 8717, unit: '₹/qtl', prevMsp: 7734, icon: '🌱' },
    { crop: 'Cotton (Medium)', msp: 7121, unit: '₹/qtl', prevMsp: 6620, icon: '🏵️' },
    { crop: 'Cotton (Long)', msp: 7521, unit: '₹/qtl', prevMsp: 7020, icon: '🏵️' },
];

window.D = window.D || {};
window.D.MSP_RABI = [
    { crop: 'Wheat', msp: 2275, unit: '₹/qtl', prevMsp: 2125, icon: '🌾' },
    { crop: 'Barley', msp: 1850, unit: '₹/qtl', prevMsp: 1735, icon: '🌾' },
    { crop: 'Gram (Chana)', msp: 5650, unit: '₹/qtl', prevMsp: 5335, icon: '🫘' },
    { crop: 'Masur (Lentil)', msp: 6425, unit: '₹/qtl', prevMsp: 6000, icon: '🫘' },
    { crop: 'Rapeseed/Mustard', msp: 5950, unit: '₹/qtl', prevMsp: 5650, icon: '🌼' },
    { crop: 'Safflower', msp: 5800, unit: '₹/qtl', prevMsp: 5650, icon: '🌸' },
];

window.D = window.D || {};
window.D.SUGARCANE_FRP = { price: 340, unit: '₹/qtl', year: '2024-25' };

// ---- Subsidy Data (SMAM - Sub Mission on Agricultural Mechanization) ----
// Source: SMAM Portal, Ministry of Agriculture

window.D = window.D || {};
window.D.SUBSIDY_CATEGORIES = {
    general: { label: 'General Category', subsidyPercent: 40, color: '#3b82f6' },
    sc_st: { label: 'SC/ST Farmer', subsidyPercent: 50, color: '#8b5cf6' },
    small_marginal: { label: 'Small & Marginal Farmer', subsidyPercent: 50, color: '#22c55e' },
    women: { label: 'Women Farmer', subsidyPercent: 50, color: '#ec4899' },
    northeast: { label: 'North-East Region', subsidyPercent: 60, color: '#f59e0b' },
};

window.D = window.D || {};
window.D.TRACTOR_SUBSIDIES = [
    { hpRange: 'Up to 8 HP (Power Tiller)', general: { percent: 40, max: 75000 }, scst: { percent: 50, max: 100000 }, approxCost: 200000 },
    { hpRange: '8-20 HP (Mini Tractor)', general: { percent: 25, max: 100000 }, scst: { percent: 25, max: 125000 }, approxCost: 400000 },
    { hpRange: '20-35 HP (Medium Tractor)', general: { percent: 25, max: 75000 }, scst: { percent: 25, max: 100000 }, approxCost: 550000 },
    { hpRange: '35-55 HP (Standard Tractor)', general: { percent: 20, max: 60000 }, scst: { percent: 25, max: 75000 }, approxCost: 750000 },
    { hpRange: 'Above 55 HP (Heavy Tractor)', general: { percent: 0, max: 0 }, scst: { percent: 0, max: 0 }, approxCost: 1200000, note: 'Not covered under SMAM. State schemes may apply.' },
];

window.D = window.D || {};
window.D.IMPLEMENT_SUBSIDIES = [
    { id: 1, name: 'MB Plough', category: 'Tillage', subsidyPercent: 50, maxSubsidy: 16000, approxCost: 35000, icon: '🔩' },
    { id: 2, name: 'Disc Plough', category: 'Tillage', subsidyPercent: 50, maxSubsidy: 30000, approxCost: 65000, icon: '⚙️' },
    { id: 3, name: 'Cultivator', category: 'Tillage', subsidyPercent: 50, maxSubsidy: 16000, approxCost: 30000, icon: '🔧' },
    { id: 4, name: 'Rotavator', category: 'Tillage', subsidyPercent: 50, maxSubsidy: 50000, approxCost: 120000, icon: '⚙️' },
    { id: 5, name: 'Disc Harrow', category: 'Tillage', subsidyPercent: 50, maxSubsidy: 25000, approxCost: 55000, icon: '🔩' },
    { id: 6, name: 'Seed Drill', category: 'Sowing', subsidyPercent: 50, maxSubsidy: 32000, approxCost: 70000, icon: '🌱' },
    { id: 7, name: 'Zero Till Seed Drill', category: 'Sowing', subsidyPercent: 50, maxSubsidy: 30000, approxCost: 65000, icon: '🌱' },
    { id: 8, name: 'Seed-cum-Fertilizer Drill', category: 'Sowing', subsidyPercent: 50, maxSubsidy: 35000, approxCost: 80000, icon: '🌱' },
    { id: 9, name: 'Paddy Transplanter (Walk-behind)', category: 'Transplanting', subsidyPercent: 50, maxSubsidy: 150000, approxCost: 250000, icon: '🌾' },
    { id: 10, name: 'Paddy Transplanter (Ride-on)', category: 'Transplanting', subsidyPercent: 40, maxSubsidy: 300000, approxCost: 800000, icon: '🌾' },
    { id: 11, name: 'Power Sprayer', category: 'Plant Protection', subsidyPercent: 50, maxSubsidy: 10000, approxCost: 22000, icon: '💦' },
    { id: 12, name: 'Boom Sprayer', category: 'Plant Protection', subsidyPercent: 50, maxSubsidy: 25000, approxCost: 55000, icon: '💦' },
    { id: 13, name: 'Agricultural Drone', category: 'Plant Protection', subsidyPercent: 40, maxSubsidy: 400000, approxCost: 1000000, icon: '🤖' },
    { id: 14, name: 'Reaper', category: 'Harvesting', subsidyPercent: 50, maxSubsidy: 100000, approxCost: 200000, icon: '🔪' },
    { id: 15, name: 'Self-Propelled Reaper', category: 'Harvesting', subsidyPercent: 40, maxSubsidy: 200000, approxCost: 500000, icon: '🔪' },
    { id: 16, name: 'Combine Harvester (Self-Propelled)', category: 'Harvesting', subsidyPercent: 40, maxSubsidy: 1000000, approxCost: 2500000, icon: '🚜' },
    { id: 17, name: 'Thresher', category: 'Post-Harvest', subsidyPercent: 50, maxSubsidy: 60000, approxCost: 120000, icon: '⚙️' },
    { id: 18, name: 'Straw/Stubble Management (Happy Seeder)', category: 'Residue Mgmt', subsidyPercent: 50, maxSubsidy: 80000, approxCost: 165000, icon: '🌿' },
    { id: 19, name: 'Laser Land Leveller', category: 'Land Development', subsidyPercent: 50, maxSubsidy: 150000, approxCost: 300000, icon: '📐' },
    { id: 20, name: 'Chaff Cutter (Power Operated)', category: 'Post-Harvest', subsidyPercent: 50, maxSubsidy: 20000, approxCost: 45000, icon: '✂️' },
    { id: 21, name: 'Mulcher/Shredder', category: 'Residue Mgmt', subsidyPercent: 50, maxSubsidy: 100000, approxCost: 200000, icon: '🌿' },
    { id: 22, name: 'Potato Planter', category: 'Sowing', subsidyPercent: 50, maxSubsidy: 40000, approxCost: 90000, icon: '🥔' },
    { id: 23, name: 'Sugarcane Cutter Planter', category: 'Sowing', subsidyPercent: 50, maxSubsidy: 70000, approxCost: 150000, icon: '🌾' },
    { id: 24, name: 'Drip Irrigation System (per hectare)', category: 'Irrigation', subsidyPercent: 55, maxSubsidy: 60000, approxCost: 110000, icon: '💧' },
    { id: 25, name: 'Sprinkler Irrigation Set', category: 'Irrigation', subsidyPercent: 50, maxSubsidy: 30000, approxCost: 65000, icon: '💧' },
];

// ---- Custom Hiring Rates ----
// Source: CHC Market rates (average across India)

window.D = window.D || {};
window.D.HIRING_SERVICES = [
    { id: 1, service: 'Tractor with Cultivator', rate: 600, unit: 'per hour', icon: '🚜', category: 'Tillage', description: 'Basic field preparation with 35-45 HP tractor' },
    { id: 2, service: 'Tractor with Rotavator', rate: 1000, unit: 'per hour', icon: '🚜', category: 'Tillage', description: 'Fine soil preparation for seedbed' },
    { id: 3, service: 'Tractor with MB Plough', rate: 700, unit: 'per hour', icon: '🚜', category: 'Tillage', description: 'Deep ploughing for heavy soils' },
    { id: 4, service: 'Laser Land Levelling', rate: 1200, unit: 'per hour', icon: '📐', category: 'Land Dev', description: 'Precision levelling with laser equipment' },
    { id: 5, service: 'Paddy Transplanting', rate: 1800, unit: 'per acre', icon: '🌾', category: 'Sowing', description: 'Mechanical paddy transplanting' },
    { id: 6, service: 'Seed Drill Sowing', rate: 500, unit: 'per acre', icon: '🌱', category: 'Sowing', description: 'Row sowing with seed drill' },
    { id: 7, service: 'Combine Harvesting (Wheat)', rate: 2200, unit: 'per acre', icon: '🚜', category: 'Harvesting', description: 'Combined harvesting and threshing' },
    { id: 8, service: 'Combine Harvesting (Paddy)', rate: 2800, unit: 'per acre', icon: '🚜', category: 'Harvesting', description: 'Paddy harvesting with combine' },
    { id: 9, service: 'Reaper Harvesting', rate: 800, unit: 'per acre', icon: '🔪', category: 'Harvesting', description: 'Crop cutting with self-propelled reaper' },
    { id: 10, service: 'Threshing', rate: 500, unit: 'per hour', icon: '⚙️', category: 'Post-Harvest', description: 'Grain separation from straw' },
    { id: 11, service: 'Drone Spraying', rate: 500, unit: 'per acre', icon: '🤖', category: 'Spraying', description: 'Precision pesticide/fertilizer application' },
    { id: 12, service: 'Power Sprayer', rate: 400, unit: 'per acre', icon: '💦', category: 'Spraying', description: 'Tractor-mounted boom spraying' },
    { id: 13, service: 'Trolley/Transport', rate: 300, unit: 'per trip', icon: '🛒', category: 'Transport', description: 'Agricultural produce transport (up to 10 km)' },
    { id: 14, service: 'Baler (Straw)', rate: 50, unit: 'per bale', icon: '📦', category: 'Post-Harvest', description: 'Straw/residue baling service' },
    { id: 15, service: 'Happy Seeder', rate: 1500, unit: 'per acre', icon: '🌿', category: 'Residue Mgmt', description: 'Direct sowing in standing stubble' },
];

// ---- Government Schemes ----
// Source: Ministry of Agriculture & Farmer Welfare

window.D = window.D || {};
window.D.GOV_SCHEMES = [
    {
        id: 'smam',
        name: 'SMAM (Sub-Mission on Agricultural Mechanization)',
        ministry: 'Ministry of Agriculture & Farmer Welfare',
        description: 'Provides subsidies for purchasing farm machinery and equipment to promote mechanized farming.',
        benefits: ['40-50% subsidy on farm equipment', 'Custom Hiring Center establishment support', 'Hi-Tech Hub support for precision farming'],
        eligibility: 'Individual farmers, SHGs, FPOs, Cooperatives, Panchayats, State Govt agencies',
        subsidy: '25-50% of equipment cost (varies by category)',
        website: 'https://agrimachinery.nic.in',
        status: 'Active',
        icon: '🚜'
    },
    {
        id: 'pmkisan',
        name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
        ministry: 'Ministry of Agriculture & Farmer Welfare',
        description: 'Direct income support of ₹6,000 per year to all landholding farmer families.',
        benefits: ['₹6,000/year in 3 installments of ₹2,000 each', 'Directly transferred to bank account', 'No intermediary'],
        eligibility: 'All landholding farmer families (subject to exclusion criteria)',
        subsidy: '₹6,000 per year',
        website: 'https://pmkisan.gov.in',
        status: 'Active',
        icon: '💰'
    },
    {
        id: 'pmfby',
        name: 'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
        ministry: 'Ministry of Agriculture & Farmer Welfare',
        description: 'Crop insurance scheme covering yield losses due to natural calamities, pests, and diseases.',
        benefits: ['Low premium: 2% Kharif, 1.5% Rabi, 5% Commercial crops', 'No cap on subsidy, full claim for losses', 'Coverage for standing crops, post-harvest losses'],
        eligibility: 'All farmers growing notified crops in notified areas',
        subsidy: 'Premium subsidy shared by Centre and State',
        website: 'https://pmfby.gov.in',
        status: 'Active',
        icon: '🛡️'
    },
    {
        id: 'kcc',
        name: 'KCC (Kisan Credit Card)',
        ministry: 'Ministry of Finance / NABARD',
        description: 'Provides short-term credit to farmers for crop production, post-harvest, and allied activities at subsidized interest rates.',
        benefits: ['Credit limit up to ₹3 lakh at 4% interest', 'Interest subvention of 3%', 'Coverage for crop + allied activities', 'ATM-enabled card for easy access'],
        eligibility: 'All farmers (including tenant farmers, sharecroppers, SHGs)',
        subsidy: 'Interest subvention making effective rate 4% p.a.',
        website: 'https://www.nabard.org',
        status: 'Active',
        icon: '💳'
    },
    {
        id: 'rkvy',
        name: 'RKVY-RAFTAAR (Rashtriya Krishi Vikas Yojana)',
        ministry: 'Ministry of Agriculture & Farmer Welfare',
        description: 'Incentivizes states to increase investment in agriculture to achieve higher growth.',
        benefits: ['Infrastructure development', 'Innovation and agri-entrepreneurship', 'Value chain development', 'Capacity building'],
        eligibility: 'State Governments, Agri-startups, FPOs',
        subsidy: 'Project-based funding',
        website: 'https://rkvy.nic.in',
        status: 'Active',
        icon: '📈'
    },
    {
        id: 'pmkmy',
        name: 'PM-KMY (Pradhan Mantri Kisan Maandhan Yojana)',
        ministry: 'Ministry of Agriculture & Farmer Welfare',
        description: 'Pension scheme for small and marginal farmers ensuring social security after retirement.',
        benefits: ['₹3,000/month pension after age 60', 'Nominal premium ₹55-200/month based on entry age', 'Government matches equal contribution'],
        eligibility: 'Small & marginal farmers (land up to 2 hectares) aged 18-40 years',
        subsidy: 'Government contributes equal amount',
        website: 'https://maandhan.in',
        status: 'Active',
        icon: '🏦'
    },
    {
        id: 'soil_health',
        name: 'Soil Health Card Scheme',
        ministry: 'Ministry of Agriculture & Farmer Welfare',
        description: 'Provides soil health cards to farmers with info on nutrient status and recommendations for soil management.',
        benefits: ['Free soil testing', 'Crop-wise fertilizer recommendations', 'Issued every 2 years', 'Available in local language'],
        eligibility: 'All farmers',
        subsidy: 'Free of cost',
        website: 'https://soilhealth.dac.gov.in',
        status: 'Active',
        icon: '🧪'
    },
    {
        id: 'enam',
        name: 'e-NAM (National Agriculture Market)',
        ministry: 'Ministry of Agriculture & Farmer Welfare',
        description: 'Pan-India electronic trading portal networking existing APMCs for transparent price discovery.',
        benefits: ['Transparent bidding', 'Better prices with wider market access', 'Online payment', 'Quality assaying at mandi'],
        eligibility: 'All farmers, traders, FPOs, APMC mandis',
        subsidy: 'Free registration, no cost to farmers',
        website: 'https://enam.gov.in',
        status: 'Active',
        icon: '🏪'
    },
];

// ---- Implement Catalog (for Management module) ----

window.D = window.D || {};
window.D.IMPLEMENT_CATEGORIES = [
    'Tractor', 'Power Tiller', 'Tillage', 'Sowing', 'Transplanting',
    'Plant Protection', 'Harvesting', 'Post-Harvest', 'Irrigation',
    'Residue Management', 'Land Development', 'Transport'
];

window.D = window.D || {};
window.D.SAMPLE_IMPLEMENTS = [
    { id: 1, name: 'Mahindra 575 DI', category: 'Tractor', hp: 45, year: 2022, condition: 'Good', status: 'active', owner: 'Ramesh Yadav', village: 'Chandpur', verified: true, value: 625000 },
    { id: 2, name: 'Sonalika DI 60 RX', category: 'Tractor', hp: 60, year: 2021, condition: 'Excellent', status: 'active', owner: 'Suresh Patel', village: 'Mohammadpur', verified: true, value: 850000 },
    { id: 3, name: 'Swaraj 744 FE', category: 'Tractor', hp: 48, year: 2020, condition: 'Good', status: 'active', owner: 'Krishna Reddy', village: 'Nandgaon', verified: true, value: 595000 },
    { id: 4, name: 'John Deere 5050D', category: 'Tractor', hp: 50, year: 2023, condition: 'Excellent', status: 'active', owner: 'Gurmeet Singh', village: 'Jatpur', verified: true, value: 780000 },
    { id: 5, name: 'VST Shakti 130DI', category: 'Power Tiller', hp: 13, year: 2022, condition: 'Good', status: 'active', owner: 'Lakshmi Devi', village: 'Raghopur', verified: true, value: 185000 },
    { id: 6, name: 'Shaktiman Rotavator 6ft', category: 'Tillage', hp: null, year: 2021, condition: 'Fair', status: 'active', owner: 'Ramesh Yadav', village: 'Chandpur', verified: true, value: 95000 },
    { id: 7, name: 'Landforce Seed Drill 9-Row', category: 'Sowing', hp: null, year: 2023, condition: 'Excellent', status: 'active', owner: 'Pradeep Sharma', village: 'Baisakh', verified: false, value: 68000 },
    { id: 8, name: 'Jai Kisaan Thresher', category: 'Post-Harvest', hp: null, year: 2019, condition: 'Fair', status: 'maintenance', owner: 'Bhola Nath', village: 'Fatehpur', verified: true, value: 85000 },
    { id: 9, name: 'Combine Harvester (Kartar 4000)', category: 'Harvesting', hp: null, year: 2020, condition: 'Good', status: 'active', owner: 'Cooperative Society', village: 'Jatpur', verified: true, value: 2200000 },
    { id: 10, name: 'Boom Sprayer (KK-BS40)', category: 'Plant Protection', hp: null, year: 2022, condition: 'Good', status: 'active', owner: 'FPO Chandpur', village: 'Chandpur', verified: true, value: 48000 },
    { id: 11, name: 'Laser Land Leveller (Trimble)', category: 'Land Development', hp: null, year: 2023, condition: 'Excellent', status: 'active', owner: 'CHC Block Office', village: 'Block HQ', verified: true, value: 380000 },
    { id: 12, name: 'Happy Seeder (Turbo)', category: 'Residue Management', hp: null, year: 2022, condition: 'Good', status: 'active', owner: 'Gurmeet Singh', village: 'Jatpur', verified: true, value: 160000 },
];

// ---- Marketplace Sample Listings ----

window.D = window.D || {};
window.D.MARKETPLACE_LISTINGS = [
    { id: 1, title: 'Mahindra 275 DI - Well Maintained', type: 'sale', category: 'Tractor', price: 350000, location: 'Varanasi, UP', condition: 'Good', year: 2018, image: '🚜', seller: 'Amit Kumar', phone: '98XXXXX001', description: '1200 hours, single owner, new tyres, all papers ready', featured: true },
    { id: 2, title: 'Rotavator 5ft - Like New', type: 'sale', category: 'Tillage', price: 55000, location: 'Lucknow, UP', condition: 'Excellent', year: 2023, image: '⚙️', seller: 'FPO Green Fields', phone: '98XXXXX002', description: 'Used for one season only, with mounting kit' },
    { id: 3, title: 'New Holland 3630 TX Plus', type: 'sale', category: 'Tractor', price: 520000, location: 'Jaipur, Rajasthan', condition: 'Good', year: 2019, image: '🚜', seller: 'Rajesh Meena', phone: '98XXXXX003', description: '55 HP, AC cabin, 2000 hrs, well maintained', featured: true },
    { id: 4, title: 'Combine Harvester - Rent Available', type: 'rent', category: 'Harvesting', price: 3000, priceUnit: 'per acre', location: 'Karnal, Haryana', condition: 'Good', year: 2021, image: '🚜', seller: 'Haryana CHC', phone: '98XXXXX004', description: 'Available for wheat and paddy season' },
    { id: 5, title: 'Drone Sprayer DJI Agras T30', type: 'rent', category: 'Plant Protection', price: 600, priceUnit: 'per acre', location: 'Pune, Maharashtra', condition: 'Excellent', year: 2024, image: '🤖', seller: 'AgriDrone Services', phone: '98XXXXX005', description: 'Professional drone spraying with trained pilot' },
    { id: 6, title: 'Seed Drill 11 Row - Urgent Sale', type: 'sale', category: 'Sowing', price: 32000, location: 'Indore, MP', condition: 'Fair', year: 2020, image: '🌱', seller: 'Pankaj Patel', phone: '98XXXXX006', description: 'Good working condition, minor cosmetic wear' },
    { id: 7, title: 'Power Tiller Kubota 12HP', type: 'sale', category: 'Power Tiller', price: 95000, location: 'Kolkata, WB', condition: 'Good', year: 2021, image: '🚜', seller: 'Biswas Agro', phone: '98XXXXX007', description: 'Japanese engine, low hours, ideal for paddy' },
    { id: 8, title: 'Irrigation Pump Set 5HP', type: 'sale', category: 'Irrigation', price: 18000, location: 'Nashik, MH', condition: 'Good', year: 2022, image: '💧', seller: 'Manoj Jadhav', phone: '98XXXXX008', description: 'Motor + pump set, used 2 seasons, with pipe fittings' },
];

// ---- States & Districts (for weather/location selection) ----

window.D = window.D || {};
window.D.STATES_DATA = [
    { name: 'Andhra Pradesh', capital: 'Amaravati', lat: 15.9129, lng: 79.74 },
    { name: 'Assam', capital: 'Dispur', lat: 26.2006, lng: 92.9376 },
    { name: 'Bihar', capital: 'Patna', lat: 25.6093, lng: 85.1376 },
    { name: 'Chhattisgarh', capital: 'Raipur', lat: 21.2514, lng: 81.6296 },
    { name: 'Gujarat', capital: 'Gandhinagar', lat: 23.2156, lng: 72.6369 },
    { name: 'Haryana', capital: 'Chandigarh', lat: 29.0588, lng: 76.0856 },
    { name: 'Jharkhand', capital: 'Ranchi', lat: 23.6102, lng: 85.2799 },
    { name: 'Karnataka', capital: 'Bengaluru', lat: 15.3173, lng: 75.7139 },
    { name: 'Kerala', capital: 'Thiruvananthapuram', lat: 10.8505, lng: 76.2711 },
    { name: 'Madhya Pradesh', capital: 'Bhopal', lat: 22.9734, lng: 78.6569 },
    { name: 'Maharashtra', capital: 'Mumbai', lat: 19.7515, lng: 75.7139 },
    { name: 'Odisha', capital: 'Bhubaneswar', lat: 20.9517, lng: 85.0985 },
    { name: 'Punjab', capital: 'Chandigarh', lat: 31.1471, lng: 75.3412 },
    { name: 'Rajasthan', capital: 'Jaipur', lat: 27.0238, lng: 74.2179 },
    { name: 'Tamil Nadu', capital: 'Chennai', lat: 11.1271, lng: 78.6569 },
    { name: 'Telangana', capital: 'Hyderabad', lat: 18.1124, lng: 79.0193 },
    { name: 'Uttar Pradesh', capital: 'Lucknow', lat: 26.8467, lng: 80.9462 },
    { name: 'Uttarakhand', capital: 'Dehradun', lat: 30.0668, lng: 79.0193 },
    { name: 'West Bengal', capital: 'Kolkata', lat: 22.9868, lng: 87.855 },
];

// ---- Block Level Admin Data ----

window.D = window.D || {};
window.D.BLOCK_DATA = {
    name: 'Chandpur Block',
    district: 'Varanasi',
    state: 'Uttar Pradesh',
    totalVillages: 87,
    totalFarmers: 12450,
    registeredFarmers: 4280,
    totalArea: 32000, // hectares
    irrigatedArea: 24000,
    majorCrops: ['Paddy', 'Wheat', 'Sugarcane', 'Potato', 'Vegetables'],
    registeredImplements: 1247,
    estimatedImplements: 3500,
    estimationSource: 'Agricultural Census 2019 (proportional)',
    pendingApprovals: 23,
    activeHirings: 45,
    subsidyApplications: 156,
    implementBreakdown: {
        'Tractors': { registered: 520, estimated: 1400 },
        'Power Tillers': { registered: 85, estimated: 250 },
        'Rotavators': { registered: 180, estimated: 450 },
        'Seed Drills': { registered: 110, estimated: 320 },
        'Sprayers': { registered: 200, estimated: 550 },
        'Threshers': { registered: 95, estimated: 280 },
        'Harvesters': { registered: 12, estimated: 35 },
        'Others': { registered: 45, estimated: 215 },
    },
    recentRegistrations: [
        { date: '2025-03-05', farmer: 'Vikas Yadav', village: 'Mubarakpur', implement: 'Mahindra 585 DI', verified: false },
        { date: '2025-03-04', farmer: 'Santosh Kumari', village: 'Rampur', implement: 'Power Sprayer', verified: true },
        { date: '2025-03-03', farmer: 'Mohammed Irfan', village: 'Jalalpur', implement: 'Rotavator 5ft', verified: true },
        { date: '2025-03-02', farmer: 'Geeta Devi', village: 'Nandigram', implement: 'Seed Drill 9-row', verified: false },
        { date: '2025-03-01', farmer: 'Lallan Prasad', village: 'Chandpur', implement: 'Disc Harrow', verified: true },
    ],
};

// ---- Crop Calendar ----

window.D = window.D || {};
window.D.CROP_CALENDAR = {
    kharif: { season: 'Kharif (खरीफ)', sowing: 'Jun-Jul', harvesting: 'Oct-Nov', crops: ['Paddy', 'Maize', 'Bajra', 'Tur', 'Moong', 'Soybean', 'Cotton', 'Sugarcane', 'Groundnut'] },
    rabi: { season: 'Rabi (रबी)', sowing: 'Oct-Nov', harvesting: 'Mar-Apr', crops: ['Wheat', 'Barley', 'Gram', 'Masur', 'Mustard', 'Linseed', 'Potato', 'Pea'] },
    zaid: { season: 'Zaid (ज़ायद)', sowing: 'Mar-Apr', harvesting: 'Jun-Jul', crops: ['Watermelon', 'Muskmelon', 'Cucumber', 'Moong', 'Vegetables', 'Fodder'] },
};

// ---- Weather Code Mapping (WMO) ----

window.D = window.D || {};
window.D.WEATHER_CODES = {
    0: { desc: 'Clear sky', icon: '☀️' },
    1: { desc: 'Mainly clear', icon: '🌤️' },
    2: { desc: 'Partly cloudy', icon: '⛅' },
    3: { desc: 'Overcast', icon: '☁️' },
    45: { desc: 'Foggy', icon: '🌫️' },
    48: { desc: 'Depositing rime fog', icon: '🌫️' },
    51: { desc: 'Light drizzle', icon: '🌦️' },
    53: { desc: 'Moderate drizzle', icon: '🌦️' },
    55: { desc: 'Dense drizzle', icon: '🌧️' },
    61: { desc: 'Slight rain', icon: '🌦️' },
    63: { desc: 'Moderate rain', icon: '🌧️' },
    65: { desc: 'Heavy rain', icon: '🌧️' },
    71: { desc: 'Slight snow', icon: '🌨️' },
    73: { desc: 'Moderate snow', icon: '🌨️' },
    75: { desc: 'Heavy snow', icon: '❄️' },
    80: { desc: 'Slight rain showers', icon: '🌦️' },
    81: { desc: 'Moderate rain showers', icon: '🌧️' },
    82: { desc: 'Violent rain showers', icon: '⛈️' },
    85: { desc: 'Slight snow showers', icon: '🌨️' },
    86: { desc: 'Heavy snow showers', icon: '❄️' },
    95: { desc: 'Thunderstorm', icon: '⛈️' },
    96: { desc: 'Thunderstorm with hail', icon: '⛈️' },
    99: { desc: 'Thunderstorm with heavy hail', icon: '⛈️' },
};

// ---- Notifications ----

window.D = window.D || {};
window.D.SAMPLE_NOTIFICATIONS = [
    { id: 1, type: 'subsidy', title: 'Subsidy Application Approved', message: 'Your SMAM subsidy for Rotavator has been approved. Check status.', time: '2 hours ago', read: false },
    { id: 2, type: 'weather', title: 'Heavy Rain Alert', message: 'IMD warns of heavy rainfall in Varanasi district for next 48 hours.', time: '5 hours ago', read: false },
    { id: 3, type: 'hiring', title: 'New Booking Request', message: 'Farmer Vikas Yadav requested combine harvester for 15 acres.', time: '1 day ago', read: false },
    { id: 4, type: 'scheme', title: 'PM-KISAN Installment', message: '18th installment of ₹2,000 credited to your account.', time: '3 days ago', read: true },
    { id: 5, type: 'market', title: 'Wheat MSP Updated', message: 'New wheat MSP for Rabi 2025-26 increased to ₹2,425/qtl.', time: '1 week ago', read: true },
];

// ---- Helper functions ----

export function formatCurrency(amount) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    if (amount >= 1000) return `₹${amount.toLocaleString('en-IN')}`;
    return `₹${amount}`;
}

export function formatNumber(num) {
    return num.toLocaleString('en-IN');
}

export function getChangePercent(current, previous) {
    return (((current - previous) / previous) * 100).toFixed(1);
}

export function getCurrentSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 6 && month <= 10) return 'kharif';
    if (month >= 11 || month <= 3) return 'rabi';
    return 'zaid';
}

export function getWeatherIcon(code) {
    return WEATHER_CODES[code]?.icon || '🌤️';
}

export function getWeatherDesc(code) {
    return WEATHER_CODES[code]?.desc || 'Unknown';
}
