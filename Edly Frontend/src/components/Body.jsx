import { Outlet } from "react-router-dom";
import Header from "./student/Header";

const Body = () => {
  return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
          <Outlet />
      </div>
  )
}

export default Body;