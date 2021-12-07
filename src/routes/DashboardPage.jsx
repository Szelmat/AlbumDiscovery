import "../App.css";

import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { Link } from "react-router-dom";
import { fetchAlbums, fetchUsers, getUsernameById } from "../data/DataHandler";

export function DashboardPage() {
  const [logout, setLogout] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function fetchAlbumContent() {
      setAlbums(await fetchAlbums());
    }
    fetchAlbumContent();
  }, []);

  useEffect(() => {
    async function fetchContent() {
      setUsers(await fetchUsers());
    }
    fetchContent();
  }, []);

  return (
    <div>
      <nav className="box">
        <h1>Album<strong>Discovery</strong></h1>
        <button className="button" onClick={() => setLogout(true)}>Logout</button>
        { logout && <Navigate to="/" /> }
      </nav>
      <Outlet/>
      <div id="albums">
      {albums.map((album) => {
        return (
          <div className="card" key={album.id}>
            <div className="card-content">
                <div className="media-content">
                  <p className="title is-4"><Link to={`/albums/${album.id}`}>{ album.title.toUpperCase() }</Link></p>
                  <p className="subtitle is-6">By: { getUsernameById(album.userId, users) }</p>
                </div>
              </div>
            </div>
        );
      })}
      </div>
    </div>
  );
}
