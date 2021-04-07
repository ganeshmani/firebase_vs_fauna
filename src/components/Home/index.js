import React, { Fragment, useEffect, useState, useRef } from "react";
import { getAllProjects } from "../../api";
import Modal from "../Modal";
import Project from "../Project";
import toast from "react-hot-toast";
import { createProject } from "../../api";
const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      getAllProjects.then((data) => {
        console.log("data", data);
        setProjects(
          data.map((d) => {
            return { ...d.data, id: d.ref.value.id };
          })
        );
        setLoading(false);
      });
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleModalState = () => {
    setModalState(!modalState);
  };

  const handleProjectCreate = () => {
    createProject(name)
      .then((res) => {
        console.log("res", res);
        setProjects([...projects, { ...res.data, id: res.ref.value.id }]);
        setModalState(!modalState);
        toast.success("Project created Successfully");
      })
      .catch((err) => {
        toast.error("Oops!! Something went wrong");
        console.log("err", err);
      });
  };

  return (
    <Fragment>
      {loading ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">
            Loading...
          </h2>
        </div>
      ) : null}
      <div className="flex flex-col mt-8 sm:mx-auto sm:w-full sm:max-w-xl ">
        <div className="p-2 flex justify-between">
          <h1>Projects</h1>

          <button
            onClick={handleModalState}
            className=" bg-white border border-gray-300 rounded-md shadow-sm px-4 py-2 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create
          </button>
        </div>
        <div>
          <ul className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
            {projects.map((project) => {
              return <Project project={project} />;
            })}
          </ul>
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
                Project Name
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={name}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleProjectCreate}
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

export default Home;
