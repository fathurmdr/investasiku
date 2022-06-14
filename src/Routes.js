import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AppLayout from './component/layouts/AppLayout';
import LandingPage from './component/layouts/LandingPage';
import Dashboard from './component/views/app-layout/Dashboard';
import Investment from './component/views/app-layout/Investment';
import Profile from './component/views/app-layout/Profile';
import Savings from './component/views/app-layout/Savings';
import SignIn from './component/views/landing-page/SignIn';
import SignUp from './component/views/landing-page/SignUp';
import Page404 from './component/views/Page404';

export default function Routes(){
    return useRoutes([
        {
            path: '/',
            element: <LandingPage/>,
            children: [
                { path: '', element: <SignIn/>  },
                { path: 'auth/signup', element: <SignUp/>  },
            ]
        },
        {
            path: '/app',
            element: <AppLayout/>,
            children: [
                { path: 'dashboard', element: <Dashboard/>  },
                { path: 'investment', element: <Investment/>  },
                { path: 'savings', element: <Savings/>  },
                { path: 'profile', element: <Profile/>  }
            ]
        },
        { path: '/404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> }
    ])
}