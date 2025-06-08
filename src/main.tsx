import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import "./index.css";
import SearchPage from "./pages/SearchPage";
import FavoritePage from "./pages/FavoritePage";
import MainLayout from "./layouts/MainLayout";

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/search" />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="favorite" element={<FavoritePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
