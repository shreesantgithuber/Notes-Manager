

showNotes();
let oldtitle;
function resetInput()
{
    document.getElementById('title').value="";
    document.getElementById('description').value="";
}

function AddNote() {

    if(document.getElementById('btn').innerText==="Update Note")
    {
        let title = document.getElementById('title').value;
        let description = document.getElementById('description').value;

        let notesArr;
        let notes=localStorage.getItem('notes');
        notesArr=JSON.parse(notes);

        editedNotes=notesArr.map((element, index)=>{
            if(element.title === oldtitle)
            {
                element.title=title;
                element.description=description;
            }
            return element;
        })



        localStorage.setItem('notes', JSON.stringify(editedNotes));

        oldtitle="";
        showNotes();

        resetInput();
        
    }else{

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    let notes = localStorage.getItem('notes');

    let notesObj;

    let notesArr;

    if (!notes) {
        notesArr = [];
    } else {
        notesArr = JSON.parse(notes);
    }

    notesObj = {
        title,
        description
    }


    if (notesArr.length <= 0) {
        notesArr.push(notesObj);
    } else if (
        notesArr.some((field) => {
            return (field.title === notesObj.title || field.description === notesObj.description)
        })
    ) {
        alert("title or description already available");
        return;
    } else {
        notesArr.push(notesObj); 
    }

    if (title == "" || description == "") {
        alert("Title and Description coundn't be empty");
        return;
    }


    localStorage.setItem('notes', JSON.stringify(notesArr));
   resetInput();

   showNotes();
}

}


function showNotes()
{
    document.getElementsByClassName('showNotes')[0].innerHTML="";
    let notes=localStorage.getItem("notes");
    let  notesArr;
    if(!notes)
    {
        notesArr=[];
    }else{
        notesArr=JSON.parse(notes);
    }
    let show=document.getElementsByClassName('showNotes')[0];
    notesArr.map((field, index)=>{
        show.innerHTML+=`
            <div key=${index} class=${index}>
                <h1>${field.title}</h1>
                <p>${field.description}</p>
                <button id=${index} onclick="editNote(this.id)">edit</button>
                <button id=${index} onclick="deleteNote(this.id)">delete</button>
            </div>
        `
    })
}

function deleteNote(id)
{


    let ele=document.getElementsByClassName(id)[0];
    let eleText=ele.innerText.split("\n")[0]
    ele.remove();

    let notes=localStorage.getItem("notes");

    let notesArr=JSON.parse(notes);

    let  fillterNotesArr=notesArr.filter((element, index)=>{
        return element.title !== eleText
    })



    localStorage.setItem("notes", JSON.stringify(fillterNotesArr));

}


function editNote(id)
{


    let ele=document.getElementsByClassName(id)[0];

    let title=ele.innerText.split("\n")[0];
    let description=ele.innerText.split("\n")[2];


    document.getElementById('title').value=title;
    document.getElementById('description').value=description;

    document.getElementById('btn').innerText="Update Note";
    oldtitle=title;
}





function handleChange()
{
    document.getElementsByClassName('showNotes')[0].innerHTML="";
    let val=document.getElementById('search').value;

    let notes=localStorage.getItem('notes');

    let notesArr=JSON.parse(notes);

    let searchNotes=notesArr.filter((element, index)=>{
        let ele=JSON.stringify(element);
        return ele.includes(val);
    })

    let show=document.getElementsByClassName('showNotes')[0];

    searchNotes.map((field, index)=>{
            show.innerHTML+=`
                <div key=${index} class=${index}>
                    <h1>${field.title}</h1>
                    <p>${field.description}</p>
                    <button id=${index} onclick="editNote(this.id)">edit</button>
                    <button id=${index} onclick="deleteNote(this.id)">delete</button>
                </div>
            `
        })
}

