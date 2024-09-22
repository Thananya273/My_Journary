import Diary from "@/models/Diary";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tripId = searchParams.get("tripId");

    // Fetch diaries for a specific tripId if provided
    const diaries = tripId ? await Diary.find({ tripId }) : await Diary.find();
    return new Response(JSON.stringify(diaries), { status: 200 });
  } catch (error) {
    console.error("Error fetching diaries:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}

// File: api/diary.js


export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Incoming Diary Data:", body); // Log incoming data

    // Validate required fields
    if (!body.tripId || !body.emotion || !body.diary) {
      console.error("Validation Error: Missing required fields");
      return new Response(JSON.stringify({ error: 'tripId, emotion, and diary are required' }), { status: 400 });
    }

    // Create and save the diary entry
    const diary = new Diary(body);
    await diary.save();

    console.log("Diary saved successfully:", diary); // Log success
    return new Response(JSON.stringify(diary), { status: 201 });
  } catch (error) {
    console.error("Error saving diary:", error); // Log error details
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
