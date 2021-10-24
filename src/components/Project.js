import './Project.css'
import ProjectInformation from './ProjectComponenets/ProjectInformation'
import Clock from './ProjectComponenets/Clock';






function Project(props){
    return (
        <div className="project-container">
            <ProjectInformation projectName={props.projectName} id={props.id} />
            <Clock id={props.id} hours={props.hours} minutes={props.minutes} seconds={props.seconds} />
        </div>
      );
};











export default Project;