import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import Master Pages
import MaterialListPage from "./pages/master/MaterialListPage";
import TemplateListPage from "./pages/master/TemplateListPage";
import SDMAddPage from "./pages/master/SDMAddPage"; // Pastikan file ini sudah dibuat
import VendorListPage from "./pages/master/VendorListPage"; // Pastikan file ini sudah dibuat
import MasterHubPage from "./pages/master/MasterHubPage";
import SDMListPage from "./pages/master/SDMListPage";
import SDMDetailPage from "./pages/master/SDMDetailPage";
import VendorDetailPage from "./pages/master/VendorDetailPage";
import VendorAddPage from "./pages/master/VendorAddPage";
import TemplateAddPage from "./pages/master/TemplateAddPage";
import MaterialDetailPage from "./pages/master/MaterialDetailPage";
import MaterialAddPage from "./pages/master/MaterialAddPage";
import TemplateDetailPage from "./pages/master/TemplateDetailPage";

// Komponen Global (jika ada Dashboard/Home)
// import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      {/* Wrapper Utama dengan Tema Dark Premium */}
      <div className="bg-background-dark min-h-screen text-slate-100 selection:bg-primary/30">
        <Routes>
          {/* 1. Alur Masuk Utama (Redirect ke Material sebagai default) */}
          <Route path="/" element={<Navigate to="/master/material" />} />

          {/* 2. Grouping Route Master Data */}
          <Route path="/master">
            {/* Halaman List */}
            <Route path="sdm" element={<SDMListPage />} />
            <Route path="sdm/add" element={<SDMAddPage />} />
            <Route path="sdm/detail/:id" element={<SDMDetailPage />} />
            <Route path="vendor" element={<VendorListPage />} />
            <Route path="vendor/add" element={<VendorAddPage />} />
            <Route path="vendor/detail/:id" element={<VendorDetailPage />} />
            <Route path="material" element={<MaterialListPage />} />
            <Route path="material/add" element={<MaterialAddPage />} />
            <Route
              path="material/detail/:id"
              element={<MaterialDetailPage />}
            />
            <Route path="template" element={<TemplateListPage />} />
            <Route path="template/add" element={<TemplateAddPage />} />
            <Route
              path="template/detail/:id"
              element={<TemplateDetailPage />}
            />
            <Route path="" element={<MasterHubPage />} />

            {/* Halaman Detail & Add (Placeholder untuk pengembangan berikutnya) */}
            {/* <Route path="material/add" element={<MaterialAddPage />} />
                <Route path="material/detail/:id" element={<MaterialDetailPage />} /> 
              */}
          </Route>

          {/* 3. Route Proyek (Jika sudah ada) */}
          {/* <Route path="/proyek" element={<ProyekPage />} /> */}

          {/* 4. Fallback 404 - Halaman Tidak Ditemukan */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-screen px-6 text-center">
                <span className="material-symbols-outlined text-primary text-[64px] mb-4">
                  error_outline
                </span>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Halaman Tidak Ditemukan
                </h1>
                <p className="text-slate-400 mb-6 text-sm">
                  Sepertinya link yang Anda tuju belum tersedia atau sedang
                  dalam pengembangan.
                </p>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="bg-primary text-white px-6 py-3 rounded-xl font-bold active:scale-95 transition-transform"
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
