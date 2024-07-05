import React from 'react';
import './Modal.css'; // Import your CSS file for styling

const Modal = ({ playlists, onClose, onAddToPlaylist }) => {
    const handleAddToPlaylist = (playlistId) => {
        onAddToPlaylist(playlistId);
        onClose();
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <h2>Add to Playlist</h2>
             
                <ul className="playlist-list">
                    {playlists.map(playlist => (
                        <li key={playlist._id} onClick={() => handleAddToPlaylist(playlist._id)}>
                            {playlist.name}
                        </li>
                    ))}
                </ul>
                <button className="close-btn" onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Modal;

