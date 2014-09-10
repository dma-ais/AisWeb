//
// Data for url-builder
//

//Root domain for request url
var requestDomain = 'http://placeholder/';

//query endpoint
var queryEndpoint = '/store/query?';

//get source IDs from endpoint /store/sourceIDs
var sourcecIdEndpoint = '/store/sourceIDs';



//
//Rest-service query parameters
//

var source_restService = '';         //used in source-filters.js

var source_id_restService = 's.id=';
var source_base_restService = 's.bs=';
var source_country_restService = 's.country=';
var source_type_restService = 's.type=';
var source_region_restService = 's.region=';

var mmsi_restService = 'm.mmsi in ';             //used in mmsi-filters.js


var area_restService = 'box=';              //used in area-selection.js
var time_restService = 'interval=';         //used in time-selection.js
var output_restService = 'output=';   //used in output-format-ctrl.js
var columns_restService = 'table&columns=';       //used in output-format-ctrl.js
var separator_restService = 'separator=';   //used in output-format-ctrl.js
var noHeader_restService = 'noHeader&';     //used in output-format-ctrl.js
var samples_restService = '&limit=';         //used in url-builder.js


//
// Data for source filtering section
//

//Source Tab Headings
var tabHeadings=['ID','Base Station','Country','Type','Region'];

//Source Ids
/*var sourceIds = [
    {text:'All', value: 'all&', include:true},
    {text:'Source1', value: 'src1', include:false},
    {text:'Source2', value: 'src2', include:false},
    {text:'Source3', value: 'src3', include:false},
    {text:'Source4', value: 'src4', include:false},
    {text:'Source5', value: 'src5', include:false},
    {text:'Source6', value: 'src6', include:false}];
*/

//Ships types
var shipTypes = [
    {index:1 ,text:'All', include:true},
    {index:2 ,text:'Undefined',      value: 'UNDEFINED',     include:false},
    {index:3 ,text:'Wig',            value: 'WIG',           include:false},
    {index:4 ,text:'Pilot',          value: 'PILOT',         include:false},
    {index:5 ,text:'Sar',            value: 'SAR',           include:false},
    {index:6 ,text:'Tug',            value: 'TUG',           include:false},
    {index:7 ,text:'Port Tender',    value: 'PORT_TENDER',   include:false},
    {index:8 ,text:'Anti Pollution', value: 'ANTI_POLLUTION',include:false},
    {index:9 ,text:'Law Enforcement',value: 'LAW_ENFORCEMENT', include:false},
    {index:10 ,text:'Medical',        value: 'MEDICAL',       include:false},
    {index:11 ,text:'Fishing',        value: 'FISHING',       include:false},
    {index:12 ,text:'Towing',         value: 'TOWING',        include:false},
    {index:13 ,text:'Towing Long Wide', value: 'TOWING_LONG_WIDE', include:false},
    {index:14 ,text:'Dredging',       value: 'DREDGING',      include:false},
    {index:15 ,text:'Diving',         value: 'DIVING',        include:false},
    {index:16 ,text:'Military',       value: 'MILITARY',      include:false},
    {index:17 ,text:'Sailing',        value: 'SAILING',       include:false},
    {index:18 ,text:'Pleasure',       value: 'PLEASURE',      include:false},
    {index:19 ,text:'Hsc',            value: 'HSC',           include:false},
    {index:20 ,text:'Passenger',      value: 'PASSENGER',     include:false},
    {index:21 ,text:'Cargo',          value: 'CARGO',         include:false},
    {index:22 ,text:'Tanker',         value: 'TANKER',        include:false},
    {index:23 ,text:'Ships According to RR', value: 'SHIPS_ACCORDING_TO_RR', include:false},
    {index:24 ,text:'Unknown',        value: 'UNKNOWN',       include:false}
];

//Source Bases
var sourceBases = [{text:1+'.', input:'', counter: 1}];


//
// Data for time selection section
//

//Time Zones
var timeZones = [
    {ID: 'utc', Title: 'UTC'},
    {ID: 'utc/gmt+1', Title: 'UTC/GMT+1'},
    {ID: 'utc/gmt+2', Title: 'UTC/GMT+2'},
    {ID: 'utc/gmt+3', Title: 'UTC/GMT+3'},
    {ID: 'utc/gmt+4', Title: 'UTC/GMT+4'}
];

//Start and end date of date-picker
var startDatepicker = {date: new Date()};
var endDatepicker = {date: new Date()};

//Start and end time of time-picker
var startTimepicker = {time: "14:00"};
var endTimepicker = {time: "14:10"};

//Time zone to start the time zone picker with (should be the same as on of the objects in timeZones
var timeZone = {ID: 'utc', Title: 'UTC'};

//
// Data for output format section
//

//List of available separators
var tableSeparators = [
    {Title: 'Semicolon', Value:';'},
    {Title: 'Colon', Value:':'},
    {Title: 'Comma', Value:','}
];

//Current separator (must be one of those in tableSeparators array)
var tableSeparator = {sep: ';'};

//Array of objects not currently included in query
//Extra entries can be added/removed
//id must be 0,1,2,3....x
//value-, queryName-, ex-values can be changed
//category values can NOT be changed for now TODO: make category values changeable eg in output-format-dir line 47
var notIncluded = [
    { 'id': 0,	value: "Longitude",     queryName: "lon",           ex: "12.369",       category: "all,xyz"},
    { 'id': 1, 	value: "Latitude",		queryName: "lat",           ex: "55.634",       category: "all,xyz"},
    { 'id': 2, 	value: "mmsi",		    queryName: "mmsi",          ex: "123456789",             category: "all"},
    { 'id': 3, 	value: "time",	        queryName: "time",          ex: "YYYY-MM-DD",   category: "all,time"},
    { 'id': 4, 	value: "timestamp",     queryName: "timestamp",     ex: "123456789123456",     category: "all,time"}];


//landcodes for autocomplete of Source Country entry
countryCodes = [{name:"AFGHANISTAN",code:"AFG",num:"004"},{name:"ÅLAND ISLANDS",code:"ALA",num:"248"},{name:"ALBANIA",code:"ALB",num:"008"},{name:"ALGERIA",code:"DZA",num:"012"},{name:"AMERICAN SAMOA",code:"ASM",num:"016"},{name:"ANDORRA",code:"AND",num:"020"},{name:"ANGOLA",code:"AGO",num:"024"},{name:"ANGUILLA",code:"AIA",num:"660"},{name:"ANTARCTICA",code:"ATA",num:"010"},{name:"ANTIGUA AND BARBUDA",code:"ATG",num:"028"},{name:"ARGENTINA",code:"ARG",num:"032"},{name:"ARMENIA",code:"ARM",num:"051"},{name:"ARUBA",code:"ABW",num:"533"},{name:"AUSTRALIA",code:"AUS",num:"036"},{name:"AUSTRIA",code:"AUT",num:"040"},{name:"AZERBAIJAN",code:"AZE",num:"031"},{name:"BAHAMAS",code:"BHS",num:"044"},{name:"BAHRAIN",code:"BHR",num:"048"},{name:"BANGLADESH",code:"BGD",num:"050"},{name:"BARBADOS",code:"BRB",num:"052"},{name:"BELARUS",code:"BLR",num:"112"},{name:"BELGIUM",code:"BEL",num:"056"},{name:"BELIZE",code:"BLZ",num:"084"},{name:"BENIN",code:"BEN",num:"204"},{name:"BERMUDA",code:"BMU",num:"060"},{name:"BHUTAN",code:"BTN",num:"064"},{name:"BOLIVIA, PLURINATIONAL STATE OF",code:"BOL",num:"068"},{name:"BONAIRE, SINT EUSTATIUS AND SABA",code:"BES",num:"535"},{name:"BOSNIA AND HERZEGOVINA",code:"BIH",num:"070"},{name:"BOTSWANA",code:"BWA",num:"072"},{name:"BOUVET ISLAND",code:"BVT",num:"074"},{name:"BRAZIL",code:"BRA",num:"076"},{name:"BRITISH INDIAN OCEAN TERRITORY",code:"IOT",num:"086"},{name:"BRUNEI DARUSSALAM",code:"BRN",num:"096"},{name:"BULGARIA",code:"BGR",num:"100"},{name:"BURKINA FASO",code:"BFA",num:"854"},{name:"BURUNDI",code:"BDI",num:"108"},{name:"CAMBODIA",code:"KHM",num:"116"},{name:"CAMEROON",code:"CMR",num:"120"},{name:"CANADA",code:"CAN",num:"124"},{name:"CAPE VERDE",code:"CPV",num:"132"},{name:"CAYMAN ISLANDS",code:"CYM",num:"136"},{name:"CENTRAL AFRICAN REPUBLIC",code:"CAF",num:"140"},{name:"CHAD",code:"TCD",num:"148"},{name:"CHILE",code:"CHL",num:"152"},{name:"CHINA",code:"CHN",num:"156"},{name:"CHRISTMAS ISLAND",code:"CXR",num:"162"},{name:"COCOS (KEELING) ISLANDS",code:"CCK",num:"166"},{name:"COLOMBIA",code:"COL",num:"170"},{name:"COMOROS",code:"COM",num:"174"},{name:"CONGO",code:"COG",num:"178"},{name:"CONGO, THE DEMOCRATIC REPUBLIC OF THE",code:"COD",num:"180"},{name:"COOK ISLANDS",code:"COK",num:"184"},{name:"COSTA RICA",code:"CRI",num:"188"},{name:"CÔTE D'IVOIRE",code:"CIV",num:"384"},{name:"CROATIA",code:"HRV",num:"191"},{name:"CUBA",code:"CUB",num:"192"},{name:"CURAÇAO",code:"CUW",num:"531"},{name:"CYPRUS",code:"CYP",num:"196"},{name:"CZECH REPUBLIC",code:"CZE",num:"203"},{name:"DENMARK",code:"DNK",num:"208"},{name:"DJIBOUTI",code:"DJI",num:"262"},{name:"DOMINICA",code:"DMA",num:"212"},{name:"DOMINICAN REPUBLIC",code:"DOM",num:"214"},{name:"ECUADOR",code:"ECU",num:"218"},{name:"EGYPT",code:"EGY",num:"818"},{name:"EL SALVADOR",code:"SLV",num:"222"},{name:"EQUATORIAL GUINEA",code:"GNQ",num:"226"},{name:"ERITREA",code:"ERI",num:"232"},{name:"ESTONIA",code:"EST",num:"233"},{name:"ETHIOPIA",code:"ETH",num:"231"},{name:"FALKLAND ISLANDS (MALVINAS)",code:"FLK",num:"238"},{name:"FAROE ISLANDS",code:"FRO",num:"234"},{name:"FIJI",code:"FJI",num:"242"},{name:"FINLAND",code:"FIN",num:"246"},{name:"FRANCE",code:"FRA",num:"250"},{name:"FRENCH GUIANA",code:"GUF",num:"254"},{name:"FRENCH POLYNESIA",code:"PYF",num:"258"},{name:"FRENCH SOUTHERN TERRITORIES",code:"ATF",num:"260"},{name:"GABON",code:"GAB",num:"266"},{name:"GAMBIA",code:"GMB",num:"270"},{name:"GEORGIA",code:"GEO",num:"268"},{name:"GERMANY",code:"DEU",num:"276"},{name:"GHANA",code:"GHA",num:"288"},{name:"GIBRALTAR",code:"GIB",num:"292"},{name:"GREECE",code:"GRC",num:"300"},{name:"GREENLAND",code:"GRL",num:"304"},{name:"GRENADA",code:"GRD",num:"308"},{name:"GUADELOUPE",code:"GLP",num:"312"},{name:"GUAM",code:"GUM",num:"316"},{name:"GUATEMALA",code:"GTM",num:"320"},{name:"GUERNSEY",code:"GGY",num:"831"},{name:"GUINEA",code:"GIN",num:"324"},{name:"GUINEA-BISSAU",code:"GNB",num:"624"},{name:"GUYANA",code:"GUY",num:"328"},{name:"HAITI",code:"HTI",num:"332"},{name:"HEARD ISLAND AND MCDONALD ISLANDS",code:"HMD",num:"334"},{name:"HOLY SEE (VATICAN CITY STATE)",code:"VAT",num:"336"},{name:"HONDURAS",code:"HND",num:"340"},{name:"HONG KONG",code:"HKG",num:"344"},{name:"HUNGARY",code:"HUN",num:"348"},{name:"ICELAND",code:"ISL",num:"352"},{name:"INDIA",code:"IND",num:"356"},{name:"INDONESIA",code:"IDN",num:"360"},{name:"IRAN, ISLAMIC REPUBLIC OF",code:"IRN",num:"364"},{name:"IRAQ",code:"IRQ",num:"368"},{name:"IRELAND",code:"IRL",num:"372"},{name:"ISLE OF MAN",code:"IMN",num:"833"},{name:"ISRAEL",code:"ISR",num:"376"},{name:"ITALY",code:"ITA",num:"380"},{name:"JAMAICA",code:"JAM",num:"388"},{name:"JAPAN",code:"JPN",num:"392"},{name:"JERSEY",code:"JEY",num:"832"},{name:"JORDAN",code:"JOR",num:"400"},{name:"KAZAKHSTAN",code:"KAZ",num:"398"},{name:"KENYA",code:"KEN",num:"404"},{name:"KIRIBATI",code:"KIR",num:"296"},{name:"KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF",code:"PRK",num:"408"},{name:"KOREA, REPUBLIC OF",code:"KOR",num:"410"},{name:"KUWAIT",code:"KWT",num:"414"},{name:"KYRGYZSTAN",code:"KGZ",num:"417"},{name:"LAO PEOPLE'S DEMOCRATIC REPUBLIC",code:"LAO",num:"418"},{name:"LATVIA",code:"LVA",num:"428"},{name:"LEBANON",code:"LBN",num:"422"},{name:"LESOTHO",code:"LSO",num:"426"},{name:"LIBERIA",code:"LBR",num:"430"},{name:"LIBYA",code:"LBY",num:"434"},{name:"LIECHTENSTEIN",code:"LIE",num:"438"},{name:"LITHUANIA",code:"LTU",num:"440"},{name:"LUXEMBOURG",code:"LUX",num:"442"},{name:"MACAO",code:"MAC",num:"446"},{name:"MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF",code:"MKD",num:"807"},{name:"MADAGASCAR",code:"MDG",num:"450"},{name:"MALAWI",code:"MWI",num:"454"},{name:"MALAYSIA",code:"MYS",num:"458"},{name:"MALDIVES",code:"MDV",num:"462"},{name:"MALI",code:"MLI",num:"466"},{name:"MALTA",code:"MLT",num:"470"},{name:"MARSHALL ISLANDS",code:"MHL",num:"584"},{name:"MARTINIQUE",code:"MTQ",num:"474"},{name:"MAURITANIA",code:"MRT",num:"478"},{name:"MAURITIUS",code:"MUS",num:"480"},{name:"MAYOTTE",code:"MYT",num:"175"},{name:"MEXICO",code:"MEX",num:"484"},{name:"MICRONESIA, FEDERATED STATES OF",code:"FSM",num:"583"},{name:"MOLDOVA, REPUBLIC OF",code:"MDA",num:"498"},{name:"MONACO",code:"MCO",num:"492"},{name:"MONGOLIA",code:"MNG",num:"496"},{name:"MONTENEGRO",code:"MNE",num:"499"},{name:"MONTSERRAT",code:"MSR",num:"500"},{name:"MOROCCO",code:"MAR",num:"504"},{name:"MOZAMBIQUE",code:"MOZ",num:"508"},{name:"MYANMAR",code:"MMR",num:"104"},{name:"NAMIBIA",code:"NAM",num:"516"},{name:"NAURU",code:"NRU",num:"520"},{name:"NEPAL",code:"NPL",num:"524"},{name:"NETHERLANDS",code:"NLD",num:"528"},{name:"NEW CALEDONIA",code:"NCL",num:"540"},{name:"NEW ZEALAND",code:"NZL",num:"554"},{name:"NICARAGUA",code:"NIC",num:"558"},{name:"NIGER",code:"NER",num:"562"},{name:"NIGERIA",code:"NGA",num:"566"},{name:"NIUE",code:"NIU",num:"570"},{name:"NORFOLK ISLAND",code:"NFK",num:"574"},{name:"NORTHERN MARIANA ISLANDS",code:"MNP",num:"580"},{name:"NORWAY",code:"NOR",num:"578"},{name:"OMAN",code:"OMN",num:"512"},{name:"PAKISTAN",code:"PAK",num:"586"},{name:"PALAU",code:"PLW",num:"585"},{name:"PALESTINE, STATE OF",code:"PSE",num:"275"},{name:"PANAMA",code:"PAN",num:"591"},{name:"PAPUA NEW GUINEA",code:"PNG",num:"598"},{name:"PARAGUAY",code:"PRY",num:"600"},{name:"PERU",code:"PER",num:"604"},{name:"PHILIPPINES",code:"PHL",num:"608"},{name:"PITCAIRN",code:"PCN",num:"612"},{name:"POLAND",code:"POL",num:"616"},{name:"PORTUGAL",code:"PRT",num:"620"},{name:"PUERTO RICO",code:"PRI",num:"630"},{name:"QATAR",code:"QAT",num:"634"},{name:"RÉUNION",code:"REU",num:"638"},{name:"ROMANIA",code:"ROU",num:"642"},{name:"RUSSIAN FEDERATION",code:"RUS",num:"643"},{name:"RWANDA",code:"RWA",num:"646"},{name:"SAINT BARTHÉLEMY",code:"BLM",num:"652"},{name:"SAINT HELENA, ASCENSION AND TRISTAN DA CUNHA",code:"SHN",num:"654"},{name:"SAINT KITTS AND NEVIS",code:"KNA",num:"659"},{name:"SAINT LUCIA",code:"LCA",num:"662"},{name:"SAINT MARTIN (FRENCH PART)",code:"MAF",num:"663"},{name:"SAINT PIERRE AND MIQUELON",code:"SPM",num:"666"},{name:"SAINT VINCENT AND THE GRENADINES",code:"VCT",num:"670"},{name:"SAMOA",code:"WSM",num:"882"},{name:"SAN MARINO",code:"SMR",num:"674"},{name:"SAO TOME AND PRINCIPE",code:"STP",num:"678"},{name:"SAUDI ARABIA",code:"SAU",num:"682"},{name:"SENEGAL",code:"SEN",num:"686"},{name:"SERBIA",code:"SRB",num:"688"},{name:"SEYCHELLES",code:"SYC",num:"690"},{name:"SIERRA LEONE",code:"SLE",num:"694"},{name:"SINGAPORE",code:"SGP",num:"702"},{name:"SINT MAARTEN (DUTCH PART)",code:"SXM",num:"534"},{name:"SLOVAKIA",code:"SVK",num:"703"},{name:"SLOVENIA",code:"SVN",num:"705"},{name:"SOLOMON ISLANDS",code:"SLB",num:"090"},{name:"SOMALIA",code:"SOM",num:"706"},{name:"SOUTH AFRICA",code:"ZAF",num:"710"},{name:"SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS",code:"SGS",num:"239"},{name:"SOUTH SUDAN",code:"SSD",num:"728"},{name:"SPAIN",code:"ESP",num:"724"},{name:"SRI LANKA",code:"LKA",num:"144"},{name:"SUDAN",code:"SDN",num:"729"},{name:"SURINAME",code:"SUR",num:"740"},{name:"SVALBARD AND JAN MAYEN",code:"SJM",num:"744"},{name:"SWAZILAND",code:"SWZ",num:"748"},{name:"SWEDEN",code:"SWE",num:"752"},{name:"SWITZERLAND",code:"CHE",num:"756"},{name:"SYRIAN ARAB REPUBLIC",code:"SYR",num:"760"},{name:"TAIWAN, PROVINCE OF CHINA",code:"TWN",num:"158"},{name:"TAJIKISTAN",code:"TJK",num:"762"},{name:"TANZANIA, UNITED REPUBLIC OF",code:"TZA",num:"834"},{name:"THAILAND",code:"THA",num:"764"},{name:"TIMOR-LESTE",code:"TLS",num:"626"},{name:"TOGO",code:"TGO",num:"768"},{name:"TOKELAU",code:"TKL",num:"772"},{name:"TONGA",code:"TON",num:"776"},{name:"TRINIDAD AND TOBAGO",code:"TTO",num:"780"},{name:"TUNISIA",code:"TUN",num:"788"},{name:"TURKEY",code:"TUR",num:"792"},{name:"TURKMENISTAN",code:"TKM",num:"795"},{name:"TURKS AND CAICOS ISLANDS",code:"TCA",num:"796"},{name:"TUVALU",code:"TUV",num:"798"},{name:"UGANDA",code:"UGA",num:"800"},{name:"UKRAINE",code:"UKR",num:"804"},{name:"UNITED ARAB EMIRATES",code:"ARE",num:"784"},{name:"UNITED KINGDOM",code:"GBR",num:"826"},{name:"UNITED STATES",code:"USA",num:"840"},{name:"UNITED STATES MINOR OUTLYING ISLANDS",code:"UMI",num:"581"},{name:"URUGUAY",code:"URY",num:"858"},{name:"UZBEKISTAN",code:"UZB",num:"860"},{name:"VANUATU",code:"VUT",num:"548"},{name:"VENEZUELA, BOLIVARIAN REPUBLIC OF",code:"VEN",num:"862"},{name:"VIET NAM",code:"VNM",num:"704"},{name:"VIRGIN ISLANDS, BRITISH",code:"VGB",num:"092"},{name:"VIRGIN ISLANDS, U.S.",code:"VIR",num:"850"},{name:"WALLIS AND FUTUNA",code:"WLF",num:"876"},{name:"WESTERN SAHARA",code:"ESH",num:"732"},{name:"YEMEN",code:"YEM",num:"887"},{name:"ZAMBIA",code:"ZMB",num:"894"},{name:"ZIMBABWE",code:"ZWE",num:"716"}];

//autocomplete for sourceCountries
countryDatabase = [];
countryCode = [];

for (var i=0; i<countryCodes.length; i++) {
    countryDatabase[i]=countryCodes[i].name;
    countryCode[i]=countryCodes[i].code;

}






