import Trip from "@/models/Trip";

export async function GET(request, { params }) {
  const { tripId } = params;

  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return new Response("Trip not found", { status: 404 });
    }
    return new Response(JSON.stringify(trip), { status: 200 });
  } catch (error) {
    return new Response("Server error", { status: 500 });
  }
}
