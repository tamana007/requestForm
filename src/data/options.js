// options.js
const options = [
  {description:'Social Media Ad',
key:'socialMediaAd'},
{
  description: 'Bussiness Card',
  key: 'bussinessCard'
},
{
  description: 'Flyer',
  key:'flyer'
},
{
  description: 'Brochure',
  key:'brochure'
},
{
  description:'Pullup Banner',
  key:'pullupBanner'
},
{
  description:'Table top Banner',
  key:'tableTopBanner'
},
{
  description:'Special Merchandise/Swag item',
  key:'specialMerchandise'
},
{
  description:'Placard',
  key:'placard'
},
{
  description:'NewsPaper/Magazine Ad Outdoor',
  key:'tableTopnewsPaper'
},
{
  description:'Marketing',
  key:'marketing'
},
{
  description:'Any other (Please Specify)',
  key:'anyOther'
},

];

const questions = [
  {
    description: 'What is your program name?',
    key: 'programName'
  },
  {
    description: 'Your Name:',
    key: 'yourName'
  },
  {
    description: 'Director Email Address:',
    key: 'directorEmail'
  },

  {
    description: 'Please Specify the Size and Quantity (If relevant)',
    key: 'size'
  },
  {
    description:   'Please Write any side-note for Social Media Post,Flyer/Brochure/Swag Item (If relevant)',
    key: 'sideNote'
  }
  ,
 
  {
    description: 'Amount Approved?',
    key: 'approvedAmount'
  },
 
  {
    description: 'Budget approval by the Accounts Department?',
    key: 'budgetApprovalByAccount'
  },
  {
    description: 'Invoince to be made under which Name/program ?',
    key: 'invoiceTobeMade'
  },
];

export { options, questions };
