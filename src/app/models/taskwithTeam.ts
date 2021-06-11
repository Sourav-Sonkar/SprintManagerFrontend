export class TaskwithTeam {
    taskid: number
    tasktitle: string
    taskdesc: string
    taskstatus: string
    taskdate: number
    teamid: number

    constructor() {
        this.taskid = 0
        this.tasktitle = ''
        this.taskdesc = ''
        this.taskstatus = ''
        this.taskdate = 0
        this.teamid = 0
    }
}