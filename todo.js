function pushLocalStateObject(){ 
  var globalarr=[];
  Array.from(document.querySelectorAll('#myUL > li')).map((ele)=>{
    if(!ele.style.display!='none'){
      if(ele.classList.contains('checked')){
        globalarr.push({val:ele.childNodes[0].data,checked:true});
      }else{
        globalarr.push({val:ele.childNodes[0].data,checked:false});
      }
    }
  })
  setData(JSON.stringify({data:globalarr}));
}
function getLocalStateObject(arr){
  if(arr=="undefined"||arr=="") return "";
  var htmlstring="";
  JSON.parse(arr)["data"].map(data=>{
    htmlstring+=data.checked?`<li class="checked">${data.val}<span class="edit"><i class="far fa-edit" aria-hidden="true"></i></span><span class="close">\u00D7</span></li>`:
    `<li>${data.val}<span class="edit"><i class="far fa-edit" aria-hidden="true"></i></span><span class="close">\u00D7</span></li>`;
  })
  return htmlstring;
}

function setData(a){
  window.localStorage.setItem("todos", a);
}

function getData(){
  if(window.localStorage.getItem("todos") == undefined){
    return "";
  }
  return window.localStorage.getItem("todos");
}

//add a check symbol when clicking on list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    pushLocalStateObject();
  }
}, false);

var close = document.getElementsByClassName("close");
var i;
var delItem=null;
var editItem = null;
var edit = document.getElementsByClassName("edit");
document.getElementById("myUL").innerHTML=getLocalStateObject(getData());

handleEditandDelete();

function handleEditandDelete(){
for (i = 0; i < close.length; i++) {
  close[i].addEventListener('click', showDeleteModal); 
  }

for (i = 0; i < edit.length; i++) {
edit[i].addEventListener('click', showEditModal);
}
}

function showEditModal(e)
{
  document.getElementsByClassName('edit-Popup')[0].style.display="block";
  document.getElementById('editinput-alert').style.display="none";
  if(e.target.tagName=="I"){
    document.getElementById("editinput").value = e.target.parentNode.parentNode.childNodes[0].data;
  }else{
    document.getElementById("editinput").value = e.target.parentNode.childNodes[0].data;
  }
  console.log(e.target.parentNode.childNodes[0]);
  editItem = e;
}

function edittaskfunc() {
  document.getElementById('editinput-alert').style.display="block";
  if (document.getElementById("editinput").value === '') {
    document.getElementById('editinput-alert').innerHTML="You must write something!";
  } else{
  if(editItem.target.tagName=="I"){
  editItem.target.parentNode.parentNode.childNodes[0].data=document.getElementById("editinput").value;
  }else{
  editItem.target.parentNode.childNodes[0].data=document.getElementById("editinput").value;      
  }    
  closeEditPrompt();
  document.getElementsByClassName('popup')[0].style.display="block";
  document.getElementById('successMessage').innerHTML="Task edited successfully!";
  setTimeout(timeout, 2000);
  pushLocalStateObject();
}
}

function closeEditPrompt() {
  document.getElementsByClassName('edit-Popup')[0].style.display="none"; 
}

function showDeleteModal(e) {
  delItem= e.target.parentElement;
  document.getElementsByClassName('modal-confirm')[0].style.display="flex";   
  
  }
function removeElement(){
  delItem.style.display = "none";
  document.getElementsByClassName('popup')[0].style.display="block";
  document.getElementById('successMessage').innerHTML="Task deleted successfully!";
  setTimeout(timeout, 2000);
  pushLocalStateObject();
  closedeletePrompt();
}

function closedeletePrompt() {
  document.getElementsByClassName('modal-confirm')[0].style.display="none";
}

//to remove the success message after 2 seconds
function timeout(){
  document.getElementById('successMessage').innerHTML='';
    document.getElementsByClassName('popup')[0].style.display="none";  
}
// Create a new list item when clicking on the "submit" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  }
  else{
  if(submit.value == "Submit"){
     document.getElementById("myUL").appendChild(li);
  }
  
  document.getElementById("myInput").value = "";
  
  //create edit button
  var button = document.createElement("SPAN");
  button.innerHTML = '<i class="far fa-edit"></i>';
  button.className = "edit";
  li.appendChild(button)

  //create delete button
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  pushLocalStateObject();

  handleEditandDelete();
  }
}
