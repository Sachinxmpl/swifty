import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json({
    name: "sachin",
    age: 20,
  });
}
