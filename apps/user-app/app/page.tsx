import Image from "next/image";
import { Button } from "@repo/ui/button";
import {Input} from "@repo/ui/input"
import Prisma from "@repo/db/client"

export default async function  Home() {
  return (
      <Button appName="uer-app">
                Click Me 
                <Input/>
                <div className="bg-blue-800 text-center">
                          HI this is god 
                </div>
      </Button>
  );
}
