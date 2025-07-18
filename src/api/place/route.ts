import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const response = await fetch(`https://valet-production.up.railway.app/api/place`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer 
                        eyJhbGciOiJIUzI1NiIsImtpZCI6ImlWVVpGNXhJSDNIWFE1QzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL25ra3F3Zmp4dGNrcGx3cm1paXlnLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJiZjkyYzZhYi1iMzEwLTQ0NWMtOTI2MS1iNDVjYmZkMzgxYzQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzUyODI2NTcxLCJpYXQiOjE3NTI4MjI5NzEsImVtYWlsIjoiaW1hbTA3bkBnbWFpbC5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6ImVtYWlsIiwicHJvdmlkZXJzIjpbImVtYWlsIl19LCJ1c2VyX21ldGFkYXRhIjp7ImVtYWlsIjoiaW1hbTA3bkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiJiZjkyYzZhYi1iMzEwLTQ0NWMtOTI2MS1iNDVjYmZkMzgxYzQifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc1MjgyMjk3MX1dLCJzZXNzaW9uX2lkIjoiYTk2MmY3MGMtOTc3Mi00Y2RhLWJjMzEtNjY2YTcyOGQzZDY2IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.Kr-LiDhRPF2B1X9yYx7yWQbc-WNLvxwlxmQjCVpbl4k`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
