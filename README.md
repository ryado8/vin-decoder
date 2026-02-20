**Minimal VIN Decoder**
Minimal VIN decoder using the NHTSA vPIC API.
Further improvements needed:
- No database
- No auth
- No rate limiting
- No Docker

**Requirements**
Windows
Node.js 18+
npm

**Installation**
1. Clone or Download
```bash
git clone https://github.com/ryado8/vin-decoder.git
cd minimal-vin-decoder
```
Or download ZIP and extract.

2. Install Dependencies and Run App
```bash
npm install
npm run dev
```

Open `http://localhost:<port>`

**API Endpoint**
`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/{VIN}?format=json`

No API key required.
