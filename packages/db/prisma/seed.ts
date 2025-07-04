import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcryptjs";

async function main() {
  const sachin = await  prisma.user.upsert({
    where : { number : '9840509605'} , 
    update : {} , 
    create  : {
        number : '9840509605',
        password : await bcrypt.hash("sachin", 10),
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
    where: { number: "9765021126" },
    update: {},
    create: {
      number: "2222222222",
      password: await bcrypt.hash("shyam", 10),
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
