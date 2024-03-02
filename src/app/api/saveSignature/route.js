import { connectToDatabase } from "@/db/db";
import User from "@/db/model/User";

export async function POST(req, res) {
 
  try {
    // Connect to the database
    await connectToDatabase();

    // Get the signature data from the request
    const formData = await req.formData();
    const signature = formData.get("signature");
    
    let arrayBuffer = await signature.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);


    // Convert the Buffer to a base64 encoded string
    const base64String = buffer.toString('base64');

   

    //Tring to access id from the URL link
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
  

    if (!id) {
      return res.status(400).json({ error: "ID parameter is missing" });
    }

    // Find the document by ID and update the signature field
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { signature: base64String } },
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
   return res
      .status(500)
      .json({ error: "An error occurred while updating the signature." });
  }
}
