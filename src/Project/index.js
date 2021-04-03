import React from "react";
import { useHistory } from "react-router-dom";
const Project = ({ project }) => {
  const history = useHistory();
  return (
    <li
      className="relative pl-4 pr-6 py-5 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
      onClick={() => history.push(`/project/${project.id}`)}
    >
      <div className="flex items-center justify-between space-x-4">
        <div className="min-w-0 space-y-3">
          <div className="flex items-center space-x-3">
            <span
              className="h-4 w-4 bg-green-100 rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              <span className="h-2 w-2 bg-green-400 rounded-full"></span>
            </span>

            <span className="block">
              <h2 className="text-sm font-medium">
                <a href="#">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  {project.name}{" "}
                  {/* <span className="sr-only">Running</span> */}
                </a>
              </h2>
            </span>
          </div>
          <a href="#" className="relative group flex items-center space-x-2.5">
            <span className="text-sm text-gray-500 group-hover:text-gray-900 font-medium truncate">
              {project.description}
            </span>
          </a>
        </div>
        <div className="sm:hidden">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </li>
  );
};

export default Project;
