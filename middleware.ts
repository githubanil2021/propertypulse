/*export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/profile", "/properties/add"],
};

*/


import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  return NextResponse.next();
}