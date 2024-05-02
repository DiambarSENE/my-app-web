import React, { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import {createType} from '../services/typeService';

function MyModal() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div>
      <button className="btn btn-primary" onClick={handleShow}>
        Ouvrir le Modal
      </button>

      <div className={`modal ${showModal ? 'showModal' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Titre du Modal</h5>
              <button type="button" className="btn-close" onClick={handleClose}></button>
            </div>
            <div className="modal-body">
               cord modal
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={handleClose}>Fermer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyModal;
