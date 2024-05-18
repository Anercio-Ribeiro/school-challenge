Este projecto é um CRUD feito em Next.js typescript, tailwind, daisyUi, com prisma, SQL server e swagger UI

Configurar o projecto na máquina local:

1- instalar instalar o sql server e definir a string connection no ficheiro .env ou .env.local

2- Instalar dependências npm
npm i ou npm install

3- gerar migrations na base de dados
npx prisma migrate dev

4- Rodar o projecto
npm run dev

aceder o projecto no endereço: [http://localhost:3000](http://localhost:3000)

aceder a documentação swagger: [http://localhost:3000/api-doc](http://localhost:3000/api-doc)
