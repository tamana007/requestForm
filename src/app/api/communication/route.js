// pages/api/communication.js
import User from '@/db/model/User';
import {connectToDatabase} from "@/db/db"
// from '../../utils/dbConnect';
// import Communication from '../../models/Communication';

export  async function GET (req, res) {
  await connectToDatabase();

  
  // return Response.json("che mkni dega")

  try {
    const users = await User.find({});
   
  
    return Response.json({users})
  } catch (error) {
  

    res.status(500).json({ success: false, error: error.message });
  }
}
