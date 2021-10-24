
import { useState } from 'react';
import Project from './Project'

let loadedData = [];
function ProjectBox(){
  const[isLoading, setIsLoading] = useState(true);  
  
  
 fetch('https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects.json')
    .then(function(response){
      return response.json();
    }).then(function(data){
      for(const key in data){
        let item = {
          key: key,
          id: key,
          projectName: data[key].projectName,
          hours: data[key].projectTimer.hours,
          minutes: data[key].projectTimer.minutes,
          seconds: data[key].projectTimer.seconds
        }
        loadedData.push(item);
      }
      setIsLoading(false);
    });
    
    if(isLoading){
      return (
        <h1>LOADING</h1>
      );
    }else{
      return  (
        <div>
          {loadedData.map(item =>{
            return <Project key={item.id} id={item.id} projectName={item.projectName} hours={item.hours} minutes={item.minutes} seconds={item.seconds}/>
          })}
        </div>
        );
    }
};



export default ProjectBox;