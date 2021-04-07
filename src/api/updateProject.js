import { client, q } from "../config/db";

const updateProject = async (projectId, description) => {
  try {
    const data = await client.query(
      q.Update(q.Ref(q.Collection("projects"), projectId), {
        data: { description },
      })
    );
    return {
      ...data.data,
      id: data.ref.value.id,
    };
  } catch (e) {
    console.error(e);
  }
};

export default updateProject;
