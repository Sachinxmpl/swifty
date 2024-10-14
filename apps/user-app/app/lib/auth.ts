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
                                                console.log("__________PHONE", phone, password)
                                                const hashedpassword = await bcrypt.hash(password, 10);

                                                const existinguser = await prismaClient.user.findFirst({
                                                            where: {
                                                                        number: phone,
                                                            },
                                                });
                                                if (existinguser) {
                                                            const isPasswordVerified = await bcrypt.compare(password, existinguser.password)
                                                            if (isPasswordVerified) {
                                                                        return {
                                                                                    id: existinguser.id,
                                                                                    name: existinguser.name,
                                                                                    number: existinguser.number
                                                                        }
                                                            }
                                                            else {
                                                                        return null
                                                            }
                                                }

                                                try {
                                                            console.log("______________Creating new user____________________")
                                                            const createdUser = await prismaClient.user.create({
                                                                        data: {
                                                                                    number: phone,
                                                                                    password: hashedpassword,
                                                                        }
                                                            })
                                                            return {
                                                                        id: createdUser.id,
                                                                        name: createdUser.name,
                                                                        number: createdUser.number
                                                            }
                                                } catch (e) {
                                                            console.log("Error in creating new user", e)
                                                            return null
                                                }

                                    },
                        }),
            ],
            secret: process.env.NEXT_AUTH_SECRET || "",
            callbacks: {
                        async session({ session, token }: any) {
                                    session.user.id = token.sub
                                    return session
                        }
            } , 
            pages : {
                        signIn : "/signin" , 
            }
};
