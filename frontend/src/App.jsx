import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Library from "./views/Library";
import SongDetail from "./views/SongDetail";
import AddSong from "./views/AddSong";
import EditSong from "./views/EditSong";
import EditPlaylist from "./views/EditPlaylist";
import PlaylistEditor from "./views/PlaylistEditor";


import { PlaylistsProvider } from "./context/PlaylistsContext";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Playlists from "./views/Playlists"; 

import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

function App() {
  return (
    <PlaylistsProvider>
      <Header/>
      <main style={{ padding: 20}}> 
        <Routes>

        <Route path = "/" element={<Navigate to="/library" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route path="/library" element={<AddSong />} />
        <Route path="/song/:id" element={<PrivateRoute><SongDetail/> </PrivateRoute>} />
        <Route path="/add-song" element={<PrivateRoute><AddSong/> </PrivateRoute>} />
        <Route path="/song/:id/edit" element={<PrivateRoute><EditSong/> </PrivateRoute>} />

        <Route path="/playlists" element={<PrivateRoute><Playlists/> </PrivateRoute>} />
        <Route path="/playlists/:id/edit" element={<PrivateRoute><EditPlaylist/> </PrivateRoute>} />

            </Routes>
          </main>
      </PlaylistsProvider>
  );
}

export default App;
