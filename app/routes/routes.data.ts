import { Routes } from "./routes.type";
import AdminRoute from "../admin/admin.routes"
import StudentRoute from "../student/student.routes"
import ProfessorRoute from "../professor/professor.routes"

export const routes:Routes[]=[
    new Routes("/admin", AdminRoute ),
    new Routes("/student", StudentRoute),
    new Routes("/professor", ProfessorRoute)
]