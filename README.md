# 🏛️ Homs City Council Portal (منصة مجلس مدينة حمص) A comprehensive, bilingual (Arabic/English) digital platform for Homs City Council, covering Health, Sports, and Education sectors. Designed to streamline public services, display city news, events, facilities, and history, while featuring a secure, role-based administrative dashboard. 
---
## ✨ Key Features
### 🌐 Public Portal
- Sectors Coverage: Dedicated sections for Health, Sports, and Education services, facilities, and news.
- Rich Content & FAQs: News, events, facilities directory, city history, media gallery, and an interactive FAQ section.
- Bilingual Support (i18n): Full localization (Arabic & English) powered by next-intl with optimized routing.
- Dynamic Theming: Seamless Dark and Light mode support using next-themes.
- Interactive Map: Custom interactive map integration using Leaflet to display city data and facility locations.
### 🛡️ Secure Admin Dashboard 
- Role-Based Access Control (RBAC): Multi-tier permission system supporting a SuperAdmin and 3 distinct Admin roles. 
- Protected Routes: Secured Next.js middleware handling tokens and session validation via next-auth.
- Data Visualization: Interactive charts integrated into the dashboard using Recharts for analytical data overview.
--- 
## 🛠️ Architecture & Engineering Highlights 
- Structured Planning: Started with comprehensive architectural planning, defining core sections, page layouts, and strict attribute mapping for all data objects before writing code.
- Type Safety & Validation: Built robust TypeScript types combined with Zod schemas and React Hook Form for foolproof form handling and type safety.
- State Management & URL Params: Efficient server/client state management using TanStack React Query alongside nuqs for type-safe URL search parameter management.
- Component-Driven Design: Strict adherence to the Separation of Concerns principle, decoupling business logic from UI components with modular styling using clsx and tailwind-merge.
---
## 🚀 Tech Stack 
- Framework: Next.js (App Router)
- Language: TypeScript
- Styling & UI: Tailwind CSS, clsx, tailwind-merge, lucide-react
- Form Management & Validation: React Hook Form (rhf), Zod
- Data Fetching & State: TanStack React Query, nuqs
- Authentication & Security: next-auth, Custom Middleware
- Localization & Theming: next-intl, next-themes
- Data Visualization & Maps: Recharts, Leaflet
- Backend Integration: Django (REST API)
---
## ⚙️ Installation & Setup To run this project locally, follow these steps: 
### Prerequisites Make sure you have Node.js (version 18+ recommended) and npm/yarn/pnpm installed on your machine.
### 
1. Clone the repository `bash git clone [https://github.com/YOUR_USERNAME/homs-city-council.git](https://github.com/YOUR_USERNAME/homs-city-council.git) cd homs-city-council 

2. Install dependencies

npm install # or yarn install # or pnpm install 

3. Environment Variables

Create a .env.local file in the root directory and configure the required environment variables (such as API base URL and NextAuth secret):
NEXT_PUBLIC_API_BASE_URL=your_django_backend_url_here NEXTAUTH_SECRET=your_nextauth_secret_here NEXTAUTH_URL=http://localhost:3000 

4. Run the development server

npm run dev # or yarn dev # or pnpm dev 
Open http://localhost:3000 with your browser to see the result.

⚠️ Performance Note

Note on Performance: You might occasionally notice a slight delay in data fetching. This is entirely due to the current free-tier hosting limitations of the backend server, and not related to the frontend architecture or optimization.

👥 Team

Frontend Developer: [Bashar Dagher] 
- in this project i was :  Architecture, UI/UX implementation, State management, i18n, Theming, roles, protected pathes, and Dashboard logic .
