import Trip from "@/models/Trip";

export async function GET() {
  return new Response(JSON.stringify(await Trip.find()), { status: 200 });
}

export async function POST(request) {
  const body = await request.json();
  const trip = new Trip(body);
  await trip.save();
  return new Response(JSON.stringify(trip), { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const trip = await Trip.findByIdAndUpdate(_id, updateData, { new: true });
  if (!trip) {
    return new Response("Trip not found", { status: 404 });
  }
  return new Response(JSON.stringify(trip), { status: 200 });
}