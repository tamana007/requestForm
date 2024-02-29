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
    // console.log('sig',signature)
    
    let arrayBuffer = await signature.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // console.log('buffer',buffer)
    
    
    // Convert the Buffer to a base64 encoded string
    const base64String = buffer.toString('base64');
    // console.log('buffer',base64String)


    // console.log('base64String', base64String); // Output the base64 encoded string

    //Tring to access id from the URL link
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    console.log('idddddddddddddd',id);

    if (!id) {
      return Response.json({ error: "ID parameter is missing" });
    }

    // Find the document by ID and update the signature field
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { accountSignature: base64String } },
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
