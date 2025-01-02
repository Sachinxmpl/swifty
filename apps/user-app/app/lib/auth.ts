import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prismaClient from "@repo/db/client";

type Credentials = {
  phone: string;
  password: string;
};



export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentails",
      credentials: {
        phone: { label: "Number", type: "string", placeholder: "9840509605 " },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentails: Credentials) {
        const { phone, password } = credentails;
        console.log("===================================")
        console.log("__________PHONE", phone, password);
        const hashedpassword = await bcrypt.hash(password, 10);
        console.log("==================")
        const existinguser = await prismaClient.user.findFirst({
          where: {
            number: phone,
          },
        });
        console.log(existinguser)
        if (existinguser) {
          const isPasswordValid = await bcrypt.compare(
            password,
            existinguser.password
          );
          if (isPasswordValid) {
            return {
              id: existinguser.id,
              name: existinguser.name,
              number: existinguser.number,
            };
          } else {
            return null;
          }
        }

        try {
          console.log("++++++++++++++++++++++++++++++++++++++++++++++++")
          console.log("______________Creating new user____________________");
          const createdUser = await prismaClient.user.create({
            data: {
              number: phone,
              password: hashedpassword,
            },
          });

          await prismaClient.balance.create({
            data : {
              userId : createdUser.id,
              amount : Number("999999") , 
              locked : Number("111111")
            }
          })

          await prismaClient.onRampTransaction.createMany({
            data : [
              {
                userId 	: createdUser.id,
                status : "Success",
                amount : Number("99999") , 
                token : "123445" , 
                provider : "Global Ime Bank" ,
                startTime : new Date()
              },
              {
                userId 	: createdUser.id,
                status : "Failure",
                amount : Number("1111") , 
                token : "445" , 
                provider : "Global Ime Bank" ,
                startTime : new Date()
              }
            ]
          })

          return {
            id: createdUser.id,
            name: createdUser.name,
            number: createdUser.number,
          };
        } catch (e) {
          console.log("Error in creating new user", e);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET || "",
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      return session;
    },
  },


  async redirect(){
    return "http://localhost:3001"
  }

  // pages: {
  //   signIn: "/signin",
  // },
};
