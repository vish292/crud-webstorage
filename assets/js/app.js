let cl=console.log;

//  crued
// create
// read
// update
// delete
 // to refresh page is bydefault behaviour of form
const stdinfoform =document.getElementById("stdinfoform");
const fname =document.getElementById("fname")
const lname= document.getElementById("lname")
const contact =document.getElementById("contact")
const email=document.getElementById("email")
const submitbtn =document.getElementById("submitbtn")
const updatebtn =document.getElementById("updatebtn")
const stdinfo =document.getElementById("stdinfo")
let stdarr=[];
if (localStorage.getItem("setstdinfo")){
    stdarr=JSON.parse(localStorage.getItem("setstdinfo"))
}
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
       var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
       return v.toString(16);
    });
 }

// read data //

const onstdinfoform = (eve)=>{
    eve.preventDefault();
    // cl(eve);
    let obj={
        getfname:fname.value,
        getlname:lname.value,
        getemail:email.value,
        getcontact:contact.value,
        id:uuidv4()
    }
    cl(obj)
    stdarr.push(obj);
    localStorage.setItem("setstdinfo",JSON.stringify(stdarr))

    stdinfoform.reset();
    templating(stdarr)
};



///// edit //

let onedithandler =(ele)=>{
    updatebtn.classList.remove("d-none")
    submitbtn.classList.add("d-none")

    let getid = ele.getAttribute("data-id")
    localStorage.setItem("setid",getid)
    
    let getdata = JSON.parse(localStorage.getItem("setstdinfo"))
    cl(getdata)
    let getobj = getdata.filter(ele =>{
        return ele.id === getid
    })
    cl(getobj)
    fname.value = getobj[0].getfname;
   lname.value = getobj[0].getlname;
    email.value = getobj[0].getemail;
    contact.value = getobj[0].getcontact;

}


// // update //

let onupdatehandler =(eve)=>{
    // eve.preventDefault();
    let getid =localStorage.getItem("setid")
    cl(getid);
    let getdata = JSON.parse(localStorage.getItem("setstdinfo"))

    getdata.forEach(ele =>{
        if (ele.id ===getid){
            ele.getfname = fname.value;
            ele.getlname =lname.value;
            ele.getemail=email.value;
            ele.getcontact = contact.value;
        }
    })
    localStorage.setItem("setstdinfo",JSON.stringify(getdata))
    templating(getdata)
    updatebtn.classList.add("d-none")
    submitbtn.classList.remove("d-none")
    stdinfoform.reset()
}
  /// delete //
  
  const ondeletehandler =(ele)=>{
      let getid =ele.getAttribute("data-id")
      cl(getid)
      let getdata=JSON.parse(localStorage.getItem("setstdinfo"));
      let newdata = getdata.filter(ele =>{
          return ele.id != getid
      })
      cl(newdata)
      localStorage.setItem("setstdinfo",JSON.stringify(newdata))
      templating(newdata)
  };

 

    stdinfoform.addEventListener("submit",  onstdinfoform)
    updatebtn.addEventListener("click",onupdatehandler)

    // templating //
    function templating(arr){
        let result = "";
        arr.forEach((ele,i)=>{
            result +=`
                <tr>
                <td>${i + 1}</td>
                <td>${ele.getfname}</td>
                <td>${ele.getlname}</td>
                <td>${ele.getemail}</td>
                <td>${ele.getcontact}</td>
                <td><button class="btn btn-primary" data-id="${ele.id}" onclick="ondeletehandler(this)">delete</button></td>
                <td><button class="btn btn-danger" data-id="${ele.id}" onclick="onedithandler(this)">edit</button></td>
                </tr>`
    
        })
        stdinfo.innerHTML=result;
    }
    templating(stdarr)
   
    