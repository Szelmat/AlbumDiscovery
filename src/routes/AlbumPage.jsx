import "../App.css";

import { useState, useEffect } from "react";
import { fetchAlbums, fetchUsers, getUsernameById } from "../data/DataHandler";
import { useParams } from "react-router-dom";

export function AlbumPage() {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState([]);
  const [album, setAlbum] = useState({ id: 0, title: '', userId: 0 });

  let params = useParams()

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

  useEffect(() => {
    for(let album of albums) {
        if(album.id === Number(params.albumId)) {
            setAlbum(album);
        }
    }
  }, [albums, params.albumId])

  return (
    <div id="album-container">
      <div id="main-album" className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://imgproxy-us-east-2.icons8.com/JK6eeFOFNslgO07IL3RLt2LNy6MS0E7vqenct0vM734/rs:fit:1216:912/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvOTEw/LzZkZmI1NWRjLWZm/YjgtNDNhOC1hMGU0/LTNmOGI4YmVmMmE0/My5zdmc.png"
              alt="album"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{ album.title.toUpperCase() }</p>
              <p className="subtitle is-6">By: {getUsernameById(album.userId, users)}</p>
              <p className="subtitle is-7">ID: {album.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
