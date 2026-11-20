# AgriValue AI

**An agentic AI concept for intelligent harvest allocation, market connectivity and freight optimisation.**

Tech4Bharat / GAVS Hackathon — Agriculture and Food Processing, PS 6.1. This is an interactive concept-stage prototype, not a live marketplace. All buyer names, prices, farmer profiles, capacity figures, freight quotes and artwork are fictional or illustrative.

## Run the demo

Download or clone this repository and open `index.html` in Chrome or Edge. No API key, paid service, package installation, or backend is required. Alternatively, run `python -m http.server 8000` in this folder and open `http://localhost:8000`.

## What works

- Harvest planner: select crop, quantity, immediate cash requirement, remaining shelf life, edible lower-grade share, non-food waste share, price scenario and export eligibility. The deterministic engine calculates a constrained allocation, estimated net income, cash shortfalls and a future-price uncertainty range.
- Market intelligence: compare mock mandi prices after transport and view an illustrative forecast band, plus mock storage options.
- Farmer network: see a four-farmer example pooling a 1,000 kg order.
- Buyer marketplace: filter fictional retailers, wholesalers, merchants, restaurants, exporters, processors and waste recovery partners.
- Freight pooling: compare separate trips to shared freight and see weight-based cost allocation.
- Waste to value: food-safe grade B produce goes to food processing; spoiled/non-food material can only be considered for approved biogas, biofuel or compost recovery if net proceeds are positive.
- Ask the agent: a local rule-based explanation assistant with optional browser text-to-speech; no live LLM or multilingual STT is integrated.
- My activity: save simulated harvest plans, quote requests and pooling interests locally in the browser (where storage is supported).

## Example walkthrough

1. Open **AI harvest planner**. Use 1,000 kg onions and ₹6,000 urgent cash; leave export eligibility unchecked.
2. Generate the plan. It proposes 300 kg sold today, 400 kg to a direct buyer and 300 kg for later sale. The estimated receipts total ₹21,700 versus the ₹20,000 local baseline, an illustrative 8.5% increase.
3. Change remaining shelf life to two days to see storage excluded. Try a price decline, or enable export eligibility.
4. Set 20% non-food waste to see the non-food route. Raise waste collection cost to ₹3/kg to see why it is rejected.
5. Visit the marketplace, request a mock quote, and inspect My activity. Nothing is sent to any real provider.

## Tests

With Node.js installed, run:

```sh
node test.js
```

The 12 synthetic unit tests cover default allocation, cash, conservation of quantity, shelf life, export gating, waste segregation, unprofitable waste, impossible cash, price decline, food-safe grade B and zero quantity. This is a deterministic ranking/quantity allocation demo under simplified prices and route capacities, not a trained forecasting model or a validated production optimiser.

## Source code

- `index.html` — application shell
- `style.css` — responsive design
- `app.js` — interactive screens, invented listings, embedded vector illustrations and local activity
- `engine.js` — calculation logic and mock commodity inputs
- `test.js` — reproducible Node assertions
- `dashboard.png` — screenshot of the default scenario

## Production architecture (proposed, not integrated)

React/PWA and BHASHINI for multilingual voice; FastAPI plus PostgreSQL/PostGIS for data and geospatial matching; AGMARKNET for price feeds; validated LightGBM quantile forecasting; SciPy MILP for harvest allocation; OR-Tools for route scheduling; approved payment/partner APIs, audit records, consent, quality checks and applicable food/export/trade requirements. The demo intentionally uses plain HTML, CSS and JavaScript for zero-cost deployment.

Potential revenue model: buyer facilitation fees, freight booking commissions and optional FPO/buyer software subscriptions. All pricing and impact assumptions require field validation; no revenue or real transaction is claimed.

## Publish on GitHub Pages

1. Create a public repository called `agrivalue-ai` on GitHub.
2. Upload the contents of this folder (not the zipped archive), including `index.html` at repository root. Commit to `main`.
3. Open Settings → Pages. Under Build and deployment, choose Deploy from a branch, select `main` and `/ (root)`, then Save.
4. Submit the actual repository URL (`https://github.com/YOUR-USERNAME/agrivalue-ai`) to the hackathon. Once Pages is deployed, the live demo URL follows `https://YOUR-USERNAME.github.io/agrivalue-ai/`.

No external libraries, images, credentials or live APIs are needed.
