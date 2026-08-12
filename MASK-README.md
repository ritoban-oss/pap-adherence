# MASK — PAP Adherence Data Collection App

**Mask-fit Assessment & Selection Kit (MASK)**  
A multi-screen clinical data entry web application for capturing PAP mask selection, craniofacial anthropometry, behavioural assessment, and one-week compliance follow-up data.

---

## Overview

MASK is a browser-based form designed for sleep clinicians and research staff to collect structured data across the full PAP initiation workflow — from baseline screening through mask fitting to follow-up compliance metrics. Each patient record is assigned an auto-generated 8-digit Patient ID and stored as a single row in a Google Sheet via Google Apps Script.

The app runs entirely in the browser with no backend server. Data is submitted securely to a Google Sheet using the same Apps Script integration pattern used across the Institute of Sleep Science data collection suite.

---

## Screens

The form is divided into **9 screens**, each covering a distinct phase of the clinical workflow:

| # | Screen | Fields |
|---|---|---|
| 1 | **Patient Information** | Auto-generated Patient ID, name/initials, enrollment date, age, sex, BMI |
| 2 | **PSG & Screening** | AHI, ODI, LSAT (%), T90 (hrs), STOP-BANG score, ESS baseline |
| 3 | **Comorbidities & Nasal Status** | Free-text comorbidities, nasal septal deviation, allergic rhinitis, facial hair, dentition status |
| 4 | **Craniofacial Anthropometry** | Face width (bizygomatic), face length (nasion–menton), nasal bridge width, nasal alar width, nasal depth, mouth width, interpupillary distance — all in mm |
| 5 | **Behavioural Assessment** | Glasses in bed, sensitive nostrils, tosses & turns, claustrophobia severity (0–10 scale), preferred sleep position, hand grasping difficulty, nasal congestion, bed partner present |
| 6 | **AI-Guided Mask Fitting** | MyMask AI used (Y/N), AI recommended mask type, number of masks tried, fitting position, total fitting time, pressure trial during fitting |
| 7 | **Patient Comfort & Final Mask** | Patient-reported most comfortable type, AI concordance, final mask brand & model, mask type, cushion material, headgear type, PAP device model, humidification type, heated tube used |
| 8 | **Follow-up (1 Week)** | Mask changed since fitting, average CPAP usage (hrs/night), mask leak at 95th percentile (L/min) |
| 9 | **Review & Submit** | Full summary of all entered data before submission |

---

## Patient ID

Each record receives an **8-digit numeric Patient ID** (e.g. `47382910`) generated automatically when the form loads. The ID is:

- Checked for collision against existing records in the Sheet before being assigned
- Displayed prominently on Screen 1 with a one-click Copy button
- Carried through all subsequent screens and stored in the Sheet

If a collision is detected (extremely unlikely at 1 in 100 million), a new ID is generated automatically.

---

## Google Sheets Integration

All data is submitted to a single **MASK Data** tab in your Google Sheet. The tab is created automatically on the first submission, with a bolded, frozen header row.

### Sheet columns (51 total)

| Column | Field |
|---|---|
| A | Timestamp |
| B | Patient ID |
| C | Name / Initials |
| D | Enrollment Date |
| E | Age |
| F | Sex |
| G | BMI |
| H | PSG AHI |
| I | PSG ODI |
| J | LSAT (%) |
| K | T90 (hrs) |
| L | STOP-BANG |
| M | ESS Baseline |
| N | Comorbidities |
| O | Nasal Septal Deviation |
| P | Allergic Rhinitis |
| Q | Facial Hair |
| R | Dentition |
| S | Face Width (mm) |
| T | Face Length (mm) |
| U | Nasal Bridge Width (mm) |
| V | Nasal Alar Width (mm) |
| W | Nasal Depth (mm) |
| X | Mouth Width (mm) |
| Y | Interpupillary Distance (mm) |
| Z | Wears Glasses in Bed |
| AA | Sensitive Nostrils |
| AB | Tosses & Turns |
| AC | Claustrophobia (0–10) |
| AD | Preferred Sleep Position |
| AE | Hand Grasping Difficulty |
| AF | Frequent Nasal Congestion |
| AG | Bed Partner Present |
| AH | MyMask AI Used |
| AI | AI Recommended Type |
| AJ | No. Masks Tried |
| AK | Fitting Position |
| AL | Fitting Time (min) |
| AM | Pressure Trial During Fitting |
| AN | Patient Most Comfortable Type |
| AO | AI Concordant |
| AP | Final Mask Brand & Model |
| AQ | Final Mask Type |
| AR | Cushion Material |
| AS | Headgear Type |
| AT | Device Model |
| AU | Humidification Type |
| AV | Heated Tube Used |
| AW | Mask Changed (1 wk) |
| AX | Avg Usage (hrs/night) |
| AY | Mask Leak 95th (L/min) |

---

## Setup

### Step 1 — Deploy the Apps Script

1. Open the Google Sheet where data should be stored.
2. Go to **Extensions → Apps Script**.
3. Delete any existing code and paste the full contents of `apps-script.gs`.
4. Click **Save** (Ctrl+S / Cmd+S).
5. Click **Deploy → New Deployment**.
6. Set type to **Web App**, Execute as **Me**, Who has access: **Anyone**.
7. Click **Deploy** and authorise when prompted.
8. Copy the `/exec` URL — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```

### Step 2 — Configure the app

Open `config.js` and replace the placeholder with your URL:

```js
// Before
const SCRIPT_URL = 'PASTE_YOUR_APPS_SCRIPT_URL_HERE';

// After
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycb.../exec';
```

### Step 3 — Deploy to GitHub Pages

1. Push the repository to GitHub.
2. Go to **Settings → Pages**.
3. Source: **Deploy from a branch → main → / (root)**.
4. Your app will be live at `https://yourusername.github.io/mask-app/`.

### Health check

Paste the `/exec` URL directly into a browser. You should see:
```json
{ "status": "ready", "message": "MASK PAP Adherence collector is active." }
```

---

## Files

| File | Purpose |
|---|---|
| `index.html` | The full application — all screens, logic, and styles in a single file |
| `config.js` | Apps Script URL configuration — **edit this before deploying** |
| `apps-script.gs` | Google Apps Script — paste into your Sheet's script editor |
| `README.md` | This document |

---

## Design Notes

- Built using the same design system as the Institute of Sleep Science data collection suite (DISE Variability Study, PLATO-11).
- Fonts: DM Serif Display (headings) + DM Sans (body).
- Colour scheme: sky blue primary, with section-specific accent colours for fast visual orientation.
- No required fields beyond Patient ID and Enrollment Date — all other fields are captured where available but will not block progression.
- The app works from any modern browser on desktop or tablet. Mobile use is supported but a tablet or laptop is recommended for screens with measurement fields.

---

## Companion Apps

This app is part of the Institute of Sleep Science clinical data collection suite:

| App | Purpose |
|---|---|
| **DISE** | DISE variability study — intra-individual & inter-observer reproducibility |
| **PLATO-11** | Patient-reported OSA symptom questionnaire (AASM, 2024) |
| **MASK** | PAP mask selection, craniofacial anthropometry & adherence follow-up |
