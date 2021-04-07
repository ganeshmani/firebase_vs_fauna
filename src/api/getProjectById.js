import { Ref } from "faunadb";
import { client, q } from "../config/db";

const getProjectById = async (id) => {
  try {
    const projectData = await client.query(
      q.Let(
        {
          projectDoc: q.Get(q.Ref(q.Collection("projects"), id)),
        },
        {
          project: q.Var("projectDoc"),
          tasks: q.Map(
            q.Select(["data", "tasks"], q.Var("projectDoc"), []),
            q.Lambda("tasks", q.Get(q.Var("tasks")))
          ),
        }
      )
    );
    return {
      project: {
        ...projectData.project.data,
        id: projectData.project.ref.value.id,
      },
      tasks: projectData.tasks,
    };
  } catch (e) {
    console.log("Error", e);
  }
};

export default getProjectById;
