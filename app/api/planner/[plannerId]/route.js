import Planner from "@/models/Planner";

// Handle GET requests (optional, if you want to retrieve a planner by ID)
export async function GET(request, { params }) {
  const { plannerId } = params;
  
  try {
    const planner = await Planner.findById(plannerId);
    if (!planner) {
      return new Response(JSON.stringify({ message: "Planner not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(planner), { status: 200 });
  } catch (error) {
    console.error("Error fetching planner:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

// Handle DELETE requests
export async function DELETE(request, { params }) {
  const { plannerId } = params;
  
  try {
    const deletedPlanner = await Planner.findByIdAndDelete(plannerId);
    
    if (!deletedPlanner) {
      return new Response(JSON.stringify({ message: "Planner not found" }), { status: 404 });
    }
    
    return new Response(JSON.stringify({ message: "Planner deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting planner:", error);
    return new Response(JSON.stringify({ message: "Error deleting planner" }), { status: 500 });
  }
}

// Handle PUT or PATCH requests (to update an existing planner)
export async function PUT(request, { params }) {
  const { plannerId } = params;
  const body = await request.json(); // Get the updated data from the request body
  
  try {
    const updatedPlanner = await Planner.findByIdAndUpdate(
      plannerId,
      { $set: body }, // Update fields with the new data
      { new: true, runValidators: true } // Return the updated document, validate schema
    );
    
    if (!updatedPlanner) {
      return new Response(JSON.stringify({ message: "Planner not found" }), { status: 404 });
    }
    
    return new Response(JSON.stringify(updatedPlanner), { status: 200 });
  } catch (error) {
    console.error("Error updating planner:", error);
    return new Response(JSON.stringify({ message: "Error updating planner" }), { status: 500 });
  }
}
