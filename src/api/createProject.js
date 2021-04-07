import { client, q } from "../config/db";

const createProject = (name) =>
  client
    .query(
      q.Create(q.Collection("projects"), {
        data: {
          name,
        },
      })
    )
    .then((ret) => ret)
    .catch((err) => console.error(err));

export default createProject;
