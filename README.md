# 🧩 Backend Starter

This project is designed to provide an initial setup with pre-configured **authentication** and **user modules** — helping you save time on repetitive setup tasks.

---

##  Installation Process

1. **Clone the repository**
   ```bash
   git clone "repo-url"
## Install dependencies

npm install

## Set up environment variables

Create a <b>.env</b> file in the project root with the following example:

```bash

NODE_ENV=
PORT=
DATABASE_URL=
BCRYPT_SALT_ROUNDS=
JWT_SECRET=

```

2. **Run the project**

```bash

npm run dev
``` 

## Create the Project from Scratch

If you want to build the same structure manually, follow these steps:

1. **Create and open your project folder**

```bash

mkdir backend_starter
cd backend_starter
code .
```
2. **Initialize and install dependencies**

```bash

npm init -y
npm install express mongoose cors dotenv
npm install typescript ts-node-dev --save-dev
npx tsc --init

```
**Update your tsconfig.json**

Configure it as follows:

```bash
{
  "compilerOptions": {
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```
**Add scripts in package.json**

```bash

"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
  "lint": "npx eslint src --ignore-pattern '.js,.ts'",
  "lint:fix": "npx eslint src --fix",
  "format": "npx prettier --ignore-path .prettierignore --write \"**/*.{js,ts,json}\"",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```
3.**Create the folder structure**


```bash
backend_starter/
├── src/
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── .env

```
**Run the development server**

```bash

npm run dev
```