// ============================================================
// AGRI ADVISOR & CALCULATOR DATA
// ============================================================

export const TN_DISTRICTS = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul',
    'Erode', 'Kallakurichi', 'Kanchipuram', 'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai',
    'Mayiladuthurai', 'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai',
    'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur', 'Theni',
    'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupattur', 'Tiruppur', 'Tiruvallur',
    'Tiruvannamalai', 'Tiruvarur', 'Vellore', 'Viluppuram', 'Virudhunagar'
];

export const TN_BLOCKS = {
    'Ariyalur': ['Andimadam', 'Ariyalur', 'Jayankondam', 'Sendurai', 'T. Palur', 'Thirumanur'],
    'Chengalpattu': ['Acharapakkam', 'Cheyyur', 'Kattankulathur', 'Lathur', 'Madhuranthakam', 'St. Thomas Mount', 'Thiruporur', 'Tirukalukundram'],
    'Chennai': ['Adyar', 'Alandur', 'Ambattur', 'Anna Nagar', 'Kodambakkam', 'Madhavaram', 'Manali', 'Perungudi', 'Royapuram', 'Sholinganallur', 'Teynampet', 'Thiru. Vi. Ka. Nagar', 'Tiruvottiyur', 'Tondiarpet', 'Valasaravakkam'],
    'Coimbatore': ['Annur', 'Karamadai', 'Kinathukadavu', 'Madukkarai', 'Periyanaickenpalayam', 'Pollachi North', 'Pollachi South', 'Sarcarsamakulam', 'Sultanpet', 'Sulur', 'Thondamuthur'],
    'Cuddalore': ['Annagramam', 'Bhuvanagiri', 'Cuddalore', 'Kammapuram', 'Kattumannarkoil', 'Keerapalayam', 'Kurinjipadi', 'Mangalur', 'Nallur', 'Panruti', 'Parangipettai', 'Srimushnam', 'Vriddhachalam'],
    'Dharmapuri': ['Dharmapuri', 'Erinahalli', 'Harur', 'Karimangalam', 'Morappur', 'Nallampalli', 'Palakkodu', 'Pappireddipatti', 'Pennagaram'],
    'Dindigul': ['Athoor', 'Batlagundu', 'Dindigul', 'Guziliyamparai', 'Kodaikanal', 'Natham', 'Nilakkottai', 'Oddanchatram', 'Palani', 'Reddiarchatram', 'Shanarpatti', 'Thoppampatti', 'Vadamadurai', 'Vedasandur'],
    'Erode': ['Ammapettai', 'Andhiyur', 'Bhavani', 'Bhavanisagar', 'Chennimalai', 'Erode', 'Gobi', 'Kodumudi', 'Modakurichi', 'Nambiyur', 'Perundurai', 'Sathyamangalam', 'Talavadi', 'T.N.Palayam'],
    'Kallakurichi': ['Chinnasalem', 'Kallakurichi', 'Kalrayan Hills', 'Rishivandiyam', 'Sankarapuram', 'Thiagadurgam', 'Tirukkoyilur', 'Ulundurpet', 'Vellimalai'],
    'Kanchipuram': ['Kanchipuram', 'Kundrathur', 'Sriperumbudur', 'Uthiramerur', 'Walajabad'],
    'Kanyakumari': ['Agastheeswaram', 'Killiyur', 'Kurunthencode', 'Melpuram', 'Munchira', 'Rajakkamangalam', 'Thiruvattar', 'Thovalai', 'Thuckalay'],
    'Karur': ['Aravakurichi', 'K.Paramathi', 'Kadavur', 'Karur', 'Krishnarayapuram', 'Pugalur', 'Thanthoni', 'Togamalai'],
    'Krishnagiri': ['Bargur', 'Hosur', 'Kaveripattinam', 'Kelamangalam', 'Krishnagiri', 'Mathur', 'Shoolagiri', 'Thally', 'Uthangarai', 'Veppanapalli'],
    'Madurai': ['Alanganallur', 'Chellampatti', 'Kalligudi', 'Kottampatti', 'Madurai East', 'Madurai West', 'Melur', 'Sedapatti', 'T. Kallupatti', 'Tirumangalam', 'Tiruparankundram', 'Usilampatti', 'Vadipatti'],
    'Mayiladuthurai': ['Kollidam', 'Kuthalam', 'Mayiladuthurai', 'Sirkazhi', 'Sembanarkoil'],
    'Nagapattinam': ['Keezhaiyur', 'Kelvelur', 'Nagapattinam', 'Thalainayar', 'Thirumarugal', 'Vedaranyam'],
    'Namakkal': ['Elachipalayam', 'Erumapatty', 'Kabilarmalai', 'Kolli Hills', 'Mallasamudram', 'Mohanur', 'Namakkal', 'Padaveedu', 'Pallipalayam', 'Paramathi', 'Puduchatram', 'Rasipuram', 'Sendamangalam', 'Tiruchengode', 'Vennandur'],
    'Nilgiris': ['Coonoor', 'Gudalur', 'Kotagiri', 'Udhagamandalam'],
    'Perambalur': ['Alathur', 'Perambalur', 'Veppanthattai', 'Veppur'],
    'Pudukkottai': ['Annavasal', 'Aranthangi', 'Avadaiyarkoil', 'Gandarvakottai', 'Illuppur', 'Karambakkudi', 'Kunnandarkovil', 'Manamelkudi', 'Ponnamaravathi', 'Pudukkottai', 'Thirumayam', 'Thiruvarankulam', 'Viralimalai'],
    'Ramanathapuram': ['Bogalur', 'Kadaladi', 'Kamuthi', 'Mandapam', 'Mudukulathur', 'Nainarkoil', 'Paramakudi', 'Ramanathapuram', 'R.S. Mangalam', 'Tiruppullani', 'Tiruvadanai'],
    'Ranipet': ['Arakkonam', 'Arcot', 'Kaveripakkam', 'Nemili', 'Sholinghur', 'Thimiri', 'Walajah'],
    'Salem': ['Ayothiapattinam', 'Edappadi', 'Gangavalli', 'Kadayampatti', 'Kolathur', 'Konganapuram', 'Macdonalds Choultry', 'Mecheri', 'Nangavalli', 'Omalur', 'Panamarathupatty', 'Pethanaickenpalayam', 'Salem', 'Sankari', 'Thalaivasal', 'Taramangalam', 'Valapady', 'Veerapandy', 'Yercaud'],
    'Sivaganga': ['Devakottai', 'Ilayangudi', 'Kalayarkoil', 'Kallal', 'Kannangudi', 'Manamadurai', 'Sakkottai', 'Singampunari', 'Sivaganga', 'Thiruppuvanam', 'Tirupathur'],
    'Tenkasi': ['Alangulam', 'Kadayanallur', 'Keezhapavur', 'Kuruvikulam', 'Melaneelithanallur', 'Sankarankoil', 'Shencottai', 'Tenkasi', 'Vasudevanallur'],
    'Thanjavur': ['Ammapettai', 'Budalur', 'Kumbakonam', 'Madukkur', 'Orathanadu', 'Papanasam', 'Pattukkottai', 'Peravurani', 'Sethubhavachatram', 'Thanjavur', 'Thirupanandal', 'Thiruvaiyaru', 'Thiruvidaimarudur'],
    'Theni': ['Andipatti', 'Bodinayakanur', 'Chinnamanur', 'Cumbum', 'Kadavur', 'Periyakulam', 'Theni', 'Uthamapalayam'],
    'Thoothukudi': ['Alwarthirunagari', 'Karungulam', 'Kayathar', 'Kovilpatti', 'Pudur', 'Sattankulam', 'Srivaikuntam', 'Thoothukudi', 'Tiruchendur', 'Udangudi', 'Vilathikulam'],
    'Tiruchirappalli': ['Andanallur', 'Lalgudi', 'Manachanallur', 'Manapparai', 'Manikandam', 'Marungapuri', 'Musiri', 'Pullambadi', 'Thathaiyangarpet', 'Thiruverumbur', 'Thottiyam', 'Turaiyur', 'Uppiliyapuram', 'Vaiyampatti'],
    'Tirunelveli': ['Ambasamudram', 'Cheranmahadevi', 'Kalakadu', 'Manoor', 'Nanguneri', 'Palayamkottai', 'Pappakudi', 'Radhapuram', 'Tirunelveli'],
    'Tirupattur': ['Alangayam', 'Jolarpet', 'Kandili', 'Madhanur', 'Natrampalli', 'Tirupattur'],
    'Tiruppur': ['Avanashi', 'Dharapuram', 'Gudimangalam', 'Kangeyam', 'Kundadam', 'Madathukulam', 'Mulanur', 'Palladam', 'Pongalur', 'Tiruppur', 'Udumalaipettai', 'Uthukuli', 'Vellakoil'],
    'Tiruvallur': ['Ellapuram', 'Gummidipoondi', 'Kadavur', 'Minjur', 'Pallipattu', 'Poonamallee', 'Poondi', 'R.K. Pet', 'Sholavaram', 'Tiruvallur', 'Tiruvelangadu', 'Villivakkam', 'Meenjur'],
    'Tiruvannamalai': ['Anakavur', 'Arani', 'Chengam', 'Chetpet', 'Cheyyar', 'Dusi', 'Jawadhu Hills', 'Kalasapakkam', 'Keelpennathur', 'Peranamallur', 'Polur', 'Pudupalayam', 'Thandrampet', 'Thellar', 'Tiruvannamalai', 'Turinjapuram', 'Vandavasi', 'Vembakkam'],
    'Tiruvarur': ['Codekal', 'Koradacheri', 'Kottur', 'Mannargudi', 'Muthupettai', 'Nannilam', 'Needamangalam', 'Thiruthuraipoondi', 'Tiruvarur', 'Valangaiman'],
    'Vellore': ['Anaicut', 'Gudiyatham', 'K.V. Kuppam', 'Katpadi', 'Kaniyambadi', 'Pernambut', 'Vellore'],
    'Viluppuram': ['Gingee', 'Kanai', 'Kandamangalam', 'Koliyanur', 'Marakkanam', 'Melmalayanur', 'Milam', 'Mugaiyur', 'Olakkur', 'Thiruvennainallur', 'Vanur', 'Vikkiravandi', 'Villupuram'],
    'Virudhunagar': ['Aruppukottai', 'Kariapatti', 'Narikudi', 'Rajapalayam', 'Satur', 'Sivakasi', 'Srivilliputhur', 'Tiruchuli', 'Vembakottai', 'Virudhunagar', 'Watrap'],
    'default': ['Block 1', 'Block 2', 'Block 3', 'Block 4', 'Block 5']
};

export const CROPS = {
    paddy: { name: 'Paddy (Rice)', nameHi: 'धान', nameTa: 'நெல்', season: 'Kharif/Rabi', water: 'High' },
    sugarcane: { name: 'Sugarcane', nameHi: 'गन्ना', nameTa: 'கரும்பு', season: 'Annual', water: 'High' },
    cotton: { name: 'Cotton', nameHi: 'कपास', nameTa: 'பருத்தி', season: 'Kharif', water: 'Medium' },
    groundnut: { name: 'Groundnut', nameHi: 'मूंगफली', nameTa: 'நிலக்கடலை', season: 'Kharif/Rabi', water: 'Medium' },
    maize: { name: 'Maize', nameHi: 'मक्का', nameTa: 'மக்காச்சோளம்', season: 'Kharif', water: 'Medium' },
    pulses: { name: 'Pulses (Black/Green Gram)', nameHi: 'दालें', nameTa: 'பருப்பு வகைகள்', season: 'Rabi', water: 'Low' },
    millets: { name: 'Millets (Sorghum/Pearl)', nameHi: 'बाजरा/ज्वार', nameTa: 'சிறுதானியங்கள்', season: 'Kharif', water: 'Low' },
    vegetables: { name: 'Vegetables', nameHi: 'सब्जियां', nameTa: 'காய்கறிகள்', season: 'All', water: 'Medium' }
};

export const OPERATIONS = {
    tillage: {
        id: 'tillage', name: 'Land Preparation / Tillage', nameTa: 'நிலம் உழுதல்',
        desc: 'Deep ploughing and secondary tillage for seedbed preparation',
        implements: [
            { id: 1, name: 'MB Plough', capacityHaPerDay: 1.5, workableDays: 25, timeliness: 0.8, hpReq: '45-50 HP', price: 35000, subsidy: '50%' },
            { id: 4, name: 'Rotavator', capacityHaPerDay: 2.5, workableDays: 20, timeliness: 0.9, hpReq: '45-55 HP', price: 120000, subsidy: '50%' },
            { id: 3, name: 'Cultivator', capacityHaPerDay: 3.0, workableDays: 25, timeliness: 0.85, hpReq: '35-45 HP', price: 30000, subsidy: '50%' }
        ]
    },
    sowing: {
        id: 'sowing', name: 'Sowing / Planting', nameTa: 'விதைப்பு',
        desc: 'Precision placing of seeds and fertilizers in the soil',
        implements: [
            { id: 6, name: 'Seed Drill', capacityHaPerDay: 3.5, workableDays: 15, timeliness: 0.7, hpReq: '35-45 HP', price: 70000, subsidy: '50%' },
            { id: 22, name: 'Planter (Pneumatic)', capacityHaPerDay: 4.0, workableDays: 15, timeliness: 0.75, hpReq: '45-55 HP', price: 150000, subsidy: '40%' },
            { id: 10, name: 'Paddy Transplanter', capacityHaPerDay: 1.5, workableDays: 20, timeliness: 0.8, hpReq: 'Self-propelled', price: 250000, subsidy: '50%' }
        ]
    },
    spraying: {
        id: 'spraying', name: 'Plant Protection (Spraying)', nameTa: 'மருந்து தெளித்தல்',
        desc: 'Application of pesticides and foliar fertilizers',
        implements: [
            { id: 12, name: 'Boom Sprayer (Tractor)', capacityHaPerDay: 8.0, workableDays: 30, timeliness: 0.95, hpReq: '35-45 HP', price: 55000, subsidy: '50%' },
            { id: 13, name: 'Agricultural Drone', capacityHaPerDay: 12.0, workableDays: 30, timeliness: 0.95, hpReq: 'Battery', price: 800000, subsidy: '40-100%' },
            { id: 11, name: 'Power Sprayer (Knapsack)', capacityHaPerDay: 1.0, workableDays: 45, timeliness: 0.8, hpReq: 'Manual/Small Engine', price: 12000, subsidy: '50%' }
        ]
    },
    harvesting: {
        id: 'harvesting', name: 'Harvesting', nameTa: 'அறுவடை',
        desc: 'Cutting and gathering the mature crop',
        implements: [
            { id: 16, name: 'Combine Harvester', capacityHaPerDay: 6.0, workableDays: 20, timeliness: 0.6, hpReq: 'Self-propelled (100 HP)', price: 2500000, subsidy: '40%' },
            { id: 14, name: 'Reaper/Binder', capacityHaPerDay: 2.0, workableDays: 25, timeliness: 0.7, hpReq: 'Self-propelled/Walk', price: 150000, subsidy: '50%' }
        ]
    },
    post_harvest: {
        id: 'post_harvest', name: 'Post-Harvest & Residue', nameTa: 'அறுவடைக்கு பின்',
        desc: 'Threshing, baling, and stubble management',
        implements: [
            { id: 17, name: 'Multi-crop Thresher', capacityHaPerDay: 4.0, workableDays: 30, timeliness: 0.85, hpReq: '35 HP Tractor PTO', price: 120000, subsidy: '50%' },
            { id: 18, name: 'Happy Seeder', capacityHaPerDay: 2.5, workableDays: 20, timeliness: 0.8, hpReq: '50-55 HP', price: 165000, subsidy: '50%' },
            { id: 21, name: 'Straw Baler', capacityHaPerDay: 5.0, workableDays: 25, timeliness: 0.8, hpReq: '45-50 HP', price: 350000, subsidy: '40%' }
        ]
    }
};

// Formula: N = A / (C * D * T)
// N = Required Number of Machines
// A = Total Area (ha)
// C = Effective Field Capacity (ha/day/machine)
// D = Workable Days available for the operation
// T = Timeliness Index (efficiency factor, usually 0.6 to 0.9)
export const calculateRequiredImplements(areaHa, capacityDelta, daysDelta) {
    return function (implement) {
        const C = implement.capacityHaPerDay * (1 + (capacityDelta || 0));
        const D = implement.workableDays + (daysDelta || 0);
        const T = implement.timeliness;
        if (C <= 0 || D <= 0) return 0;

        const requiredExact = areaHa / (C * D * T);
        return Math.ceil(requiredExact); // Round up to nearest whole machine
    }
}

// ============================================================
// CROP SEASON PLANNER DATA (NEW)
// ============================================================

export const SOIL_TYPES = {
    red: { id: 'red', name: 'Red Soil', nameTa: 'செம்மண்' },
    black: { id: 'black', name: 'Black Soil (Cotton)', nameTa: 'கரிசல் மண்' },
    alluvial: { id: 'alluvial', name: 'Alluvial Soil', nameTa: 'வண்டல் மண்' },
    laterite: { id: 'laterite', name: 'Laterite Soil', nameTa: 'செம்பூரை மண்' },
    saline: { id: 'saline', name: 'Saline/Alkaline Soil', nameTa: 'களர் மண்' }
};

export const CROP_LIFECYCLE_DATA = {
    paddy: {
        id: 'paddy', name: 'Paddy (Rice)', nameTa: 'நெல்',
        suitableSoils: ['alluvial', 'red'],
        season: 'Kharif',
        lifecycle: [
            { stage: 'Sowing / Nursery', desc: 'Prepare raised beds. Treat seeds with Pseudomonas fluorescens.', descTa: 'நாற்றாங்கால் தயார் செய்தல் மற்றும் விதை நேர்த்தி.' },
            { stage: 'Transplanting', desc: 'Transplant 14-21 day old seedlings at 20x10 cm spacing.', descTa: '14-21 நாள் நாற்றுகளை நடுதல்.' },
            { stage: 'Nutrient Mgt', desc: 'Apply NPK as 150:50:50 kg/ha based on soil test. Top dress Nitrogen in 3 splits.', descTa: 'மண் பரிசோதனை அடிப்படையில் உரம் இடுதல் (NPK).' },
            { stage: 'Water Mgt', desc: 'Maintain 2.5cm water till panicle initiation, then 5cm. Drain 10 days before harvest.', descTa: 'தண்ணீர் மேலாண்மை: அறுவடைக்கு 10 நாட்கள் முன் வடித்தல்.' },
            { stage: 'Pest Control', desc: 'Monitor for Stem Borer. Use pheromone traps or Neem oil spray (3%).', descTa: 'தண்டு துளைப்பான் கண்காணிப்பு மற்றும் வேப்ப எண்ணெய் தெளிப்பு.' },
            { stage: 'Harvesting', desc: 'Harvest when 80% panicles turn straw color. Thresh properly.', descTa: 'பயிர் முதிர்ச்சி அடைந்தவுடன் அறுவடை.' },
            { stage: 'Post-Harvest', desc: 'Dry grains to 12% moisture. Mill to remove husk for higher market value.', descTa: '12% ஈரப்பதம் வரை காயவைத்தல் மற்றும் அரவை.' }
        ]
    },
    cotton: {
        id: 'cotton', name: 'Cotton', nameTa: 'பருத்தி',
        suitableSoils: ['black', 'alluvial'],
        season: 'Kharif',
        lifecycle: [
            { stage: 'Sowing', desc: 'Sow delinted seeds treated with Trichoderma viride. Space at 75x30 cm.', descTa: 'விதை நேர்த்தி செய்த விதைகளை 75x30 செ.மீ இடைவெளியில் தைத்தல்.' },
            { stage: 'Weed Mgt', desc: 'Pre-emergence herbicide (Pendimethalin) at 3 days. Hand weed at 45 days.', descTa: 'களை கட்டுப்பாட்டு முறைகள்.' },
            { stage: 'Nutrient Mgt', desc: 'Apply NPK at 150:75:75 kg/ha. Spray MgSO4 to control leaf reddening.', descTa: 'உரம் இடுதல் மற்றும் நுண்ணூட்டச்சத்து மேலாண்மை.' },
            { stage: 'Irrigation', desc: 'Irrigate immediately after sowing, life irrigation at 5th day. Avoid waterlogging.', descTa: 'விதைத்தவுடன் நீர்ப்பாசனம்.' },
            { stage: 'Pest Control', desc: 'Critical monitoring for Pink Bollworm. Release Trichogramma egg parasitoids.', descTa: 'இளஞ்சிவப்பு காய்ப்புழு கட்டுப்பாடு.' },
            { stage: 'Harvesting', desc: 'Hand pick fully opened bolls in morning hours to prevent leaf trash.', descTa: 'முழுமையாக மலர்ந்த பருத்தியை பறித்தல்.' },
            { stage: 'Post-Harvest', desc: 'Sun dry raw cotton for 2-3 days. Grade and gin before selling or storage.', descTa: 'பருத்தியை காயவைத்தல் மற்றும் தரம்பிரித்தல்.' }
        ]
    },
    sugarcane: {
        id: 'sugarcane', name: 'Sugarcane', nameTa: 'கரும்பு',
        suitableSoils: ['alluvial', 'red', 'black'],
        season: 'Annual',
        lifecycle: [
            { stage: 'Planting', desc: 'Plant 2-budded setts treated with Carbendazim. Trench method preferred.', descTa: 'விதை நேர்த்தி செய்த கரும்பு துண்டுகளை நடுதல்.' },
            { stage: 'Nutrient Mgt', desc: 'High N requirement (275 kg/ha). Apply Farm Yard Manure before planting.', descTa: 'அதிக தழைச்சத்து மற்றும் தொழுவுரம் இடுதல்.' },
            { stage: 'Weed Mgt', desc: 'Pre-emergence Atrazine. Post-emergence 2,4-D for broad-leaved weeds.', descTa: 'களைக்கொல்லி மேலாண்மை.' },
            { stage: 'Water Mgt', desc: 'Drip irrigation highly recommended for water saving and fertigation yield boost.', descTa: 'சொட்டு நீர் பாசனம் பரிந்துரைக்கப்படுகிறது.' },
            { stage: 'Operations', desc: 'Earthing up at 90 and 120 days. Detrashing lower dry leaves at 150 & 210 days.', descTa: 'மண் அணைத்தல் மற்றும் சருகுகளை அகற்றுதல்.' },
            { stage: 'Harvesting', desc: 'Harvest 10-12 months post planting based on brix reading > 18%.', descTa: '10-12 மாதங்களில் அறுவடை.' },
            { stage: 'Post-Harvest', desc: 'Transport to factory within 24 hours to prevent sucrose inversion.', descTa: 'விரைவாக சர்க்கரை ஆலைக்கு கொண்டு செல்லுதல்.' }
        ]
    },
    groundnut: {
        id: 'groundnut', name: 'Groundnut', nameTa: 'நிலக்கடலை',
        suitableSoils: ['red', 'alluvial'],
        season: 'Kharif',
        lifecycle: [
            { stage: 'Sowing', desc: 'Sow kernels treated with Rhizobium culture. 30x10 cm spacing.', descTa: 'ரைசோபியம் விதை நேர்த்தி.' },
            { stage: 'Nutrient Mgt', desc: 'Gypsum application (400 kg/ha) at 45 days is critical for pod formation.', descTa: '45வது நாளில் ஜிப்சம் இடுதல் மிக அவசியமாகும்.' },
            { stage: 'Water Mgt', desc: 'Critical stages: flowering, pegging, pod development. Avoid stress here.', descTa: 'பூக்கும் மற்றும் காய் பிடிக்கும் பருவத்தில் தொடர் பாசனம்.' },
            { stage: 'Pest Control', desc: 'Monitor for Leaf Miner and Spodoptera. Use light traps.', descTa: 'இலைத் துளைப்பான் மற்றும் புழுக்களை கண்காணித்தல்.' },
            { stage: 'Harvesting', desc: 'Harvest when leaves yellow and inside shell turns dark.', descTa: 'இலைகள் மஞ்சள் நிறமாக மாறும் போது அறுவடை.' },
            { stage: 'Post-Harvest', desc: 'Sun dry pods to reduce moisture to 8-9% to prevent Aflatoxin mold.', descTa: '8-9% ஈரப்பதம் வரை காயவைத்தல், பூஞ்சை தொற்றை தடுத்தல்.' }
        ]
    },
    maize: {
        id: 'maize', name: 'Maize', nameTa: 'மக்காச்சோளம்',
        suitableSoils: ['red', 'black', 'alluvial'],
        season: 'Kharif',
        lifecycle: [
            { stage: 'Sowing', desc: 'Treat seeds with Azospirillum. Space at 60x25 cm on ridges.', descTa: 'விதை நேர்த்தி மற்றும் வரப்புகளில் விதைத்தல்.' },
            { stage: 'Nutrient Mgt', desc: 'NPK 250:75:75 kg/ha. Micronutrient spray if zinc deficiency noticed.', descTa: 'உர மேலாண்மை மற்றும் நுண்ணூட்டச்சத்து.' },
            { stage: 'Pest Control', desc: 'Fall Armyworm is major threat. Apply Emamectin benzoate in whorls if infested.', descTa: 'படைப்புழு கண்காணிப்பு மற்றும் கட்டுப்பாடு.' },
            { stage: 'Harvesting', desc: 'Harvest when husk turns yellow and grain moisture is ~25%.', descTa: 'கதிர் முதிர்ச்சி அடைந்தவுடன் அறுவடை.' },
            { stage: 'Post-Harvest', desc: 'Shell grains, dry to 12% moisture. Store in hermetic bags.', descTa: 'மணி பிரித்தல் மற்றும் காயவைத்தல்.' }
        ]
    }
};

// District-wise Storage & Logistics Data Mappings
export const LOGISTICS_DATA = {
    'default': {
        coldStorage: [
            { name: 'State Agri Cold Storage API', cap: '5,000 MT', temp: '2°C to 10°C', dist: '5km' },
            { name: 'Co-op Society Chilling Plant', cap: '2,000 MT', temp: '-2°C to 4°C', dist: '12km' }
        ],
        warehouses: [
            { name: 'Central Warehousing Corp (CWC)', cap: '15,000 MT', type: 'Dry Storage', dist: '8km' },
            { name: 'TN Civil Supplies Godown', cap: '10,000 MT', type: 'Procurement', dist: '3km' }
        ],
        transport: [
            { name: 'Kissan Rail Connect', route: 'Local to Metro', type: 'Refrigerated Wagons' },
            { name: 'Agri-Logistics Truckers Union', route: 'Inter-district', type: 'Ventilated Trucks' }
        ]
    },
    'Coimbatore': {
        coldStorage: [{ name: 'Kovai Agro Cold Chain', cap: '10,000 MT', temp: '0°C to 8°C', dist: '15km' }],
        warehouses: [{ name: 'CWC Sulur', cap: '25,000 MT', type: 'Dry Goods', dist: '20km' }],
        transport: [{ name: 'Kisan Rail - Coimbatore Jn', route: 'CBE to Delhi', type: 'Refrigerated Express' }]
    },
    'Erode': {
        coldStorage: [{ name: 'Turmeric Hub Cold Storage', cap: '8,000 MT', temp: '5°C to 12°C', dist: '10km' }],
        warehouses: [{ name: 'Erode AMC Warehouse', cap: '20,000 MT', type: 'Dry/Spice Storage', dist: '5km' }],
        transport: [{ name: 'Erode Agro Movers', route: 'Statewide', type: 'Covered Trucks' }]
    },
    'Madurai': {
        coldStorage: [{ name: 'Madurai Flori-Cold Chain', cap: '4,000 MT', temp: '2°C to 8°C', dist: '8km' }],
        warehouses: [{ name: 'CWC Madurai', cap: '15,000 MT', type: 'Food Grains', dist: '12km' }],
        transport: [{ name: 'South Agro Logistics', route: 'Madurai to Kochi Port', type: 'Refrigerated Trucks' }]
    }
};
