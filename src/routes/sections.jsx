import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import LoginLogs from 'src/sections/Reports/loginLogs';
import { ProductsView } from 'src/sections/products/view';
import DailyReports from 'src/sections/Reports/dailyReports';



// import StatusSelection from 'src/sections/products/statusSelection';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
   
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {path: 'dashboard', element: <IndexPage />},
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsView /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'dailyReports', element: <DailyReports/>},
        { path: 'loginLogs', element: <LoginLogs/>},
      ],
    },
    {
      path:'/',
      element:<LoginPage/>

    },
   
   
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
