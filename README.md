# Project Setup

## Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [MySQL](https://www.mysql.com/) or [MariaDB](https://mariadb.org/)
- [Prisma](https://www.prisma.io/) (for database management)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repository.git
   cd your-repository
   ```

2. Create a `.env` file in the project root and configure your database connection:
   ```ini
   # Database Configuration
   DATABASE_URL=mysql://USER:PASSWORD@HOST:PORT/DATABASE
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Run database migrations:
   ```sh
   npx prisma migrate dev
   ```

5. Generate Prisma client:
   ```sh
   npx prisma generate
   ```

6. Compile TypeScript:
   ```sh
   npm run build
   ```

7. Start the server:
   ```sh
    npm run start
   ```

## Development
- Use `npm run dev` if you have a script configured for development mode.
- To apply schema changes, rerun `npx prisma migrate dev` and `npx prisma generate`.

