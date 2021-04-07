import { client, q } from "../config/db";

const createTask = async (projectId, name, description) => {
  try {
    const taskData = await client.query(
      q.Create(q.Collection("tasks"), {
        data: {
          name,
          description,
          projectId,
        },
      })
    );

    let res = await client.query(
      q.Let(
        {
          projectRef: q.Ref(q.Collection("projects"), projectId),
          projectDoc: q.Get(q.Var("projectRef")),
          array: q.Select(["data", "tasks"], q.Var("projectDoc"), []),
        },
        q.Update(q.Var("projectRef"), {
          data: {
            tasks: q.Append(
              [q.Ref(q.Collection("tasks"), taskData.ref.value.id)],
              q.Var("array")
            ),
          },
        })
      )
    );
    return taskData;
  } catch (err) {
    console.error(err);
  }
};

export default createTask;
