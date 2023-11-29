import React from "react";
import Link from "next/link";
import { TrashIcon, ArrowLeftOnRectangleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { clearAccessToken } from "@/slices/authSlice";
import { RootState } from "@/store/persistStore";
import { clearBudgets } from "@/slices/budgetSlice";
import { clearExpenses } from "@/slices/expenseSlice";
import { hideSpinner } from "@/slices/spinnerSlice";

interface NavProps {
  userName?: string;
}

const Nav: React.FC<NavProps> = ({ userName }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const {accessToken} = useSelector((state: RootState) => state.auth.auth)

  const logout = () => {
    dispatch(clearAccessToken());
    dispatch(clearBudgets());
    dispatch(clearExpenses());
    dispatch(hideSpinner());
  }
  

  return (
    <div className="nav">
      <Link href="/">
          <img src='/logomark.svg' alt="" height={30} />
          <span>ManageBudget</span>
      </Link>
      
      { accessToken && (
          <button type="submit" className="btn btn--warning" onClick={logout}>
            <span>Sign Out</span>
            <ArrowLeftOnRectangleIcon width={20} />
            {/* <TrashIcon width={20} /> */}
          </button>
      )}
    </div>
  );
};

export default Nav;
