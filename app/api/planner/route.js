import Planner from "@/models/Planner";

export async function GET(request) {
  const planners = await Planner.find();
  return new Response(JSON.stringify(planners), { status: 200 });
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.place || !body.date) {
      return new Response(JSON.stringify({ error: 'Place and date are required' }), { status: 400 });
    }

    // Ensure the date is a Date object
    const date = new Date(body.date); // Convert incoming date to a Date object
    if (isNaN(date)) {
      return new Response(JSON.stringify({ error: 'Invalid date format' }), { status: 400 });
    }

    const planner = new Planner({
      ...body,
      date, // Use the converted Date object
    });
    await planner.save();

    return new Response(JSON.stringify(planner), { status: 201 });
  } catch (error) {
    console.error("Error saving planner:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

