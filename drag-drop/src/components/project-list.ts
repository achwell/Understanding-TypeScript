import { DragTarget } from "../models/drag-drop"
import { Autobind } from "../decorators/autobind"
import Component from "./base-component"
import { ProjectItem } from "./project-item"
import { Project, ProjectStatus } from "../models/project"
import { projectState } from "../state/project-state"

// ProjectList Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {

    assignedProjects: Project[]

    constructor(private type: ProjectStatus) {
        super("project-list", "app", false, `${ProjectStatus[type]}-projects`)
        this.assignedProjects = []
        this.configure()
        this.renderContent()
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault()
            const listEl = this.element.querySelector('ul')!
            listEl.classList.add('droppable')
        }
    }

    @Autobind
    dropHandler(event: DragEvent): void {
        const prjId = event.dataTransfer!.getData('text/plain')
        projectState.moveProject(prjId, this.type)
        const listEl = this.element.querySelector("ul")!
        listEl.classList.remove("droppable")
    }

    @Autobind
    dragLeaveHandler(_: DragEvent): void {
        const listEl = this.element.querySelector("ul")!
        listEl.classList.remove("droppable")
    }

    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler)
        const listener = (projects: Project[]) => {
            this.assignedProjects = projects.filter(prj => prj.status === this.type)
            this.renderProjects()
        }
        projectState.addListener(listener)
    }

    renderContent() {
        const listId = `${ProjectStatus[this.type]}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = ProjectStatus[this.type] + ' projects'
    }

    private renderProjects() {
        const listEl = document.getElementById(`${ProjectStatus[this.type]}-projects-list`)! as HTMLUListElement
        listEl.innerHTML = ""
        this.assignedProjects.forEach(prjItem => new ProjectItem(listEl.id, prjItem))
    }
}