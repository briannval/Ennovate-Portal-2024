"use client";

import Search from "@/components/search/search";
import { ITeamMember } from "@/models/TeamMember";
import { useEffect, useReducer } from "react";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import axios from "axios";
import TeamMemberSkeletonGrid from "@/components/teamMemberSkeletonGrid/teamMemberSkeletonGrid";
import NoTeam from "@/components/noTeam/noTeam";
import TeamMemberGrid from "@/components/teamMemberGrid/teamMemberGrid";
import Pagination from "@/components/pagination/pagination";

interface TeamMembersState {
  teamMembers: ITeamMember[];
  totalPages: number;
  loading: boolean;
}

type TeamMembersAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: { teamMembers: ITeamMember[]; totalPages: number };
    }
  | { type: "FETCH_FAILURE" };

const initialState: TeamMembersState = {
  teamMembers: [],
  totalPages: 0,
  loading: true,
};

const teamMembersReducer = (
  state: TeamMembersState,
  action: TeamMembersAction
): TeamMembersState => {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        teamMembers: action.payload.teamMembers,
        totalPages: action.payload.totalPages,
        loading: false,
      };
    case "FETCH_FAILURE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default function Team({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page: string;
  };
}) {
  const query: string = searchParams?.query || "";
  const currentPage: number = Number(searchParams?.page) || 1;
  const [state, dispatch] = useReducer(teamMembersReducer, initialState);
  const { teamMembers, totalPages, loading } = state;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_START" });
      try {
        const res = await axios.post("/api/team/paginate", {
          query,
          currentPage,
        });
        const { teamMembers, totalPages } = await res.data;
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { teamMembers, totalPages },
        });
      } catch (error) {
        console.log(error);
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, [query, currentPage]);

  return (
    <PageCenteringWrapper>
      <h1 className="text-center font-extrabold text-5xl mt-8 text-ennovate-dark-blue mx-8">
        Get to know the team!
      </h1>
      <Search />
      {loading ? (
        <TeamMemberSkeletonGrid />
      ) : totalPages == 0 ? (
        <NoTeam />
      ) : (
        <TeamMemberGrid teamMembers={teamMembers} />
      )}
      <Pagination totalPages={totalPages} />
    </PageCenteringWrapper>
  );

  /*
      <TeamMember
        name="Arisha Ahmed"
        email="test email"
        img="/arisha-ahmed.jpg"
        title="test"
      />
  */
}
