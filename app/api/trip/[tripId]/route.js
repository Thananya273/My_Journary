import Trip from "@/models/Trip";

// Handle GET requests (optional, if you want to retrieve a trip by ID)
export async function GET(request, { params }) {
  const { tripId } = params;
  
  try {
    const trip = await Trip.findById(tripId);
    if (!trip) {
      return new Response(JSON.stringify({ message: "Trip not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(trip), { status: 200 });
  } catch (error) {
    console.error("Error fetching trip:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

// Handle DELETE requests
export async function DELETE(request, { params }) {
  const { tripId } = params;
  
  try {
    const deletedTrip = await Trip.findByIdAndDelete(tripId);
    
    if (!deletedTrip) {
      return new Response(JSON.stringify({ message: "Trip not found" }), { status: 404 });
    }
    
    return new Response(JSON.stringify({ message: "Trip deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting trip:", error);
    return new Response(JSON.stringify({ message: "Error deleting trip" }), { status: 500 });
  }
}

// Handle PUT or PATCH requests (to update an existing trip)
export async function PUT(request, { params }) {
  const { tripId } = params;
  const body = await request.json(); // Get the updated data from the request body
  
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      tripId,
      { $set: body }, // Update fields with the new data
      { new: true, runValidators: true } // Return the updated document, validate schema
    );
    
    if (!updatedTrip) {
      return new Response(JSON.stringify({ message: "Trip not found" }), { status: 404 });
    }
    
    return new Response(JSON.stringify(updatedTrip), { status: 200 });
  } catch (error) {
    console.error("Error updating trip:", error);
    return new Response(JSON.stringify({ message: "Error updating trip" }), { status: 500 });
  }
}
