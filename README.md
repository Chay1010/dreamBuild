# 🏎️ DreamBuild AI — *The Eye Buys the Dream*

[![React](https://img.shields.io/badge/React-19.0-blue.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-purple.svg?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Gemini](https://img.shields.io/badge/Gemini_API-Enabled-green.svg?logo=googlegemini)](https://aistudio.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC.svg?logo=tailwindcss)](https://tailwindcss.com/)

**DreamBuild AI** is a next-generation client-side automotive customization visualizer and marketing pipeline. Tailored for mechanics, auto-scrappers, and car enthusiasts, DreamBuild AI takes raw scrap inventory or photo inputs and turns them into high-converting, street-legal automotive masterpieces in seconds.

---

## 📺 Demo Videos

Here are the demonstration recordings showing the project in action:

### Demo 1: Core Interface & Feature Tour
<div align="center">
  <video src="./public/assets/demo-recording-1.mp4" width="100%" max-width="800px" controls style="border-radius: 12px; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,200,83,0.2);"></video>
</div>

### Demo 2: Studio Visualizer Workflow
<div align="center">
  <video src="./public/assets/demo-recording-2.mp4" width="100%" max-width="800px" controls style="border-radius: 12px; border: 1px solid #333; box-shadow: 0 10px 30px rgba(0,200,83,0.2);"></video>
</div>

---


## ✨ Features

### 🛠️ 1. Studio Workspace & 3D Interactive Viewer
* **Image & 3D Import:** Upload flat car/part photos or load interactive **`.glb` / `.gltf`** 3D files directly into the browser using a high-performance `<model-viewer>` component.
* **Granular Controls:** Customize paint color, paint finish (matte, gloss, forged carbon, brushed aluminum), rim styles (TE37, BBS Mesh, turbofan), stance (ride height & camber), and body kit configurations.
* **Virtual Simulator (Demo Mode):** Test and showcase the generation workflow in presentation mode without consuming Gemini API tokens.

### 🧠 2. Gemini-Powered Render Engine
* **Img2Img Rendering:** Leverages Google Gemini's image models to transform uploaded scrap vehicle pictures into high-definition, ray-traced automotive renders.
* **VEO Video Generation:** Generates a cinematic drone orbit shot around the customized vehicle model using the **VEO 3.1** fast-video preview model.
* **Live System Logs:** Watch the step-by-step neural net execution, vector analysis, and post-processing logs inside a retro terminal interface.

### ⚖️ 3. AI Legal Guard
* **Built-in Compliance:** Evaluates all proposed car modifications against traffic safety guidelines.
* **Compliance Badge:** Awards a "Traffic Law Compliant" status block if the mods are street-legal, alerting users to unsafe or prohibited options (e.g., illegal tints, airbag removal, headlight color modifications).

### 💬 4. DreamBuild Copilot
* **Interactive AI Advisor:** A floating chat companion built with `gemini-3-pro-preview` acting as your personal tuning expert and legal consultant.
* **Bilingual Support:** Instantly detects and responds in English or French depending on user preference.

### 🖼️ 5. The Hall of Fame (Gallery)
* Browse and showcase curated masterpieces from the community.
* **Remix Style:** Instantly import design profiles (colors, rims, kits) from gallery artworks back into the Studio workspace.

---

## 🛠️ Technology Stack

* **Frontend Framework:** [React 19](https://react.dev/) with [Vite](https://vitejs.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS CDN](https://tailwindcss.com/) & Vanilla CSS
* **AI Integration:** `@google/genai` (Google AI Studio SDK)
* **Icons:** `lucide-react`
* **Animations:** `framer-motion`
* **3D Rendering:** Google's `<model-viewer>` (web components)

---

## 📂 Project Architecture

The core frontend code is modularly structured:
* [index.html](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/index.html) — Main entry HTML, loading custom fonts, Tailwind CSS, and `<model-viewer>`.
* [index.tsx](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/index.tsx) — Main entry point mounting the React app.
* [App.tsx](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/App.tsx) — Top-level router routing between Landing page, Studio Dashboard, Gallery, and Info pages.
* [translations.ts](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/translations.ts) — Full English & French dictionary supporting instant localized translations.
* `components/`
  * [Dashboard.tsx](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/components/Dashboard.tsx) — The main visualization studio workspace containing the AI image, video generators, stance controls, and the terminal log.
  * [ChatBot.tsx](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/components/ChatBot.tsx) — AI Copilot component interfacing with Gemini.
  * [BeforeAfterSlider.tsx](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/components/BeforeAfterSlider.tsx) — Slider component comparing raw scrap parts to dream renders.
  * [GalleryPage.tsx](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/components/GalleryPage.tsx) — Curated collection page with filtering, liking, and remixing.
  * [LandingPage.tsx](file:///c:/Users/chaym/Desktop/DreamBuils/DreamBuild-AI/components/LandingPage.tsx) — Introduction and sales landing page.

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed.

### 2. Install Dependencies
In the root directory, run:
```bash
npm install
```

### 3. Setup Gemini API Key
Create a `.env.local` file in the root directory and add your Google AI Studio API Key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```
*(Vite automatically loads environment variables and injects them under `process.env.API_KEY` through the build configuration).*

### 4. Run Development Server
Start the local server by running:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to experience DreamBuild AI.
