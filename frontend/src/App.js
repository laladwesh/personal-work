import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AllServicePage from "./pages/AllServicePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import OrderRoute from "./components/OrderRoute";
import SignInPage from "./pages/SignInPage";
import AccountPage from "./pages/AccountPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ServicePage from "./pages/ServicePage";
import PricePage from "./pages/PricePage";
import AddressPage from "./pages/AddressPage";
import PaymentPage from "./pages/PaymentPage";
import ConfirmPage from "./pages/ConfirmPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allservices" element={<AllServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/sign-up" element={<LoginPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/service/:id" element={<ServicePage />} />
        <Route
          path="/my-acc"
          element={
            <PrivateRoute>
              <AccountPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/order-his"
          element={
            <PrivateRoute>
              <OrderHistoryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/price"
          element={
            <OrderRoute>
              <PricePage />
            </OrderRoute>
          }
        />
        <Route
          path="/address"
          element={
            <OrderRoute>
              <AddressPage />
            </OrderRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <OrderRoute>
              <PaymentPage />
            </OrderRoute>
          }
        />
        <Route
          path="/confirm"
          element={
            <OrderRoute>
              <ConfirmPage />
            </OrderRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
