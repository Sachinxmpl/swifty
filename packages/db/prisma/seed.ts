import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const sachin = await  prisma.user.upsert({
    where : { number : '11111111'} , 
    update : {} , 
    create  : {
        number : '1111111111',
        password : "sachin",
        name : "sachin" , 
        onRampTransactions : {
            create : {
                startTime : new Date() , 
                status : "Success" , 
                amount : 2000 , 
                token : "1234" , 
                provider : "Global Ime Bank"
            }
        }
    }
  })
  const shyam = await prisma.user.upsert({
    where: { number: "2222222222" },
    update: {},
    create: {
      number: "2222222222",
      password: "shyam",
      name: "shyam",
      onRampTransactions: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "567",
          provider: "Nabil Bank",
        },
      },
    },
  });
  console.log({ sachin, shyam });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
