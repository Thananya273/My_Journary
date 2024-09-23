import Diary from "@/models/Diary";

// Handle GET requests (optional, if you want to retrieve a diary by ID)
export async function GET(request, { params }) {
  const { diaryId } = params;

  try {
    const diary = await Diary.findById(diaryId);
    if (!diary) {
      return new Response(JSON.stringify({ message: "Diary not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(diary), { status: 200 });
  } catch (error) {
    console.error("Error fetching diary:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}

// Handle DELETE requests
export async function DELETE(request, { params }) {
  const { diaryId } = params;

  try {
    const deletedDiary = await Diary.findByIdAndDelete(diaryId);

    if (!deletedDiary) {
      return new Response(JSON.stringify({ message: "Diary not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Diary deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error deleting diary:", error);
    return new Response(JSON.stringify({ message: "Error deleting diary" }), { status: 500 });
  }
}

// Handle PUT or PATCH requests (to update an existing diary)
export async function PUT(request, { params }) {
  const { diaryId } = params;
  const body = await request.json(); // Get the updated data from the request body

  try {
    const updatedDiary = await Diary.findByIdAndUpdate(
      diaryId,
      { $set: body }, // Update fields with the new data
      { new: true, runValidators: true } // Return the updated document, validate schema
    );

    if (!updatedDiary) {
      return new Response(JSON.stringify({ message: "Diary not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedDiary), { status: 200 });
  } catch (error) {
    console.error("Error updating diary:", error);
    return new Response(JSON.stringify({ message: "Error updating diary" }), { status: 500 });
  }
}
