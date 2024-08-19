"use client";

import { useReducer, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Loading from "@/components/loading";
import PageCenteringWrapper from "@/wrappers/pageCenteringWrapper";
import { IBusinessProposal } from "@/models/BusinessProposal";
import { useRouter } from "next/navigation";
import { deleteBase64ImageFromFirebase } from "@/utils/utils";

type BusinessProposalState = {
  businessProposal: IBusinessProposal | null;
  toDelete: boolean;
  isDeleting: boolean;
};

type BusinessProposalAction =
  | { type: "SET_DATA"; payload: IBusinessProposal }
  | { type: "OPEN_DELETE_MODAL" }
  | { type: "CLOSE_DELETE_MODAL" }
  | { type: "SET_IS_DELETING"; payload: boolean }
  | { type: "DELETE_SUCCESS" };

const initialState: BusinessProposalState = {
  businessProposal: null,
  toDelete: false,
  isDeleting: false,
};

function businessProposalReducer(
  state: BusinessProposalState,
  action: BusinessProposalAction,
): BusinessProposalState {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, businessProposal: action.payload };
    case "OPEN_DELETE_MODAL":
      return { ...state, toDelete: true };
    case "CLOSE_DELETE_MODAL":
      return { ...state, toDelete: false };
    case "SET_IS_DELETING":
      return { ...state, isDeleting: action.payload };
    case "DELETE_SUCCESS":
      return { ...state, toDelete: false, businessProposal: null };
    default:
      return state;
  }
}

export default function BusinessProposals({
  params,
}: {
  params: { id: string };
}) {
  const [state, dispatch] = useReducer(businessProposalReducer, initialState);
  const { businessProposal, toDelete, isDeleting } = state;
  const { id } = params;
  const router = useRouter();

  useEffect(() => {
    const setData = async () => {
      const res = await axios.get(`/api/business-proposals/query/${id}`);
      dispatch({ type: "SET_DATA", payload: res.data });
    };
    setData();
  }, [id]);

  const handleDelete = async () => {
    dispatch({ type: "SET_IS_DELETING", payload: true });
    try {
      await Promise.all([
        axios.delete(`/api/business-proposals/delete/${id}`),
        deleteBase64ImageFromFirebase(
          businessProposal!.image,
          businessProposal!.name,
          "business-proposals",
        ),
      ]);
      dispatch({ type: "DELETE_SUCCESS" });
      router.push("/resources/business-proposals");
    } catch (error) {
      console.error("Failed to delete business proposal", error);
    } finally {
      dispatch({ type: "SET_IS_DELETING", payload: false });
    }
  };

  return (
    <PageCenteringWrapper>
      {businessProposal ? (
        <>
          <h1 className="text-4xl text-center font-extrabold tracking-tight text-ennovate-dark-blue sm:text-5xl mt-4">
            {businessProposal.name}
          </h1>
          <p className="mt-2 text-xl text-center font-bold leading-8 text-ennovate-dark-blue opacity-70 mb-2">
            {businessProposal.description}
          </p>
          <div>
            <Link
              href={`/admin/business-proposals?update=${businessProposal._id}`}
            >
              <button className="inline-flex mt-2 mb-4 py-2 px-4 bg-ennovate-main hover:bg-ennovate-dark-blue hover:font-extrabold text-white rounded-xl font-bold">
                UPDATE
              </button>
            </Link>
            <button
              className="ml-4 inline-flex mt-2 mb-4 py-2 px-4 bg-ennovate-main hover:bg-ennovate-dark-blue hover:font-extrabold text-white rounded-xl font-bold"
              onClick={() => dispatch({ type: "OPEN_DELETE_MODAL" })}
            >
              DELETE
            </button>
          </div>
          <embed
            src={businessProposal.drive}
            type="application/pdf"
            className="w-screen max-w-screen-md h-[600px] rounded-lg mx-8"
          />
        </>
      ) : (
        <Loading />
      )}

      {/* Confirm delete modal */}
      {toDelete && (
        <div className="fixed inset-0 flex justify-center items-center w-full h-full z-50 bg-black bg-opacity-50">
          <div className="relative bg-white rounded-xl shadow p-8">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="popup-modal"
              onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-ennovate-dark-blue w-12 h-12"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-xl font-bold text-ennovate-dark-blue">
                Remove {businessProposal!.name}?
              </h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-ennovate-main hover:bg-ennovate-dark-blue font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                onClick={handleDelete}
                disabled={isDeleting}
                style={{ opacity: isDeleting ? 0.7 : 1 }}
              >
                {isDeleting ? "Deleting..." : "Yes, I'm sure"}
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-semibold text-ennovate-dark-blue bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
                onClick={() => dispatch({ type: "CLOSE_DELETE_MODAL" })}
                disabled={isDeleting}
                style={{ opacity: isDeleting ? 0.7 : 1 }}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </PageCenteringWrapper>
  );
}
