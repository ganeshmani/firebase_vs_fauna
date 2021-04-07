import { client, q } from "../config/db";

const getAllProjects = client
  .query(q.Paginate(q.Match(q.Ref("indexes/all_projects"))))
  .then((response) => {
    console.log("response", response);
    const notesRefs = response.data;
    // create new query out of notes refs.
    // https://docs.fauna.com/fauna/current/api/fql/
    const getAllProjectsDataQuery = notesRefs.map((ref) => {
      return q.Get(ref);
    });
    // query the refs
    return client.query(getAllProjectsDataQuery).then((data) => data);
  })
  .catch((error) => console.warn("error", error.message));

export default getAllProjects;
