import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import firebase from "../firebase";
import toast from "react-hot-toast";

import Task from "../Task";
import Modal from "../Modal";
const ProjectDetail = ({}) => {
  let { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [task, setTask] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      const db = firebase.firestore();
      const docs = await db.collection("projects").doc(id).get();
      const taskDocs = await db
        .collection("tasks")
        .where("projectId", "==", id)
        .get();

      setProject(docs.data());
      setTasks(taskDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    };
    if (id) {
      fetchProjectDetails();
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setProject({ ...project, description: e.target.value });
  };

  const handleModalState = () => {
    setModalState(!modalState);
  };

  const handleTaskCreate = () => {
    const db = firebase.firestore();
    db.collection("tasks")
      .add({ name: task.name, description: task.description, projectId: id })
      .then(async (res) => {
        const updatedTaskDocs = await res.get();
        const updatedTask = updatedTaskDocs.data();

        setTasks([...tasks, updatedTaskDocs.data()]);
        setModalState(!modalState);
        toast.success("Task created Successfully");
      })
      .catch((err) => {
        toast.error("Oops!! Something went wrong");
        console.log("err", err);
      });
  };

  const updateProjectDetails = async () => {
    const db = firebase.firestore();
    db.collection("projects")
      .doc(id)
      .set(
        {
          description: project.description,
        },
        { merge: true }
      )
      .then((res) => {
        toast.success("Project Updated Successfully");
      })
      .catch((err) => {
        toast.error("Oops!! Something went wrong");
        console.log("Error while updating project", err);
      });
  };

  return (
    <Fragment>
      <div className="flex flex-col mt-8 sm:mx-auto sm:w-full sm:max-w-xl ">
        {loading ? (
          <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
            <h2 className="text-center text-white text-xl font-semibold">
              Loading...
            </h2>
          </div>
        ) : null}
        <div className="p-2 flex justify-between">
          <h1>Project : {project && project.name}</h1>

          <button
            onClick={handleModalState}
            className=" bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Task
          </button>
        </div>
        <div class="sm:col-span-2">
          <div class="flex justify-between">
            <label
              for="message"
              class="block text-sm font-medium text-warm-gray-900"
            >
              Description
            </label>
          </div>
          <div class="mt-1">
            <textarea
              id="message"
              name="message"
              value={project && project.description}
              onChange={handleDescriptionChange}
              rows="4"
              className="border border-warm-gray-300 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
              aria-describedby="message-max"
            ></textarea>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              onClick={updateProjectDetails}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update
            </button>
          </div>
        </div>
        <div className="flex flex-col mt-8 sm:mx-auto sm:w-full sm:max-w-xl ">
          <div className="p-2 flex justify-between">
            <h1>Tasks</h1>
          </div>
          <div>
            <ul className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
              {tasks.map((task) => {
                return <Task task={task} />;
              })}
            </ul>
          </div>
        </div>
      </div>
      {modalState ? (
        <Modal onClose={handleModalState}>
          <div className="space-y-6">
            <div>
              <label
                for="email"
                className="block text-sm font-medium text-gray-700"
              >
                Task Name
              </label>
              <div className="mt-1">
                <input
                  id="Name"
                  name="name"
                  type="text"
                  value={task.name}
                  onChange={handleChange}
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div class="sm:col-span-2">
              <div class="flex justify-between">
                <label
                  for="message"
                  class="block text-sm font-medium text-warm-gray-900"
                >
                  Description
                </label>
              </div>
              <div class="mt-1">
                <textarea
                  id="message"
                  name="description"
                  onChange={handleChange}
                  rows="4"
                  className="border border-warm-gray-300 py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-teal-500 focus:border-teal-500 border-warm-gray-300 rounded-md"
                  aria-describedby="message-max"
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleTaskCreate}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </div>
        </Modal>
      ) : null}
    </Fragment>
  );
};

export default ProjectDetail;
