import BillIndex from "../pages/admin/bill/Index";
import Index from "../pages/admin/home/Index";
import PmsIndex from "../pages/admin/pms/Index";
import PageNotFound from "../pages/PageNotFound";
import ResultsIndex from "../pages/admin/resultsTable/Index";
//路由配置文件
export const mainRoutes = [{
    path:'/404',
    component:  PageNotFound
}];

export const adminRoutes = [{
    path:'/admin',
    component: Index,
    exact: true,
    isShow:true,
    titile:"首页",
},
{
    path:'/admin/pms',
    component: PmsIndex,
    isShow:true,
    titile:"pms报表",
},
{
    path:'/admin/bill',
    component: BillIndex,
    isShow:true,
    titile:"对账单",
},
{
    path:'/admin/results',
    component: ResultsIndex,
    isShow:true,
    titile:"结果表",
}
];