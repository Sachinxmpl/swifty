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
        phone: { label: "Number", type: "string", placeholder: "98********" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials?: Credentials) {
        if(!credentials){
          return null ; 
        }
        const { phone, password } = credentials;
        const hashedpassword = await bcrypt.hash(password, 10);
        const existinguser = await prismaClient.user.findFirst({
          where: {
            number: phone,
          },
        });
        if (existinguser) {
          const isPasswordValid = await bcrypt.compare(
            password,
            existinguser.password
          );
          if (isPasswordValid) {
            return {
              id: existinguser.id.toString(),
              name: existinguser.name,
              number: existinguser.number,
            };
          } else {
            return null;
          }
        }

        try {
        
          const createdUser = await prismaClient.user.create({
            data: {
              number: phone,
              password: hashedpassword,
            },
          });

          await prismaClient.balance.create({
            data : {
              userId : createdUser.id,
              amount : Number("0") , 
              locked : Number("0")
            }
          })

          return {
            id: createdUser.id.toString(),
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


  // async redirect(){
  //   // eslint-disable-next-line turbo/no-undeclared-env-vars
  //   return process.env.NEXTAUTH_URL ;
  // }

  // pages: {
  //   signIn: "/signin",
  // },
};
