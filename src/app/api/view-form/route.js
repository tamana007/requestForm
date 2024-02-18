// import '@/app/view-form/[formId]/page'
// import '@/app/view-form/page'
import {connectToDatabase} from '@/db/db'
import User from '@/db/model/User';


export async function GET (request){
  await connectToDatabase();
  const url = new URL(request.url)
  const id = url.searchParams.get("id")

  try {
    const user =await User.findOne({_id:id});
    // console.log('users here',user);
  return Response.json({user})
    
  } catch (error) {
    res.status(500).json({success:false, error:error.message})
    
  }
}




