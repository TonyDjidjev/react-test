import React , { useRef } from "react";


import './Form.css'


let nameChecker = 0

function Form(){
    const ProjectNameInput = useRef(null);
    function addButtonClick(event){
        event.preventDefault();
        if(ProjectNameInput.current.value === ""){
            alert("No Name")
        }else{
            nameChecker = 0
            fetch('https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects.json')
                .then(function(response){
                return response.json();
                }).then(function(data){
                    for(const key in data){
                        if(data[key].projectName === ProjectNameInput.current.value ){
                            nameChecker = 1 
                        }else{};
                    };
                }).then(function(){
                    if(nameChecker === 1){
                        alert("Name already exists");
                    }else{
                        let newData = {
                            projectName: ProjectNameInput.current.value,
                            projectTimer: {
                                hours:"0",
                                minutes:"0",
                                seconds:"0"
                            },
                            projectOwner: "test owner"
                        };
                        fetch('https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects.json',{method: 'POST',body: JSON.stringify(newData)});
                        window.location.reload();
                    }
                });
        }
    };
    
        return (
            <div className="form-container" >
                <form>
                    <div className="form-group">
                        <input type="text" className="form-control" id="inputName" aria-describedby="emailHelp" placeholder="Project name" ref={ProjectNameInput}></input>
                    </div>
                    <button id="add" type="submit" className="btn btn-primary" onClick={addButtonClick} >Add project</button>
                </form>
                
            </div>
        );
    
    
};




export default Form;