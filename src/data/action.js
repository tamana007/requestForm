'use server'

export async function NodeAction (formData){

  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  // Log the object with all form values
  console.log(formDataObject);


  // console.log("formData", formData)
}