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
    console.log('users',users);
    // res.status(200).json({ success: true, data: users });
    return Response.json({users})
  } catch (error) {
    // console.log('Check Users',users);

    res.status(500).json({ success: false, error: error.message });
  }
}
