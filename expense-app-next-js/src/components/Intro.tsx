import React, { useEffect, useRef, useState } from "react";

// library
import { UserPlusIcon, UserCircleIcon } from "@heroicons/react/24/solid";

// assets
import Image from "next/image";
import { useRouter } from "next/router";
import { LoginPayload, clearAccessToken, signIn, signUp } from "@/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/persistStore";
import { clearBudgets } from "@/slices/budgetSlice";
import { clearExpenses } from "@/slices/expenseSlice";
import { hideSpinner } from "@/slices/spinnerSlice";



const Intro = () => {
  const [showSignUp, setShowSignup] = useState(true)
  const router = useRouter()
  const isSubmittingRef = useRef(false);
  const dispatch = useDispatch<AppDispatch>()

  const formRef = useRef<HTMLFormElement>(null);
  const focusRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isSubmittingRef.current) {
        formRef.current?.reset();
        focusRef.current?.focus();
        dispatch(clearAccessToken());
        dispatch(clearBudgets());
        dispatch(clearExpenses());
        dispatch(hideSpinner());
    }
  }, [isSubmittingRef.current]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isSubmittingRef.current) return;
        isSubmittingRef.current = true;
        try {
            let LoginPayload: LoginPayload = {
                userName: event.currentTarget.userName.value,
                password: event.currentTarget.password.value
            }
            if (showSignUp) {
              await dispatch(signIn(LoginPayload))
            } else {
              await dispatch(signUp(LoginPayload))
            }
          router.replace('/');
        } catch (error) {
            console.error('Error login: ', error);
        } finally {
            isSubmittingRef.current = false;
        }
  };

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your journey today.
        </p>
        <form method="post" onSubmit={handleSubmit} ref={formRef}>
          <label htmlFor="userName">User Name</label>
          <input type="text" name="userName" required ref={focusRef}/>

          <label htmlFor="password">Password</label>
          {showSignUp ? <input type="password" name="password" required/> :
            <input type="password" name="password" required
              min={8}
              pattern="((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*"
              title="Password should be more than 8 letters with min of 1 number or special character and 1 uppercase"
            />}

          <button type="submit" className="btn btn--dark">
            {showSignUp ? <><span>Sign In</span><UserCircleIcon width={20} /></> : <><span>Sign Up</span><UserPlusIcon width={20} /></>  }
            
          </button>
        </form>
        { showSignUp 
          ? <small>Don't have an Account? <span className="accent" onClick={() => {setShowSignup(false)}} style={{cursor: 'pointer'}}> Sign Up </span> </small>
          : <small>Already have an Account? <span className="accent" onClick={() => {setShowSignup(true)}} style={{cursor: 'pointer'}}> Sign In </span> </small>
        }
      </div>
      <Image src="/illustration.jpg" alt="Person with money" width={600} height={400} />
    </div>
  );
};

export default Intro;
