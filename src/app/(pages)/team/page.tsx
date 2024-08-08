"use client";

import Search from "@/components/search";
import TeamMember from "@/components/teamMember";
import TeamMemberSkeleton from "@/components/teamMemberSkeleton";
import TeamMemberSkeletonGrid from "@/components/teamMemberSkeletonGrid";
import Pagination from "@/components/pagination";
import { fetchTeamMembers } from "@/actions/db";
import { ITeamMember } from "@/models/TeamMember";
import { useEffect, useReducer } from "react";
import TeamMemberGrid from "@/components/teamMemberGrid";
import NoTeam from "@/components/noTeam";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";

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
        const { teamMembers, totalPages } = await fetchTeamMembers(
          query,
          currentPage
        );
        console.log(teamMembers, totalPages);
        dispatch({
          type: "FETCH_SUCCESS",
          payload: { teamMembers, totalPages },
        });
      } catch (error) {
        console.error(error);
        dispatch({ type: "FETCH_FAILURE" });
      }
    };

    fetchData();
  }, [query, currentPage]);

  return (
    <PageCenteringWrapper>
      <h1 className="text-center font-bold text-4xl mt-8 text-ennovate-dark-blue">
        Get to know us!
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
