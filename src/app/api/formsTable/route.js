import '@/app/forms-table/page'
import {connectToDatabase} from '@/db/db'
import User from '@/db/model/User';

export async function GET (req,res){
await connectToDatabase();

try {
  const users=await User.find({});
  // console.log('users here',users);
return Response.json({users})
  
} catch (error) {
  res.status(500).json({success:false, error:error.message})
  
}
}

