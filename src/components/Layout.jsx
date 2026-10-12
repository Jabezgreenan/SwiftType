import { Outlet } from "react-router-dom"
import Header from "./Header"
import Footer from "./Footer"


export default function Layout() {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-grow bg-[#020C12]"> 
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
