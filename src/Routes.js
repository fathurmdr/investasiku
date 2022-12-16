import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AppLayout from './component/layouts/AppLayout';
import LandingPage from './component/layouts/LandingPage';
import Dashboard from './views/app/Dashboard';
import Investment from './views/app/Investment';
import Profile from './views/app/Profile';
import Savings from './views/app/Savings';
import AddInvestment from './views/investment/AddInvestment';
import BuyInvestment from './views/investment/BuyInvestment';
import InvestmentDetail from './views/investment/InvestmentDetail';
import SellInvestment from './views/investment/SellInvestment';
import SignIn from './views/landing-page/SignIn';
import SignUp from './views/landing-page/SignUp';
import Page404 from './views/Page404';

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
                { path: 'profile', element: <Profile/>  },
            ]
        },
        { path: '/app/investment/detail/:invest_id', element: <InvestmentDetail/>  },
        { path: '/app/investment/detail/:invest_id/beli', element: <BuyInvestment/>  },
        { path: '/app/investment/detail/:invest_id/jual', element: <SellInvestment/>  },
        { path: '/app/investment/add', element: <AddInvestment/>  },
        { path: '/404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> }
    ])
}