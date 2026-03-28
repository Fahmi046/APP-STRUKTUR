import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// 1. Import Toaster dari react-hot-toast
import { Toaster } from "react-hot-toast";

// Import Master Pages
import MaterialListPage from "./pages/master/MaterialListPage";
import TemplateListPage from "./pages/master/TemplateListPage";
import SDMAddPage from "./pages/master/SDMAddPage";
import VendorListPage from "./pages/master/VendorListPage";
import MasterHubPage from "./pages/master/MasterHubPage";
import SDMListPage from "./pages/master/SDMListPage";
import SDMDetailPage from "./pages/master/SDMDetailPage";
import SDMEditPage from "./pages/master/SDMEditPage";
import VendorDetailPage from "./pages/master/VendorDetailPage";
import VendorAddPage from "./pages/master/VendorAddPage";
import VendorEditPage from "./pages/master/VendorEditPage";
import TemplateAddPage from "./pages/master/TemplateAddPage";
import MaterialDetailPage from "./pages/master/MaterialDetailPage";
import MaterialAddPage from "./pages/master/MaterialAddPage";
import MaterialEditPage from "./pages/master/MaterialEditPage";
import TemplateDetailPage from "./pages/master/TemplateDetailPage";
import TemplateEditPage from "./pages/master/TemplateEditPage";

// Import Marketing Pages
import MarketingPage from "./pages/MarketingPage";
import ClientRegistryPage from "./pages/marketing/ClientRegistryPage";
import ClientAddPage from "./pages/marketing/ClientAddPage";
import ClientDetailPage from "./pages/marketing/ClientDetailPage";
import ClientEditPage from "./pages/marketing/ClientEditPage";

const App = () => {
  return (
    <Router>
      {/* 2. Komponen Toaster diletakkan di sini agar bisa tampil di semua halaman */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Desain default untuk tema Dark Premium Bapak
          style: {
            background: "#1e293b", // slate-800
            color: "#f1f5f9", // slate-100
            borderRadius: "16px",
            border: "1px solid #334155", // slate-700
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: "600",
          },
          success: {
            iconTheme: {
              primary: "#0ea5e9", // Warna primary biru bapak
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Wrapper Utama dengan Tema Dark Premium */}
      <div className="min-h-screen bg-background-dark text-slate-100 selection:bg-primary/30">
        <Routes>
          {/* 1. Alur Masuk Utama */}
          <Route path="/" element={<Navigate to="/master/material" />} />

          {/* 2. Grouping Route Master Data */}
          <Route path="/master">
            <Route path="sdm" element={<SDMListPage />} />
            <Route path="sdm/add" element={<SDMAddPage />} />
            <Route path="sdm/detail/:id" element={<SDMDetailPage />} />
            <Route path="sdm/edit/:id" element={<SDMEditPage />} />
            <Route path="vendor" element={<VendorListPage />} />
            <Route path="vendor/add" element={<VendorAddPage />} />
            <Route path="vendor/detail/:id" element={<VendorDetailPage />} />
            <Route path="vendor/edit/:id" element={<VendorEditPage />} />
            <Route path="material" element={<MaterialListPage />} />
            <Route path="material/add" element={<MaterialAddPage />} />
            <Route
              path="material/detail/:id"
              element={<MaterialDetailPage />}
            />
            <Route path="material/edit/:id" element={<MaterialEditPage />} />
            <Route path="template" element={<TemplateListPage />} />
            <Route path="template/add" element={<TemplateAddPage />} />
            <Route
              path="template/detail/:id"
              element={<TemplateDetailPage />}
            />
            <Route path="template/edit/:id" element={<TemplateEditPage />} />
            <Route path="" element={<MasterHubPage />} />
          </Route>

          {/* 3. Marketing Routes */}
          <Route path="/marketing">
            <Route path="" element={<MarketingPage />} />
            <Route path="clients" element={<ClientRegistryPage />} />
            <Route path="clients/new" element={<ClientAddPage />} />
            <Route path="clients/detail/:id" element={<ClientDetailPage />} />
            <Route path="clients/edit/:id" element={<ClientEditPage />} />
          </Route>

          {/* 4. Fallback 404 */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
                <span className="material-symbols-outlined text-primary text-[64px] mb-4">
                  error_outline
                </span>
                <h1 className="mb-2 text-2xl font-bold text-white">
                  Halaman Tidak Ditemukan
                </h1>
                <p className="mb-6 text-sm text-slate-400">
                  Sepertinya link yang Anda tuju belum tersedia.
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-6 py-3 font-bold text-white transition-transform bg-primary rounded-xl active:scale-95"
                >
                  Kembali ke Dashboard
                </button>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
