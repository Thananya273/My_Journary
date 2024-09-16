import Planner from "@/models/Planner";

export async function GET(request) {
  const planners = await Planner.find();
  return new Response(JSON.stringify(planners), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const planner = new Planner(body);
  await planner.save();
  return new Response(JSON.stringify(planner), { status: 201 });
}
