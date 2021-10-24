import React , { useRef } from "react";

import './ProjectInformation.css'


let nameChecker = 0


function ProjectInformation(props){

  const editButton = useRef(null);
  const deleteButton = useRef(null);
  const cancelButton = useRef(null);
  const submitButton = useRef(null);
  
  function editButtonClick(){
    editButton.current.parentElement.children[1].setAttribute('style', 'visibility: visible; opacity: 100%;;')
  };

  function cancelButtonClick(e){
    e.preventDefault();
    cancelButton.current.parentElement.setAttribute('style', 'visibility: hidden; opacity: 0%;')
  };

  function submitButtonClick(e){
    e.preventDefault();
    if(submitButton.current.parentElement.children[0].children[0].value === ""){
      alert("No Name")
    }else{
      nameChecker = 0
      fetch('https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects.json')
      .then(function(response){
      return response.json();
      }).then(function(data){
          for(const key in data){
              if(data[key].projectName === submitButton.current.parentElement.children[0].children[0].value ){
                  nameChecker = 1 
              }else{};
          };
      }).then(function(){
        if(nameChecker === 1){
          alert("Name already exists");
        }else{
          let newData = {
            projectName: submitButton.current.parentElement.children[0].children[0].value
          }
          fetch(`https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects/${props.id}/projectName.json`,{method: 'PUT',body: JSON.stringify(newData.projectName)})
          .then(function(){
            window.location.reload();
          });
        }
      })
    }
  };

  function deleteButtonClick(){
    if(window.confirm('DELETE ?')){
      fetch(`https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects/${props.id}.json`,{method: 'DELETE'});
      deleteButton.current.parentElement.parentElement.remove();
    }else{};
  };



    return (
        <div>
          <h1>{props.projectName}</h1>
          <form className="edit-projectName-form">
            <div className="form-group">
                <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" placeholder="New project name"></input>
            </div>
            <button id="add" type="submit" className="btn btn-primary" ref={submitButton} onClick={submitButtonClick}>Submit</button>
            <button id="add" type="submit" className="btn btn-primary" ref={cancelButton} onClick={cancelButtonClick}>Cancel</button>
          </form>
          <button className="edit" ref={editButton} onClick={editButtonClick}>Edit</button>
          <button className="delete" ref={deleteButton} onClick={deleteButtonClick}>Delete</button>
        </div>
      );
};







export default ProjectInformation;