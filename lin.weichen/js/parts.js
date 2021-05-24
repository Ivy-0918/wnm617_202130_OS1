
const makeAnimalList = templater(o=>`
<div class="animallist-whole display-flex" style="align-items:center;">
   <div class="animallist-item display-flex animal-jump" style="width:90%;" data-id="${o.id}">
      <div class="flex-none animallist-image"><img src="${o.img}" alt=""></div>
      <div class="animallist-description flex-stretch">
         <div class="animallist-name">${o.name}</div>
         <div class="animallist-info">${o.breed}, ${o.color}, ${o.length}</div>
      </div> 

   </div>
   <div class="animal-delete" style="padding:0 1em 0 0;" data-id="${o.id}"><img src="images/icons/trash.png" alt=""></div>
</div>



`);


const makeUserProfile = o => `
<div class="user-profile-image">
   <img src="${o.img}" alt="">
</div>
<div class="user-profile-description">
   <div class="user-profile-name">${o.name}</div>
   <div class="user-profile-email">${o.email}</div>
</div>
`;

const makeUserEditPhoto = o => `
<div class="user-profile-image">
   <img src="${o.img}" alt="">

   <div class="floater right">
      <a href="#user-upload-page" class="user-upload-photo"><img src="images/icons/upload.png" alt=""></a>
   </div>
</div>
`
;

const makeAnimalInfo = o => `
<div class="animal-info-div">
   <div class="animal-info-title">Name</div>
   <div class="animal-content">${o.name}</div>
</div>
<div class="animal-info-div">
   <div class="animal-info-title">Breed</div>
   <div class="animal-content">${o.breed}</div>
</div>
<div class="animal-info-div">
   <div class="animal-info-title">Color</div>
   <div class="animal-content">${o.color}</div>
</div>
<div class="animal-info-div">
   <div class="animal-info-title">Length</div>
   <div class="animal-content">${o.length}</div>
</div>
<div class="animal-info-div">
   <div class="animal-info-title">Description</div>
   <div class="animal-content"><p>${o.description}</p></div>
</div>

<button class=" animal-delete floater top right" style="padding:1em;" data-id="${o.id}"><img src="images/icons/trash.png" alt=""></button>
`;


const makeAnimalPopup = o => `
<div class="display-flex animal-jump" data-id="${o.animal_id?o.animal_id:o.id}">
   <div class="flex-none animal-image-thumb">
      <img src="${o.img}">
   </div>
   <div class="flex-none" style="padding:1em">
      <div class="animal-name">${o.name}</div>

      <div class="animal-breed">${o.breed}</div>

      <div class="animal-color">${o.color}</div>
      <div class="animal-length">${o.length}</div>
   </div>
</div>
`;




// destructuring
const FormControlInput = ({namespace,name,displayname,type,placeholder,value}) => {
   return `<div class="form-control">
      <label for="${namespace}-${name}" class="form-label">${displayname}</label>
      <input class="form-input" type="${type}" id="${namespace}-${name}" data-role="none" placeholder="${placeholder}" value="${value}">
   </div>`;
}
const FormControlTextarea = ({namespace,name,displayname,type,placeholder,value}) => {
   return `<div class="form-control">
      <label for="${namespace}-${name}" class="form-label">${displayname}</label>
      <textarea class="form-input" id="${namespace}-${name}" data-role="none" placeholder="${placeholder}">${value}</textarea>
   </div>`;
}


const FormSelectOptions = (options,selected=1) => {
   return options.reduce((r,o)=>{
      return r+`<option value="${o.id}" ${o.id===selected?'selected':''}>${o.name}</option>`
   },'');
}

const FormSelect = (options,id,selected=1) => {
   return `<div class='form-select'>
      <select id="${id}">
         ${FormSelectOptions(options,selected)}
      </select>
   </div>`;
}




// Animal Form
const makeAnimalProfileUpdateForm = (o,namespace="animal-edit") => `
${FormControlInput({
   namespace:namespace,
   name:'name',
   displayname:'Name',
   type:'text',
   placeholder:'Type The Animal Name',
   value:o.name
})}
${FormControlInput({
   namespace:namespace,
   name:'breed',
   displayname:'Breed',
   type:'text',
   placeholder:'Type The Animal Breed',
   value:o.breed
})}
${FormControlInput({
   namespace:namespace,
   name:'color',
   displayname:'Color',
   type:'text',
   placeholder:'Type The Animal Color',
   value:o.color
})}
${FormControlInput({
   namespace:namespace,
   name:'length',
   displayname:'Length',
   type:'text',
   placeholder:'Type The Animal Length',
   value:o.length
})}
${FormControlTextarea({
   namespace:namespace,
   name:'description',
   displayname:'Description',
   type:'text',
   placeholder:'Type The Animal Description',
   value:o.description
})}
`


// Profile Form
const makeUserProfileUpdateForm = (o,namespace="user-edit") => `
${FormControlInput({
   namespace:namespace,
   name:'name',
   displayname:'Name',
   type:'text',
   placeholder:'Type Your Name',
   value:o.name
})}
${FormControlInput({
   namespace:namespace,
   name:'username',
   displayname:'Username',
   type:'text',
   placeholder:'Type Your Username',
   value:o.username
})}
${FormControlInput({
   namespace:namespace,
   name:'email',
   displayname:'Email',
   type:'text',
   placeholder:'Type Your Email',
   value:o.email
})}
`


// Password Form
const makeUserPasswordUpdateForm = o => `
${FormControlInput({
   namespace:"user-edit",
   name:'old-password',
   displayname:'Old Password',
   type:'password',
   placeholder:'Type Your Old Password',
   value:''
})}
${FormControlInput({
   namespace:"user-edit",
   name:'new-password',
   displayname:'New Password',
   type:'password',
   placeholder:'Type Your New Password',
   value:''
})}
${FormControlInput({
   namespace:"user-edit",
   name:'confirm-password',
   displayname:'Confirm Password',
   type:'password',
   placeholder:'Type Your New Password Again',
   value:''
})}
`



// Animal List Set
const makeAnimalListSet = (animals,missing_text="") => {
   animal_template = animals.length?
      makeAnimalList(animals):
      `<div class="animallist-item"><div class="animallist-description">${missing_text}</div></div>`

   $("#list-page .animallist").html(animal_template);
}






const capitalize = s => s[0].toUpperCase()+s.substr(1);


// const filterList = (animals,type) => {
//    let a = [...(new Set(animals.map(o=>o[type])))];
//    return templater(o=>o?`<li class="filter" data-field="${type}" data-value="${o}">${capitalize(o)}</li>`:'')(a);
// }


// Filter_Color
const filterList = (animals,color) => {
   let a = [...(new Set(animals.map(o=>o[color])))];
   return templater(o=>o?`<li class="filter" data-field="${color}" data-value="${o}">${capitalize(o)}</li>`:'')(a);
}

// Filter_Color_Icon
// const filterList = (animals,color) => {
//    let a = [...(new Set(animals.map(o=>o[color])))];
//    return templater(o=>o?`<li class="filter" data-field="${color}" data-value="${o}"><img class="filter-image" src="images/icons/black.png" alt=""></li>`:'')(a);
// }


// optional add icon image
// const filterList = (animals,color) => {
//    let a = [...(new Set(animals.map(o=>o[color])))];
//    return templater(o=>o?`<li class="filter" data-field="${color}"
//     data-value="${o}"><img src="img/icons/${o}.jpg">${capitalize(o)}</li>`:'')(a);
// }




const makeFilterList = (animals) => {
   return `
   <li class="filter" data-field="color" data-value=""><img class="filter-image" src="images/icons/all.png" alt=""></li>
   |
   <li class="filter" data-field="color" data-value="white"><img class="filter-image" src="images/icons/white.png" alt=""></li>
   <li class="filter" data-field="color" data-value="brown"><img class="filter-image" src="images/icons/brown.png" alt=""></li>
   <li class="filter" data-field="color" data-value="black"><img class="filter-image" src="images/icons/black.png" alt=""></li>



   `
}











