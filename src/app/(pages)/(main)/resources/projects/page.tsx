'use client'

import Loading from "@/components/loading/loading";
import UnderConstruction from "@/components/underConstruction/underConstruction";
import { IProjectPopulated } from "@/models/Project";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<
    IProjectPopulated[] | null
  >(null);

  const router = useRouter();

  useEffect(() => {
    const initializeData = async () => {
      const res = await axios.post("/api/projects/query");
      setProjects(res.data);
    };

    initializeData();
  }, []);

  if (!projects) {
    return (
      <PageCenteringWrapper>
        <Loading />
      </PageCenteringWrapper>
    );
  }
  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mx-8 mt-8">
      {projects.map((project) => (
        <div key={project._id} className="flex flex-col bg-white shadow-sm border border-slate-200 rounded-lg my-6 w-96 max-h-[600px]">
          <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
            <img className="w-full h-full object-cover" src={project.businessProposal ? project.businessProposal.image : (project.blog ? project.blog.coverImage : "/public/ennovate/ennovate-w.webp")} alt="profile-picture" />
          </div>
          <div className="p-6 text-center">
            <h4 className="mb-1 text-xl font-semibold text-slate-800">
              {project.name}
            </h4>
            <p className="text-base text-slate-600 mt-4 font-light ">
              {project.description}
            </p>
          </div>
          <div className="flex justify-center p-6 pt-2 gap-7">
            <button onClick={() => {
              if (project.businessProposal) {
                router.push(`/resources/business-proposals/${project.businessProposal._id}`);
              }
            }} disabled={project.businessProposal === null} className="min-w-32 rounded-md bg-ennovate-main py-2 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:bg-ennovate-dark-blue disabled:opacity-50 disabled:cursor-not-allowed" type="button">
              Business Proposal
            </button>
            <button onClick={() => {
              if (project.blog) {
                router.push(project.blog.mediumUrl);
              }
            }} disabled={project.businessProposal === null} className="min-w-32 rounded-md bg-ennovate-main py-2 px-4 border border-transparent text-center text-md text-white transition-all shadow-md hover:bg-ennovate-dark-blue disabled:opacity-50 disabled:cursor-not-allowed" type="button">
              Medium Post
            </button>
          </div>
        </div>))}
    </div>
  );
}
