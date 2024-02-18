import { connectToDatabase } from "@/db/db";
import User from "@/db/model/User";

export async function POST(req, res) {
  // console.log('Request object:', req);
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the signature data from the request
    const formData = await req.formData();
    const signature = formData.get("signature");
    let arrayBuffer = await signature.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const url = new URL(req.url);
    console.log(
      "req.urlllllllllllll######################################################clear",
      url
    );
    const id = url.searchParams.get("id");

    // Extract the ID from the URL params
    // const { id } = req.query;

    console.log("check if id found ***************", url);

    if (!id) {
      return res.status(400).json({ error: "ID parameter is missing" });
    }

    // Find the document by ID and update the signature field
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { signature: buffer } },
      { new: true }
    );

    // Check if the document was found and updated
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with success message and updated user data
    return Response.json({
      message: "Signature updated successfully!",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating signature:", req.query);
    res
      .status(500)
      .json({ error: "An error occurred while updating the signature." });
  }
}
