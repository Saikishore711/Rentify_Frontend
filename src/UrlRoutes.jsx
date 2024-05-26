import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Hello from './screens/Hello';

export default function Url_Routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
    </BrowserRouter>
  )
}
