# Issue Tracker 

A simple **Issue Tracking App** built with **Next.js 13**,**TypeScript**, **NextAuth.js**, **Prisma**, and **Radix UI**.  
This app allows users to sign in with Google/GitHub, track issues, and manage them via a clean UI.  

---

## Screenshots

### Dashboard
<img width="995" height="814" alt="image" src="https://github.com/user-attachments/assets/6c38b2e5-14cb-44d7-92fa-ff3f504e75a0" />


### Issues Page
<img width="992" height="812" alt="image" src="https://github.com/user-attachments/assets/d1e0e2f1-05e5-4c25-9fdb-92515ac0db98" />


---

## Features
- 🔑 Authentication with **Google** and **GitHub** (via NextAuth.js)
- 🗂 Issue management (create, update, delete)
- 🎨 Modern UI with **Radix UI** & **Tailwind CSS**
- 🗄 Database powered by **Prisma** + **PostgreSQL**
- 🔐 JWT-based sessions

---

## Tech Stack
- [Next.js 13](https://nextjs.org/) – React framework with App Router  
- [NextAuth.js](https://next-auth.js.org/) – Authentication  
- [Prisma](https://www.prisma.io/) – ORM  
- [Radix UI](https://www.radix-ui.com/) – UI components  
- [Tailwind CSS](https://tailwindcss.com/) – Styling  

---

## Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/issue-tracker.git
cd issue-tracker
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/yourdb"
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
GITHUB_ID="your_github_id"
GITHUB_SECRET="your_github_secret"
NEXTAUTH_SECRET="your_secret"
```

### 4️⃣ Migrate database

```bash
npx prisma migrate dev
```

### 5️⃣ Run the app

```bash
npm run dev
```

App will be available at: [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
/app
  /issues                  # Pages related to issues
    /detail
      /[id]/edit           # Edit page for a specific issue
    /new                   # Page to create a new issue
  /api
    /auth                  # NextAuth API routes (login, callback, etc.)
    /issues                # API routes for creating/fetching issues
    /summary               # API route for dashboard summary data
  /components              # Reusable UI components (buttons, modals, images, etc.)
/prisma                    # Prisma schema and database migrations

---
