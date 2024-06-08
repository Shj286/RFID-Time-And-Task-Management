const ProjectsDatabase = require('../database/ProjectsDatabase')

module.exports = class ProjectsTracker{
    static createProject(project){
        const timestamp = Date.now()
        ProjectsDatabase[project.name] = {
            createdAt:timestamp,
            ...project
            
        }
    }
    static listProjects(){
        return  Object.values(ProjectsDatabase)
    }
}