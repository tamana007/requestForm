import { connectToDatabase } from "@/db/db";
// import {User} from '@/'
import User from "@/db/model/User";


// export async function DELETE(req,res){
//   const url=new URL(req.url);
//   const id=url.searchParams.get("id");
//   return Response.json({message:"hi",id})

// }

// pages/api/delete-form.js

export  async function DELETE(req, res) {
  await connectToDatabase();

  // if (req.method === 'DELETE') {
    try {
      
      const url=new URL(req.url);
  const id = url.searchParams.get("id");
  console.log('id from delete route',id);

   // Show a confirmation dialog to the user
  //  const confirmDelete = confirm('Are you sure you want to delete this form?');

  const deleteForm = await User.findByIdAndDelete(id);
  // const deleteForm = await User.deleteMany();
  if (confirmDelete){}
  
    // Perform deletion operation using the ID
    if(!deleteForm){
      return Response.json({error:"form not found"})
      console.log('form not found',id);
    }
  


      // const id=url.get("id");
      // const id = req.query.id;
      // Perform deletion operation using the ID
      // For example, you might use a database query to delete the form with the specified ID
      // Once the deletion is successful, you can send a response
      return Response.json({ message: 'Form deleted successfully',id});
    } catch (error) {
      console.error('Error deleting form:', error);
      return Response.json({ error: 'Internal server error' });
    }
  // } else {
  //   return Response.json({ error: 'Method Not Allowed' });
  // }
}
