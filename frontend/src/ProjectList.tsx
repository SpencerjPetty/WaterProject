import { useEffect, useState } from 'react';
import { Project } from './types/Project';

function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalNumProjects, setTotalNumProjects] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Water/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}`
      );
      const data = await response.json();
      setProjects(data.projects);
      setTotalNumProjects(data.totalNumProjects);
      setTotalPages(Math.ceil(data.totalNumProjects / pageSize));
    };
    fetchProjects();
  }, [pageSize, pageNum]);
  return (
    <>
      <h1>Water Projects</h1>
      <br />
      {projects.map((project) => (
        <div id="projectCard" className="card" key={project.projectId}>
          <h2 className="card-title">{project.projectName}</h2>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Type: </strong>
                {project.projectType}
              </li>
              <li>
                <strong>Regional Program: </strong>
                {project.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact: </strong>
                {project.projectImpact}
              </li>
              <li>
                <strong>Phase: </strong> {project.projectPhase}
              </li>
              <li>
                <strong>Functionality Status: </strong>
                {project.projectFunctionalityStatus}
              </li>
            </ul>
          </div>
        </div>
      ))}

      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => setPageNum(index + 1)}
          disabled={pageNum === index + 1}
          className={pageNum === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <label>Results per page:</label>
      <select
        value={pageSize}
        onChange={(e) => {
          setPageSize(parseInt(e.target.value));
          setPageNum(1);
        }}
      >
        <option value="5">5</option>
        <option selected value="10">
          10
        </option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
    </>
  );
}

export default ProjectList;
