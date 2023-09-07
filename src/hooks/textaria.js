function sortDataBy (filter_sort){
    let sortedData;
 
    
      return sortedData = filter_sort.sort(function(a,b){
        return a.age - b.age;
      })
    
   
}
const fun = (prop) => {
return new Promise(resolve => {
  setTimeout(() =>
    resolve(`done ${prop}`), 100);
})
}
    

// console.log(sortDataBy(filter_sort));

export function go(extra) {
return new Promise(async function (resolve,reject){


// div
let position_first_p = extra.indexOf("<p>");
let position_last_p = extra.indexOf("</p>");
let location_first_p = []
let location_last_p = []
// a
let position_first_a = extra.indexOf("<a>");
let position_last_a = extra.indexOf("</a>");
let location_first_a = []
let location_last_a = []
// img
let position_first_img = extra.indexOf("<img>");
let position_last_img = extra.indexOf("</img>");
let location_first_img = []
let location_last_img = []

// /////
var filter_sort =[]
// //////////////////////
// div
location_first_p.push(position_first_p) //position <div>
location_last_p.push(position_last_p) //position </div>

// a
location_first_a.push(position_first_a) //position <a>
location_last_a.push(position_last_a) //position </a>
// img
location_first_img.push(position_first_img) //position <img>
location_last_img.push(position_last_img) //position </img>


// //////////////////
// div
const filter_p = extra.slice(position_first_p+3,position_last_p)
// a
const filter_a = extra.slice(position_first_a+3,position_last_a)
// img
const filter_img = extra.slice(position_first_img+5,position_last_img)

// //////////////////
// div
if(position_first_p !== -1) {

const file = {
    id: position_first_p, type: 'p',body:filter_p
}
filter_sort.push(file)
}
// a
if(position_first_a !== -1){
    const file_a = {
        id: position_first_a, type: 'a',body:filter_a
        }
    filter_sort.push(file_a)
}
// img
if(position_first_img !== -1) {
const file_img = {
    id: position_first_img, type: 'img',body:filter_img
}
filter_sort.push(file_img)
}
// //////////////////

while (position_first_p !== -1 ) {

await fun(position_first_p = extra.indexOf("<p>", position_first_p +1)) ;
await fun(location_first_p.push(position_first_p)) 


await fun(position_last_p = extra.indexOf("</p>", position_last_p +1))
await fun(location_last_p.push(position_last_p))



 const filter_p =  extra.slice(position_first_p+3,position_last_p)
/////////////  

if(position_first_p === -1 )break
// for div  add to sort
const file = {
    id: position_first_p, type: 'p',body:filter_p
}
await fun(filter_sort.push(file))

}

// while a 

while (position_first_a !== -1 ) {

await fun(position_first_a = extra.indexOf("<a>", position_first_a +1))
await fun(location_first_a.push(position_first_a))


await fun( position_last_a = extra.indexOf("</a>", position_last_a +1))
await fun(location_last_a.push(position_last_a))






const filter_a = extra.slice(position_first_a+3,position_last_a)

/////////////  
if(position_first_a === -1 )break

//  for a  add to sort
const file_a = {
    id: position_first_a, type: 'a',body:filter_a
}
await fun(filter_sort.push(file_a))
}

// while img

while (position_first_img !== -1 ) {

await fun(position_first_img = extra.indexOf("<img>", position_first_img +1))
await fun(location_first_img.push(position_first_img))


await fun(position_last_img = extra.indexOf("</img>", position_last_img +1))
await fun(location_last_img.push(position_last_img))

const filter_img = extra.slice(position_first_img+5,position_last_img)

/////////////  
if(position_first_img === -1 )break

//  for img  add to sort
const file_img = {
    id: position_first_img, type: 'img',body:filter_img
}
await fun(filter_sort.push(file_img))
}




const clgg = await sortDataBy(filter_sort)

resolve(clgg)

})

}