import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import ContactsPage from "./pages/admin/dashboard/sections/ContactsSection";
import ApplicationsPage from "./pages/admin/dashboard/sections/ApplicationsSection";
import ProtectedRoute from "./pages/admin/ProtectedRoute";
import ProductsSection from "./pages/admin/dashboard/sections/ProductsSection";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<ContactsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="applications" element={<ApplicationsPage />} />
            <Route path="products" element={<ProductsSection />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;



// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Footer from './components/Footer';
// import Home from './pages/Home';
// import Products from './pages/Products';
// import About from './pages/About';
// import Careers from './pages/Careers';
// import Contact from './pages/Contact';

// function App() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/products" element={<Products />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/careers" element={<Careers />} />
//           <Route path="/contact" element={<Contact />} />
//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;